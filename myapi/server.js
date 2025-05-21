const express = require('express');
const knex = require('knex');
const cors = require('cors');
const e = require('express');
const app = express();
const port = 3000;

app.use(cors());

const db = knex({
    client: 'mysql', // เปลี่ยนเป็น 'pg' หากใช้ PostgreSQL
    connection: {
      host: 'localhost',  // เปลี่ยนเป็นที่อยู่ฐานข้อมูลของคุณ
      user: 'root',       // ชื่อผู้ใช้งานฐานข้อมูล
      password: '',       // รหัสผ่านฐานข้อมูล
      database: 'crud_vue_framework' // ชื่อฐานข้อมูล
    }
});

// Middleware เพื่อให้สามารถรับข้อมูล JSON
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('starting api now');
})

app.get('/checkdata', async (req, res) => {
    const email = req.query.email;  
    try {
        const checkdata = await db('members')
        .select('m_id')
        .where('m_id', email);
        if (checkdata.length === 0) {
            res.send('Do not have a value');
        } else {
            res.json(checkdata);
        }
        // res.json(checkdata);   
        // res.status(200).json({ message: 'Email received', email: email });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred', error: error.message });
    }
});

app.get('/selectby/:selectwho', async (req, res) => {
    const { selectwho } = req.params;
    try {
        if (selectwho) {
            const selector = await db('members')
            .select('m_id', 'm_user', 'm_tell')
            .where('m_id', selectwho)
            res.json(selector);
        }
    } catch (error) {
        console.log(error);
    }
});

app.get('/selector', async (req, res) => {
    try {
        const selector = await db('members')
        .select('m_id', 'm_user', 'm_tell')
        res.json(selector)
    } catch(error) {    
        res.status(500).json({ message: 'Error Select Data', error: error.message });
    }
});

app.put('/update/:oldemail', async (req, res) => {
    const { oldemail } = req.params;
    const { email, username, tell } = req.body;
        try {
            if (oldemail) {
                const updatedata = await db('members')
                .where('m_id', oldemail)    
                .update({
                    m_id: email,
                    m_user: username,
                    m_tell: tell,
                })
                res.json(updatedata); 
            } else {
                res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการอัปเดต' });
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
        }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const deletedata = await db('members')
            .where('m_id', id)
            .del();
            console.log(`ลบ สมาชิกที่มี id = ${id} สำเร็จ`);
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', error);
    }
});

app.get('/logintoweb', async (req, res) => {
    const { emaillogin , passlogin } = req.query;
    try {
        if (!emaillogin) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const checklogin = await db('members')
        .select('m_id', 'm_pass')
        .where({ m_id: emaillogin, m_pass: passlogin })
        if (checklogin.length === 0) {
            res.send('Failed To Login');
        } else {
            res.json(checklogin);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error Login To Website', error: error.message });
    }
});

app.post('/insertdata', async (req, res) => {
    const { emailform , userform , passform , tellform } = req.body;
    try {
        const default_status = "user";
        await db('members').insert({ m_id: emailform, m_user: userform, m_pass: passform, m_tell: tellform, m_status: default_status});
        res.status(201).json({ message: 'Register success' });
    } catch (error) {
        res.status(500).json({ message: 'Insert failed', error: error.message });
    }
});

// // ตัวอย่างการสร้าง route สำหรับ GET ข้อมูล
// app.get('/members', async (req, res) => {
//     try {
//       const members = await db('members').select('*');  // ดึงข้อมูลทั้งหมดจากตาราง 'users'
//       res.status(200).json(members);  // ส่งข้อมูลกลับไปยัง client
//       res.data;
//       console.log(members);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching users' });
//     }
//   });
  

// // สร้าง route สำหรับ GET
// app.get('/', (req, res) => {
//   res.send('welcome to myserver api');
// });

// // สร้าง route สำหรับ POST
// app.post('/data', (req, res) => {
//   const receivedData = req.body;
//   res.json({
//     message: 'Data received successfully!',
//     data: receivedData
//   });
// });

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

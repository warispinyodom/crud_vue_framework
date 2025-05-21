<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">สมัครสมาชิก</h3>
              
              <!-- Register Form -->
              <form @submit.prevent="handleRegister">
                <!-- Username Field -->
                <div class="mb-3">
                  <label for="username" class="form-label">ชื่อผู้ใช้</label>
                  <input type="text" id="username" class="form-control" v-model="username" required />
                </div>
                
                <!-- Email Field -->
                <div class="mb-3">
                  <label for="email" class="form-label">อีเมล</label>
                  <input type="email" id="email" class="form-control" v-model="email" required />
                </div>
                
                <!-- Password Field -->
                <div class="mb-3">
                  <label for="password" class="form-label">รหัสผ่าน</label>
                  <input type="password" id="password" class="form-control" v-model="password" required />
                </div>
                
                <!-- tell Field -->
                <div class="mb-3">
                  <label for="tell" class="form-label">เบอร์โทรศัพท์</label>
                  <input type="text" id="tell" class="form-control" v-model="tell" required />
                </div>
                
                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100">สมัครสมาชิก</button>
              </form>
              
              <!-- Link to Login page -->
              <p class="mt-3 text-center">
                มีบัญชีอยู่แล้ว? <router-link to="/loginform">เข้าสู่ระบบ</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { handleError, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios';

  const router = useRouter()

  const username = ref('');
  const email = ref('');
  const password = ref('');
  const tell = ref('');

  const handleRegister = async () => {
    try {
        const checkdata = await axios.get('http://localhost:3000/checkdata', {
            params: { email: email.value }  
        });
        const data = checkdata.data; 
            if (data[0].m_id === email.value) {
                Swal.fire({
                    title: 'บัญชีนี้ถูกใช้งานแล้ว',
                    text: 'กรุณาใช้อีเมลอื่นในการลงทะเบียน',
                    icon: 'error',
                    draggable: false
                });
            } else {
                try {
                    const insertdata = await axios.post('http://localhost:3000/insertdata', {
                        emailform: email.value,
                        userform: username.value,
                        passform: password.value,
                        tellform: tell.value
                    });
                        console.log(insertdata.data);
                    // ถ้าสำเร็จ
                    Swal.fire({
                        title: 'สมัครสมาชิกสำเร็จ',
                        text: 'คุณสามารถเข้าสู่ระบบได้ทันที',
                        icon: 'success',
                        confirmButtonText: 'ตกลง',
                        draggable: false
                    }).then(() => {
                      router.push('/loginform')
                    })

                    } catch (error) {
                    // ถ้าเกิด error
                    Swal.fire({
                        title: 'เกิดข้อผิดพลาด',
                        text: 'ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง',
                        icon: 'error',
                        confirmButtonText: 'ตกลง'
                    });
                    console.error('Insert error:', error);
                    }
            }
    } catch (error) {
        console.error(error); 
    }
  };
  
//   // ข้อมูลจากฟอร์ม
//   const username = ref('')
//   const email = ref('')
//   const password = ref('')
//   const confirmPassword = ref('')
  
//   // ฟังก์ชันสำหรับการสมัครสมาชิก
//   function handleRegister() {
//     // คุณสามารถเพิ่ม logic การสมัครที่นี่ (เช่นส่งข้อมูลไปยัง server)
//     if (password.value !== confirmPassword.value) {
//       alert("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน")
//       return
//     }
  
//     // สมมุติการสมัครสมาชิกสำเร็จแล้ว
//     alert("สมัครสมาชิกสำเร็จ!")
  
//     // เปลี่ยนเส้นทางไปหน้าเข้าสู่ระบบหลังจากสมัครสมาชิกสำเร็จ
//     router.push('/login')
//   }
  </script>
  
  <style scoped>
  /* ปรับแต่งสไตล์บางส่วน */
  .card {
    max-width: 400px;
    margin: 0 auto;
  }
  </style>
  
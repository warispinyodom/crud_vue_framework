<template>
    <div class="container mt-5">
        <button @click="Reload()" class="btn btn-primary">โหลดข้อมูลใหม่</button>
      <h1 class="text-center mb-4">ยินดีตอนรับ ระบบแก้ไขข้อมูลสมาชิก</h1>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead class="table-dark">
                <tr>
                <th>อีเมล</th>
                <th>ชื่อผู้ใช้</th>
                <th>เบอร์โทรศัพท์</th>
                <th>การจัดการ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(member, index) in members" :key="index">
                    <td>{{ member.m_id }}</td>
                    <td>{{ member.m_user }}</td>
                    <td>{{ member.m_tell }}</td>
                    <td class="d-flex justify-content-center align-items-center">
                    <button @click.prevent="handleEdit" class="btn btn-warning btn-sm me-2 w-50">แก้ไข</button>
                    <button @click.prevent="handleDelete(member.m_id)" class="btn btn-danger btn-sm w-50">ลบ</button>
                    </td>
                </tr>   
            </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { RouterLink, useRouter } from 'vue-router'
    import axios from 'axios'

    const members = ref([]) // สร้างตัวแปรเก็บข้อมูลสมาชิก
    const router = useRouter()

    // ฟังก์ชันดึงข้อมูลจาก backend
    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/selector') // URL เปลี่ยนตาม API ของคุณ
            members.value = response.data
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิก:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            if (handleDelete) {
                const result = await Swal.fire({
                    title: "คุณต้องการลบรายชื่อนี้หรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก",
                });

                if (result.isConfirmed) {
                    const response = axios.delete(`http://localhost:3000/delete/${id}`);  
                    await Swal.fire({
                        title: "การลบข้อมูลสำเร็จ",
                        icon: "success",
                    }).then(() => {
                        fetchMembers();
                    });
                }
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลบสมาชิก:', error);   
            alert('ไม่สามารถลบสมาชิกได้');
        }
    }

    const Reload = async () => {
        await fetchMembers();
    }

    const handleEdit = async (members) => {
        router.push('/editform');
    }

    onMounted(() => {
    fetchMembers()
    })
  // คุณสามารถเพิ่ม logic สำหรับปุ่มเหล่านี้ภายหลัง เช่น การ emit event หรือ modal popup
  </script>
  
  <style>
  /* เพิ่ม margin ด้านขวาให้ปุ่มแก้ไข เพื่อไม่ให้ติดกับปุ่มลบ */
  </style>
  
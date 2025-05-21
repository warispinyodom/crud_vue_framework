<template>
    <RouterLink class="btn btn-primary m-3" to="/dashboard">กลับ</RouterLink>
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="Whomember">
          <label for="email" class="form-label  ">อีเมลที่ต้องการแก้ไขข้อมูล</label>
          <div class="d-flex gap-3 align-items-center">
            <input type="email" id="email" class="form-control" v-model="whoareyou" required />
            <button type="submit" class="btn btn-primary">ค้นหา</button>
          </div>
            
        </form>
      </div>
    </div>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">แก้ไขข้อมูล</h3>
              
              <!-- Register Form -->
              <form @submit.prevent="handleEditor">
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
                
                <!-- tell Field -->
                <div class="mb-3">
                  <label for="tell" class="form-label">เบอร์โทรศัพท์</label>
                  <input type="text" id="tell" class="form-control" v-model="tell" required />
                </div>
                
                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100">แก้ไขข้อมูล</button>
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>  
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const tell = ref('');
const whoareyou = ref('');

const members = ref([]);

const Whomember = async () => {
  try {
    // ตรวจสอบว่ามีการกรอกข้อมูลใน input หรือไม่
    if (!whoareyou.value) {
      console.log("กรุณากรอกข้อมูล");
        Swal.fire({
          title: 'กรุณากรอกข้อมูล',
          text: 'คุณสามารถกรอกข้อมูลได้ทันที',
          icon: 'warning',
          confirmButtonText: 'ตกลง',
          draggable: false
        });
      return;  // ถ้ายังไม่ได้กรอกข้อมูลให้หยุดการทำงาน
    }

    // เมื่อกรอกข้อมูลแล้ว
    const selectwho = whoareyou.value;

    // ทำการส่ง request ไปยัง API
    const response = await axios.get(`http://localhost:3000/selectby/${selectwho}`);

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (response.data.length === 0) {
      console.log("ไม่พบข้อมูลที่ตรงกับเงื่อนไข");
      Swal.fire({
        title: 'ไม่พบข้อมูล',
        text: 'กรุณาลองใหม่',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        draggable: false
      });
    } else {
      members.value = response.data;
      const member = members.value[0];
      email.value = member.m_id;
      username.value = member.m_user;
      tell.value = member.m_tell;
    }
  } catch (error) {
    console.log("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API", error);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API");
  }
}

// const selectmember = async () => {
//     try {
//         const response = await axios.get('http://localhost:3000/selector')
//         members.value = response.data;

//         if (members.value.length > 0) {
//             const member = members.value[0];
//             email.value = member.m_id;
//             username.value = member.m_user;
//             tell.value = member.m_tell;
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

const handleEditor = async () => {
    try {
        const member = members.value[0];
        const oldemail = member.m_id;
        const updateData = {
            oldemail: oldemail.value,
            email: email.value,
            username: username.value,
            tell: tell.value
        };
        const response = await axios.put(`http://localhost:3000/update/${oldemail}`,updateData)
        if (response.data === 1) {
            Swal.fire({
                title: 'แก้ไขข้อมูลสำเร็จ',
                text: 'คุณสามารถดูข้อมูลได้ทันที',
                icon: 'success',
                confirmButtonText: 'ตกลง',
                draggable: false
            }).then(() => {
                router.push('/dashboard')
            })
            console.log(response.data)
        } else {
            Swal.fire({
                title: 'แก้ไขข้อมูลไม่สำเร็จ',
                text: 'คุณสามารถแก้ไขได้ทันที',
                icon: 'error',
                confirmButtonText: 'ตกลง',
                draggable: false
            }).then(() => {
                router.push('/editform')
            })
        }
    } catch (error) {
        Swal.fire({
                title: 'แก้ไขข้อมูลไม่สำเร็จ',
                text: 'อีเมลของท่านอ่านซ้ำ',
                icon: 'error',
                confirmButtonText: 'ตกลง',
                draggable: false
            }).then(() => {
                router.push('/editform')
            })
    }
}

onMounted(() => {
    Whomember()
});

</script>

<style>

</style>
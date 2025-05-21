<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">เข้าสู่ระบบ</h3>
              
              <!-- Login Form -->
              <form @submit.prevent="handleLogin">
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
                
                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100">เข้าสู่ระบบ</button>
              </form>
              
              <!-- Link to Register page -->
              <p class="mt-3 text-center">
                ยังไม่มีบัญชี? <router-link to="/registerform">สมัครสมาชิก</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  
  // ข้อมูลจากฟอร์ม
  const email = ref('')
  const password = ref('')  
  
  const handleLogin = async () => {
    try {
      const checklogin = await axios.get('http://localhost:3000/logintoweb', {
        params: { emaillogin: email.value, passlogin: password.value }
      });
      const data = checklogin.data;
      if (data[0].m_id === email.value && data[0].m_pass === password.value) {
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ',
          text: 'ยินดีตอนรับ สู่เว็บไซต์อย่างเป็นทางการ',
          icon: 'success',
          draggable: false
        }).then(() => {
          router.push('/dashboard');
        });
      } else {
        Swal.fire({
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่!',
          icon: 'error',
          draggable: false
        });
      }
    } catch(error) {
      console.log(error);
    }
  };

  // // ฟังก์ชันสำหรับการเข้าสู่ระบบ
  // function handleLogin() {
  //   // คุณสามารถเพิ่ม logic การเข้าสู่ระบบที่นี่ (เช่นตรวจสอบข้อมูลจาก server)
  //   if (email.value === '' || password.value === '') {
  //     alert("กรุณากรอกข้อมูลให้ครบถ้วน")
  //     return
  //   }
  
  //   // สมมุติการเข้าสู่ระบบสำเร็จ
  //   alert("เข้าสู่ระบบสำเร็จ!")
  
  //   // เปลี่ยนเส้นทางไปหน้า Dashboard หรือหน้าหลักหลังจากเข้าสู่ระบบสำเร็จ
  //   router.push('/dashboard')
  // }
  </script>
  
  <style scoped>
  /* ปรับแต่งสไตล์บางส่วน */
  .card {
    max-width: 400px;
    margin: 0 auto;
  }
  </style>
  
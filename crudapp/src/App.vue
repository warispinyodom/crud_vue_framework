<template>
    <div>
      <div class="banner d-flex justify-content-center align-items-center">
        <h1 class="text-white text-center">ยินดีต้อนรับสู่เว็บไซต์ของฉัน</h1>
      </div>
  
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link to="/dashboard" class="navbar-brand" >รายชื่อสมาชิก</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/registerform" class="nav-link">สมัครสมาชิก</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/loginform" class="nav-link">เข้าสู่ระบบ</router-link>
              </li>
              <li class="nav-items">
                <router-link to="/editform" class="nav-link">จัดการข้อมูล</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </template>
  
  <script setup>
import router from './router';

  // ไม่มี logic JS พิเศษตอนนี้
  </script>
  
  <style scoped>
  .banner {
    background: linear-gradient(135deg, #007bff, #6610f2); /* น้ำเงิน-ม่วง */
    height: 250px;
    padding: 2rem;
  }
  </style>
  
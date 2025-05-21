// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/views/RegisterForm.vue'
import LoginForm from '@/views/LoiginForm.vue'
import Dashboard from '@/views/Dashboard.vue'
import EditForm from '@/views/EditForm.vue'

const routes = [
  { path: '/registerform', name: 'RegisterForm', component: RegisterForm },
  { path: '/loginform', name: 'LoginForm', component: LoginForm },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/editform', name: 'EditForm', component: EditForm },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

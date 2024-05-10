import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PublishView from '../views/PublishView.vue'
import AdminCreateTrip from '../views/AdminCreateTrip.vue'


const routes = [
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    { 
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/publish',
        name: 'Publish',
        component: PublishView
    },
    {
        path:'/admin/create',
        name:'Admin',
        component: AdminCreateTrip
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

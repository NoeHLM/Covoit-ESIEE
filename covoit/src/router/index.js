import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import HelloWorld from '../components/HelloWorld.vue'


const routes = [

    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

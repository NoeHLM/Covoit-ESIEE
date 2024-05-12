import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PublishView from '../views/PublishView.vue'
import ResearchView from '../views/ResearchView.vue'
import AdminCreateTrip from '../views/AdminCreateTrip.vue'
import LogoutView from '../views/LogoutView.vue'
import Cookies from 'js-cookie'





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
        path: '/research',
        name: 'Research',
        component: ResearchView,
        meta: { requiresAuth: true }
    },
    {
        path: '/publish',
        name: 'Publish',
        component: PublishView,
        meta: { requiresAuth: true }
    },
    {
        path:'/admin/create',
        name:'Admin',
        component: AdminCreateTrip,
        meta: { requiresAuth: true }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LogoutView,
        meta: { requiresAuth: true }
    }

    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else if (isLoggedIn && (to.path === '/login' || to.path === '/register')) {
        next('/publish');
    } else {
        next();
    }
});

export default router

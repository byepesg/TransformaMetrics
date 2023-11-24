import { createRouter, createWebHashHistory } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';

import Landing from '@/views/pages/Landing.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Landing,
        },
        {
            path: '/applayout',
            component: AppLayout,
            children: [
                {
                    path: '/applayout',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },

                {
                    path: '/landing',
                    name: 'landing',
                    component: () => import('@/views/pages/Landing.vue')
                },
                {
                    path: '/Products',
                    name: 'landing',
                    component: () => import('@/views/pages/product/Products/Products.vue')
                },
            

                
            ]
        },
        {
            path: '/pages/crud',
            name: 'crud',
            component: () => import('@/views/pages/template/Crud.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
    ]
});

export default router;

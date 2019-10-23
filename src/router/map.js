/**
 * 路由映射
 */
import Layout from '@/components/Layout'
export const mapRoutes = [
    {
        path: '/system',
        component: () => Layout,
        name: 'system',
        meta: {
            title: 'system',
        },
        children: [
            {
                path: '/system/companyInfo',
                name: 'companyInfo',
                component: () => import('@/views/system/companyInfo'),
                meta: {
                    title: 'company info',
                }
            },
            {
                path: '/system/organization',
                name: 'organization',
                component: () => import('@/views/system/organization'),
                meta: {
                    title: 'organization',
                }
            },
            {
                path: '/system/permission',
                name: 'permission',
                component: () => import('@/views/system/permission'),
                meta: {
                    title: 'permission',
                },
            },

        ]
    },
]
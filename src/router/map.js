
const componentMaps = {
    //系统管理
    "system": () => import('@/components/Layout'),
    "roles": () => import('@/views/system/roles/index'),
    "users": () => import('@/views/system/users/index'),
    "department": () => import('@/views/system/department/index'),
    "menus": () => import('@/views/system/menus/index'),
    "logs": () => import('@/views/system/logs/index'),
    //办公管理
    "work": () => import('@/components/Layout'),
    "notice": () => import('@/views/work/notice/index'),
    "contacts": () => import('@/views/work/contacts/index'),
    "attendance": () => import('@/views/work/attendance/index'),
    "report": () => import('@/views/work/report/index'),
    "schedule": () => import('@/views/work/schedule/index'),
}
export default componentMaps;


const componentMaps = {
    "workflow": () => import('@/components/Layout'),
    "workflowList": () => import('@/views/workflow/list'),
    "workflowSettings": () => import('@/views/workflow/settings/index'),
    "workflowCategory": () => import('@/views/workflow/settings/category'),
    "workflowTemplate": () => import('@/views/workflow/settings/template'),
    "workflowForms": () => import('@/views/workflow/forms/index'),
    "formCreate": () => import('@/views/workflow/forms/create'),
    "workflowFormList": () => import('@/views/workflow/forms/store'),
    "formStore": () => import('@/views/workflow/list'),
    "workflowStore": () => import('@/views/workflow/store'),
    "system": () => import('@/components/Layout'),
    "roles": () => import('@/views/system/roles'),
    "menus": () => import('@/views/system/menus'),
}
export default componentMaps;

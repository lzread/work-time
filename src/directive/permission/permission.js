import store from '@/store'

export default {
  inserted(el, binding, vnode) {

    const {
      value
    } = binding
    const roles = store.getters && store.getters.roles


    //如果有超级管理员权限退出控件权限判断
    if (roles.includes('admin')) {
      return;
    }

    //符合条件进行判断，进行判定，没有权限的将删除
    if (['ADD', 'EDIT', 'DELETE'].includes(value) && vnode.context.$route.meta instanceof Object && vnode.context.$route.meta.permission instanceof Object) {

      let res = vnode.context.$route.meta.permission;
      let permissionRoles = [];


      res.forEach(item => {
        roles.some(role => {
          if (item.roles.includes(role)) {
            
            permissionRoles.push(item.name);
            
          }
        })
      });
      permissionRoles = Array.from(new Set(permissionRoles));
      if (!permissionRoles.includes(value)) {
        
        console.log(`当前【${vnode.context.$route.meta.title}】页面，当前角色：${roles}，没有【${el.innerText}】${el.tagName}的${value}权限`)
        el.parentNode && el.parentNode.removeChild(el)
      }
      

    } else {
      throw new Error(`使用权限指令，必须使用'ADD','EDIT','DELETE' 固定标识 v-permission="'ADD'" or v-permission="'EDIT'" or v-permission="'DELETE'" `)
    }
  }
}
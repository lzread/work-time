import store from '@/store'

export default {
  inserted(el, binding, vnode) {

    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (roles.includes('admin')) {
      return;
    }

    if (value && vnode.context.$route.meta && vnode.context.$route.meta.permission && vnode.context.$route.meta.permission.length > 0) {
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
        el.parentNode && el.parentNode.removeChild(el)
      }

    } else {
      throw new Error(`need roles! Like v-permission="'ADD'" or v-permission="'EDIT'" or v-permission="'DELETE'" `)
    }
  }
}


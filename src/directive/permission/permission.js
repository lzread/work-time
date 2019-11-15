import store from '@/store'

export default {
  inserted(el, binding, vnode) {


    
    const { value } = binding


    const perm = vnode.context.$route.meta.perm;

    console.log(perm.includes(value))

    if(!perm.includes(value)){
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

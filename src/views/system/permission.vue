<template>
  <div id="AuthManage">

    <pre>{{menus}}</pre>

  

  </div>
</template>

<script>

import { getRoutes, getRoles, addRole } from "@/api/role";
export default {
  name: "AuthManage",
  data() {
    return {
      roles: [],
      menus: [],
      role: {
        token: "admin",
        name: "超级管理员",
        desc: "",
        stop: 0,
        routes: [
          {
            name: "system"
          },
          {
            name: "companyInfo"
          }
        ]
      }
    };
  },
  created() {
    this.getRoutes();
  },
  computed: {},
  methods: {
    getRoutes() {
      getRoutes().then(response => {
        this.menus = response.data;
      });
    },
    addRole() {
      addRole(this.role).then(response => {});
    }
  },
  components: {}
};
</script>


<template>
  <div id="AuthManage">

    <pre>{{menus}}</pre>

    ---------------------------------------

    <pre>{{roles}}</pre>

  </div>
</template>

<script>
import { getRoles, addRole } from "@/api/role";
export default {
  name: "AuthManage",
  data() {
    return {
      roles: [],
      menus: [
        {
          id: 1,
          name: "system"
        },
        {
          id: 2,
          name: "companyInfo"
        },
        {
          id: 3,
          name: "organization"
        },
        {
          id: 4,
          name: "permission"
        }
      ],
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
    this.getRoles();
  },
  computed: {},
  methods: {
    getRoles() {
      getRoles().then(response => {
        this.roles = response.data;
      });
    },
    addRole() {
      addRole(this.role).then(response => {});
    }
  },
  components: {}
};
</script>


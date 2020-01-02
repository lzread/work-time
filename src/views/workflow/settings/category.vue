<template>
  <div class="container">

    <button v-permission="'ADD'">ADD</button>
    <button v-permission="'EDIT'">EDIT</button>
    <button v-permission="'DELETE'">DELETE</button>

  </div>
</template>

<script>
import permission from "@/directive/permission/index.js"; // 权限判断指令
export default {
  name: "FlowManage",
  data() {
    return {

    };
  },
  directives: { permission },
  created() {
    
  },
  computed: {
   
  },
  methods: {},
  components: {}
};
</script>


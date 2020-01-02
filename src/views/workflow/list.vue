<template>
  <div id="FlowManage" >

    <button v-permission="'ADD'">ADD</button>
    <button v-permission="'EDIT'">EDIT</button>
    <button v-permission="'DELETE'">DELETE</button>

   

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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


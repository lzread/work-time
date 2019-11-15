<template>
  <div id="FlowManage" >

    <button v-permission="'add'">add</button>
    <button v-permission="'update'">update</button>
    <button v-permission="'delete'">delete</button>

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


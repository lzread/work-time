<template>
  <div id="MenuManage">

    <div class="condition">
      
      <el-button size="mini">ADD</el-button>



    </div>

    

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MenuManage",
  data() {
    return {

    };
  },
  created() {},
  computed: {
    ...mapGetters({
      permission_routes: "permission_routes"
    })
  },
  methods: {},
  components: {}
};
</script>


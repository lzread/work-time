<template>
  <div id="home">
    <top></top>
    <el-container>
      <sidenav></sidenav>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import top from "@/components/top";
import sidenav from "@/components/sidenav";
export default {
  name: "home",
  data() {
    return {
      user_info: JSON.parse(this.$cookice.get("UserInfo"))
    };
  },
  created() {},
  computed: {},
  methods: {},
  components: { top, sidenav }
};
</script>

<style lang="less">
#home {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  height: 100%;
  & > .el-container > .el-main {
    margin-top: 60px;
  }
}
</style>
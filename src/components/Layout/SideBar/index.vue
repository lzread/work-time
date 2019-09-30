<template>
  <div id="SideBar">

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="btn-wrap">
        <!-- <button
          class="create-flow-btn"
          @click="createFlow"
        >
          <i class="el-icon-plus"></i>
          <span></span>
        </button> -->
      </div>
      <el-menu
        unique-opened
        router
        :default-active="$route.path"
      >

        <sidebar-item :items="permission_routes"></sidebar-item>
      </el-menu>
    </el-scrollbar>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  name: "SideBar",
  computed: {
    ...mapGetters(["permission_routes"])
  },
  methods: {
    createFlow() {
      this.$store.dispatch("flow/setDialogVisible", true);
    }
  },
  components: { SidebarItem }
};
</script>

<style lang="scss" scoped>
#SideBar {
  width: 200px;
  height: calc(100% - 55px);
  position: fixed;
  top: 55px;
  left: 0;
  border-right: 1px solid #e6e6e6;
  .btn-wrap {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border-bottom: 1px solid #e6e6e6;
    .create-flow-btn {
      width: 80%;
      line-height: 25px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1890ff;
      border: 1px solid #1890ff;
      cursor: pointer;
      color: #fff;
      &:focus {
        outline: 0;
      }
      & > i {
        padding: 0 10px 0 0;
      }
    }
  }
}
</style>



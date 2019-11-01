<template>
  <div id="Layout">

    <el-scrollbar wrap-class="scrollbar-wrapper">

      <nav-bar />
      <side-bar />
      <tags-view />
      <app-main />

      <create-flow></create-flow>

    </el-scrollbar>

  </div>
</template>

<script>
/**
 *
 * 通用布局组件
 *
 * @NavBar      顶部导航
 * @SideBar     左侧导航
 * @AppMain     主显示区域
 * @TagsView    切换标签
 *
 */

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import AppMain from "./AppMain";
import TagsView from "./TagsView";

import CreateFlow from "@/components/Workflow/create";

export default {
  name: "Layout",
  components: { NavBar, SideBar, AppMain, TagsView, CreateFlow }
};
</script>

<style lang="scss" scoped>
#Layout {
  padding: 0 0 0 200px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>

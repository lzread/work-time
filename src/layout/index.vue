<template>
  <div id="Layout">

    <el-scrollbar wrap-class="scrollbar-wrapper">

      <side-bar />

      <nav-bar />
      <tags-view />
      <app-main />

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
export default {
  name: "Layout",
  components: { NavBar, SideBar, AppMain, TagsView }
};
</script>

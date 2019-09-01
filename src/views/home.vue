<template>
  <div id="home">
    <top></top>
    <el-container>
      <sidenav></sidenav>
      <el-main v-if="$route.path == '/home'">

        123

      </el-main>

      <el-main v-else>

        <transition name="slide-fade">
          <router-view />
        </transition>

      </el-main>

    </el-container>
  </div>
</template>

<script>
import top from "@/components/top";
import sidenav from "@/components/sidenav";
export default {
  name: "home",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  components: { top, sidenav }
};
</script>
<style lang="less">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: none;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>

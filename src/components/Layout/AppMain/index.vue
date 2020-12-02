<template>
  <div id="AppMain">
    <transition name="slide-fade">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <router-view />
      </el-scrollbar>
    </transition>
  </div>
</template>
<script>
export default {
  name: "AppMain",
};
</script>

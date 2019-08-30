<template>
  <div id="top">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in $route.matched"
        :key="item.path"
        v-show="item.name != 'home'"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="info">
      <el-avatar
        :size="40"
        :src="circleUrl"
      ></el-avatar>
      <div class="block">

      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "top",
  data() {
    return {
      activeIndex: "1",
      circleUrl: ""
    };
  },
  created() {},
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
#top {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  height: 60px;
  width: calc(100% - 240px);
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: solid 1px #e6e6e6;
  padding: 0 20px;
  & > .info {
    flex-grow: 1;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: flex-end;
    .block {
      padding: 0 0 0 20px;
      flex-grow: 0;
    }
  }
}
</style>
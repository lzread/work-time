<template>
  <div id="top">

    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.path"
          v-show="item.name != 'home'"
        >
          {{ item.meta.menuName }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="info">
        <el-dropdown style="margin:0 10px">
          <span class="el-dropdown-link">
            <em>中文</em><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>中文</el-dropdown-item>
            <el-dropdown-item>En</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="block">
          <el-avatar
            :size="24"
            :src="circleUrl"
          ></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              <em>Hi, Eason 上午好</em><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="page-tabs">
      <span class="item current">
        <a href="#">首页</a>
        <i class="el-icon-close"></i>
      </span>
      <span class="item">
        <a href="#">首页</a>
        <i class="el-icon-close"></i>
      </span>
      <span class="item">
        <a href="#">首页</a>
        <i class="el-icon-close"></i>
      </span>
      <span class="item">
        <a href="#">首页</a>
        <i class="el-icon-close"></i>
      </span>
      <span class="item">
        <a href="#">首页</a>
        <i class="el-icon-close"></i>
      </span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "top",
  data() {
    return {
      user_info: JSON.parse(this.$cookice.get("UserInfo")),
      activeIndex: "1",
      circleUrl: ""
    };
  },
  created() {
    console.log(this.user_info);
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
<template>
  <div id="NavBar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
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
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      circleUrl: ""
    };
  },
  components: {  },
  created() {},
  computed: {},
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
};
</script>
<style lang="scss">
//隐藏没有顶级菜单的二级菜单前面的"/"
.el-breadcrumb__inner{
  &:empty + .el-breadcrumb__separator{display: none;}
}
</style>
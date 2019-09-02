<template>
  <div id="SideBar">
    <el-menu
      unique-opened
      router
      :default-active="$route.path"
    >
      <template v-for="(item,index) in $router.options.routes">

        <!--一级菜单-->
        <template v-if="item.redirect && !item.path">
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.path"
          >{{child.name}}
          </el-menu-item>
        </template>

        <!--二级菜单-->
        <template v-else-if="item.children && !item.hidden">
          <el-submenu
            :key="index"
            :index="item.path"
          >

            <template slot="title">
              <span slot="title">{{item.name}}</span>
            </template>

            <el-menu-item
              v-for="child in item.children"
              :index="child.path"
              :key="child.path"
            >{{child.name}}
            </el-menu-item>
          </el-submenu>
        </template>

      </template>

    </el-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>

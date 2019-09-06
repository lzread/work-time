<template>
  <div id="SideBar">

    <el-menu
      unique-opened
      router
      :default-active="$route.path"
    >
      <template v-for="(item,index) in permission_routes">

        <!--一级菜单-->
        <template v-if="item.redirect && !item.path">
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.path"
          >{{$t(child.name)}}
          </el-menu-item>
        </template>

        <!--二级菜单-->
        <template v-else-if="item.children && !item.hidden">
          <el-submenu
            :key="index"
            :index="item.path"
          >

            <template slot="title">
              {{$t(item.name)}}
            </template>

            <el-menu-item
              v-for="child in item.children"
              :index="child.path"
              :key="child.path"
            >

              <template slot="title">
                {{$t(child.name)}}
              </template>

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
  computed: {
    ...mapGetters({
      permission_routes: "permission_routes"
    })
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>

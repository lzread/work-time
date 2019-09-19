<template>
  <div id="SideBar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        unique-opened
        router
        :default-active="$route.path"
      >

        <sidebar-item :items="routes"></sidebar-item>


        <!--
        <template v-for="(item,index) in permission_routes">

          
          <template v-if="item.redirect && !item.path">
            <el-menu-item
              v-for="child in item.children"
              :index="child.path"
              :key="child.path"
            >{{$t(child.name)}}
            </el-menu-item>
          </template>

         
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
        -->
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem";
export default {
  name: "SideBar",
  computed: {
    routes(){
      return this.$store.state.permission.routes;
    }
  },
  components: { SidebarItem }
};
</script>



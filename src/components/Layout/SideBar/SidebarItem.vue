<template>
  <div>

    <template v-for="item in items">
      <template v-if="item.children">
        <el-submenu
          :key="item.path"
          :index="item.path"
          v-if="!item.hidden && !item.redirect"
        >
          <template slot="title">{{item.meta.title}}</template>
          <sidebar-item :items="item.children"></sidebar-item>
        </el-submenu>
        <template v-if="item.redirect && !item.path">
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.path"
          >{{child.meta.title}}</el-menu-item>
        </template>
      </template>
      <template v-else>
        <el-menu-item
          :key="item.path"
          :index="item.path"
          v-if="!item.hidden"
        >{{item.meta.title}}</el-menu-item>
      </template>
    </template>

  </div>
</template>



<script>
export default {
  name: "SidebarItem",
  props: ["items"]
};
</script>

<template>
  <div id="sidenav">
    <el-menu
      unique-opened
      :default-active="$route.path"
      router
    >
      <template
        v-for="(item , index) in $router.options.routes"
        v-if="item.meta.menuShow"
      >
        <el-submenu
          :index="item.path"
          v-if="item.children"
          :key="index"
        >
          <template slot="title">
            {{item.meta.menuName}}
          </template>
          <el-menu-item
            v-for="(itemChild , index) in item.children"
            :index="itemChild.path"
            :key="index"
            v-if="itemChild.meta.menuShow"
          >
            <span>{{itemChild.meta.menuName}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          :index="item.path"
          :key="index"
          v-else
        >
          {{item.meta.menuName}}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "sidenav",
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

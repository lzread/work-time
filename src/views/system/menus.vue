<template>
  <div class="container">

    <div class="filterBar">
      <el-button
        size="mini"
        type="primary"
        v-permission="'ADD'"
        @click="addMenuHandle"
      >新建一级菜单</el-button>
    </div>
    <div class="tableArea">
      <el-table
        :data="menus"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children'}"
      >
        <el-table-column
          prop="title"
          label="显示标题"
        >
          <template slot-scope="scope">
              <span v-if="scope.row.type == 0">
                {{scope.row.title}}
              </span>
              <span v-else style="color:#666;">
                {{scope.row.title}}
              </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          width="180"
          label="路由名称"
        > 
        <template slot-scope="scope">
            {{scope.row.type == 0 ? scope.row.name : ''}}
        </template>
        </el-table-column>

        <el-table-column
          label="是否显示"
          width="80"
        >
          <template slot-scope="scope">
            {{scope.row.hidden == true ? '隐藏' : '显示'}}
          </template>
        </el-table-column>

        <el-table-column
          label="类别"
          width="80"
        >
          <template slot-scope="scope">
            {{scope.row.type == 0 ? '菜单' : '功能'}}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.type == 0"
              size="mini"
              type="text"
            >添加下级菜单</el-button>
            <el-button
              v-show="scope.row.type == 0"
              size="mini"
              type="text"
            >添加权限功能</el-button>
            <el-button
              size="mini"
              type="text"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
            >删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { getAllMenus } from "@/api/menu";
import permission from "@/directive/permission/index.js"; // 权限判断指令
export default {
  name: "role",
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.getAllMenus();
  },
  filters: {},
  computed: {},
  methods: {
    async getAllMenus() {
      const { data } = await getAllMenus();
      this.menus = data;
    },
    addMenuHandle() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  directives: { permission }
};
</script>

<style>

</style>

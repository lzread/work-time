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
            <span
              v-else
              style="color:#666;"
            >
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

        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.type == 0"
              size="mini"
              type="text"
              @click="addChildrenHandle(scope.row)"
            >添加下级菜单</el-button>
            <el-button
              v-show="scope.row.type == 0"
              size="mini"
              type="text"
              @click="addPermissionHandle(scope.row)"
            >添加权限功能</el-button>
            <el-button
              size="mini"
              type="text"
              @click="editHandle(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="deleteHandle(scope.$index, scope.row)"
            >删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      width="400px"
      :visible.sync="dialogVisibleMenu"
      title="新建一级菜单"
    >

      <el-form
        ref="menuForm"
        :model="menu"
        :rules="rules"
        label-width="80px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="路由名称"
          prop="name"
        >
          <el-input
            v-model="menu.name"
            placeholder="请输入路由名称"
          />
        </el-form-item>

        <el-form-item
          label="菜单名称"
          prop="title"
        >
          <el-input
            v-model="menu.title"
            placeholder="请输入菜单名称"
          />
        </el-form-item>

        <el-form-item label="菜单路径">
          <el-input
            v-model="menu.path"
            placeholder="请输入菜单路径"
          />
        </el-form-item>

        <el-form-item label="是否隐藏">
          <el-switch v-model="menu.hidden"></el-switch>
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button
          size="mini"
          type="danger"
          @click="dialogVisibleMenu = false, resetForm('menuForm')"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="saveMenu()"
        >提交</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getAllMenus } from "@/api/menu";
import permission from "@/directive/permission/index.js"; // 权限判断指令
export default {
  name: "role",
  data() {
    return {
      menus: [],
      menu: {
        hidden: false
      },
      icons:[],
      dialogVisibleMenu: false
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
    addMenuHandle() {
      this.dialogVisibleMenu = true;
    },
    addChildrenHandle(row) {},
    addPermissionHandle(row) {},
    editHandle(row) {},
    deleteHandle(index, row) {},
    saveMenu() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  directives: { permission }
};
</script>

<style>
#NavBar,
#SideBar,
#TagsView {
  display: none !important;
}
#Layout,
#AppMain {
  padding: 0 !important;
  margin: 0 !important;
}
</style>

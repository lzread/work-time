<template>
  <div id="role">

    <div class="head">

      <el-button
        size="mini"
        @click="addRoleHandle"
      >新建</el-button>

    </div>

    <div class="main">

      <el-table
        :data="roles"
        stripe
      >
        <el-table-column
          prop="role_name"
          label="角色名称"
        >
        </el-table-column>
        <!--
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status == -1"
                size="mini"
              >系统</el-tag>
              <el-tag
                v-else-if="scope.row.status == 0"
                size="mini"
              >正常</el-tag>
              <el-tag
                v-else-if="scope.row.status == 1"
                size="mini"
                type="info"
              >停用</el-tag>
              <el-tag
                v-else
                size="mini"
              >其他</el-tag>
            </template>
          </el-table-column>
          -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="updateRoleHandle(scope.row)"
              v-if="scope.row.status != -1"
              type="primary"
              size="mini"
            >e</el-button>
            <el-button
              @click="permissionHandle(scope.row)"
              v-if="scope.row.status != -1"
              size="mini"
              type="primary"
            >p</el-button>
            <el-button
              @click="userHandle(scope.row)"
              size="mini"
              type="primary"
            >u</el-button>
            <el-button
              @click="deleteRoleHandle(scope.$index, scope.row)"
              v-if="scope.row.status != -1"
              type="danger"
              size="mini"
            >d</el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog
      width="640px"
      :visible.sync="dialogVisiblePermission"
      title="权限设置"
    >

      <permission-list
        :items="menus"
        @getSelected="getCheckedKeys"
        :setSelected="setCheckedKeys"
      ></permission-list>

      <div slot="footer">
        <el-button
          size="mini"
          type="danger"
          @click="dialogVisiblePermission = false"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addRoleMenu"
        >提交</el-button>
      </div>

    </el-dialog>

    <el-dialog
      width="640px"
      :visible.sync="dialogVisibleRole"
      :title="dialogVisibleRoleType == 'add' ? '新建角色' : '编辑角色' "
    >

      <el-form
        ref="roleForm"
        :model="role"
        label-width="80px"
        label-position="left"
        size="mini"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="role.role_name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input
            v-model="role.role_code"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.role_desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-radio-group v-model="role.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button
          size="mini"
          type="danger"
          @click="dialogVisibleRole = false"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="saveRole()"
        >提交</el-button>
      </div>

    </el-dialog>

    <el-dialog
      width="640px"
      :visible.sync="dialogVisibleUser"
      title="角色用户"
    >

      <el-table
        :data="users"
        stripe
      >
        <el-table-column
          prop="username"
          label="用户名"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">

            <!-- <el-button
              v-if="'1,2,3'|isCurrentRole"
              @click="addUserRoleHandle(scope.row)"
              size="mini"
              type="primary"
            >添加</el-button>

            <el-button
              v-else
              @click="deleteUserRoleHandle(scope.row)"
              size="mini"
              type="danger"
            >取消</el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <pre>{{users}}</pre>

    </el-dialog>

  </div>
</template>

<script>
import { getAllMenus } from "@/api/menu";
import {
  getRoles,
  getRoleNameExist,
  getRoleMenu,
  addRole,
  updateRole,
  deleteRole,
  addRoleMenuBatch
} from "@/api/role";
import { getUsers, getUserByRoleId } from "@/api/user";
import { deepClone } from "@/utils";
import PermissionList from "./components/PermissionList";

export default {
  name: "role",
  data() {
    return {
      menus: [],
      roles: [],
      users: [],
      role_id: "",
      role: {
        status: 0
      },
      setCheckedKeys: [],
      checkedKeys: [],
      dialogVisibleRole: false,
      dialogVisibleRoleType: "",
      dialogVisibleUser: false,
      dialogVisiblePermission: false
    };
  },
  created() {
    this.getRoles();
    this.getAllMenus();
    this.getUsers();
  },
  filters: {
    isCurrentRole(value) {
      console.log(value);
      return false;
    }
  },
  computed: {},
  methods: {
    async getAllMenus() {
      const { data } = await getAllMenus();
      this.menus = data;
    },
    async getRoles() {
      const { data } = await getRoles();
      this.roles = data;
    },
    async addRoleMenu() {
      this.dialogVisiblePermission = false;
      let arr = [];
      this.checkedKeys.forEach(item => {
        arr.push({
          role_id: this.role_id,
          menu_id: item
        });
      });
      const { data } = await addRoleMenuBatch(this.role_id, arr);
    },

    addRoleHandle() {
      this.role = { status: 0 };
      this.dialogVisibleRoleType = "add";
      this.dialogVisibleRole = true;
    },
    updateRoleHandle(row) {
      this.dialogVisibleRoleType = "update";
      this.dialogVisibleRole = true;
      this.role = deepClone(row);
    },
    async getUsers() {
      const { data } = await getUsers();
      this.users = data;
    },
    userHandle(row) {
      this.dialogVisibleUser = true;
      this.role_id = row.id;
    },

    addUserRoleHandle(row) {},

    deleteUserRoleHandle(row) {},

    async deleteRoleHandle(index, row) {
      this.roles.splice(index, 1);
      await deleteRole(row.id);
    },

    async saveRole() {
      if (this.dialogVisibleRoleType == "add") {
        try {
          await getRoleNameExist(this.role.role_code);
          await addRole(this.role);
        } catch (error) {
          return;
        }
      } else {
        await updateRole(this.role);
      }

      this.dialogVisibleRole = false;
      this.getRoles();
    },

    async permissionHandle(row) {
      const { id } = row;
      this.role_id = id;
      this.dialogVisiblePermission = true;
      this.setCheckedKeys = [];
      const { data } = await getRoleMenu(id);
      let keys = [];
      data.forEach(item => {
        keys.push(item.menu_id);
      });
      this.setCheckedKeys = keys;
    },
    getCheckedKeys(data) {
      this.checkedKeys = data;
    }
  },
  components: { PermissionList }
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

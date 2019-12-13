<template>
  <div class="container">

    <div class="head">

      <el-button
        size="mini"
        @click="addRoleHandle"
      >新建</el-button>

    </div>

    <el-dialog
      width="400px"
      :visible.sync="dialogRole"
      :title="dialogRoleType==='UPDATE'?'编辑角色':'新建角色'"
    >
      <el-form
        ref="roleForm"
        :model="role_data"
        label-width="80px"
        label-position="left"
        size="mini"
      >
        <el-form-item
          label="角色名称"
        >
          <el-input
            v-model="role_data.role_name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role_data.role_desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-radio-group v-model="role_data.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button
            size="mini"
            type="danger"
            @click="dialogRole=false"
          >取消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="confirmRole"
          >提交</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <el-dialog
      width="400px"
      :visible.sync="dialogMenu"
      title="权限菜单"
    >

      <el-tree
        ref="tree"
        :data="menu_list"
        show-checkbox
        :default-expand-all="true"
        node-key="id"
        :check-strictly="true"
        :props="defaultProps"
      >
      </el-tree>

      <div slot="footer">
        <el-button
          size="mini"
          type="danger"
          @click="dialogMenu = false"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addRoleMenu"
        >提交</el-button>
      </div>

    </el-dialog>

    <div class="main">

      <template>
        <el-table
          :data="role_list"
          stripe
        >
          <el-table-column
            prop="role_name"
            label="角色名称"
          >
          </el-table-column>
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
          <el-table-column
            prop="role_desc"
            label="描述"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="updateRoleHandle(scope.row)"
                v-if="scope.row.status != -1"
                type="primary"
                size="mini"
              >编辑</el-button>
              <el-button
                @click="roleMenuHandle(scope.row.id)"
                v-if="scope.row.status != -1"
                type="primary"
                size="mini"
              >菜单</el-button>
              <el-button
                @click="updateRoleHandle(scope.row)"
                v-if="scope.row.status != -1"
                size="mini"
                type="primary"
              >权限</el-button>
              <el-button
                @click="deleteRoleHandle(scope.$index, scope.row)"
                v-if="scope.row.status != -1"
                type="danger"
                size="mini"
              >删除</el-button>

            </template>
          </el-table-column>
        </el-table>
      </template>

    </div>

  </div>
</template>

<script>
// /**
//  * #角色&权限&菜单 管理页面#
//  * step1 新增角色
//  * step2 编辑菜单&编辑权限
//  */
// import { getRoles, addRole, updateRole, deleteRole } from "@/api/role";
// import { getRoleIdByMenuId, addRoleMenu } from "@/api/role_menu";
// import { getMenus } from "@/api/menu";
// export default {
//   name: "Permission",
//   data() {
//     return {
//       role_list: [],
//       role_data: {},
//       role_menu_data: [],

//       menu_list: [],

//       dialogRole: false,
//       dialogRoleType: "ADD",
//       dialogMenu: false,

//       role_id: "",

//       defaultProps: {
//         children: "children",
//         label: "title"
//       }
//     };
//   },
//   created() {
//     this.getRoles();
//   },
//   computed: {},
//   methods: {
//     //查询角色列表
//     getRoles() {
//       getRoles().then(response => {
//         this.role_list = response.data;
//       });
//     },

//     getMenus() {
//       getMenus().then(response => {
//         //递归生成Tree
//         this.menu_list = tree(response.data);
//         function tree(data) {
//           let map = {};
//           let obj = [];
//           data.forEach(item => {
//             map[item.id] = item;
//           });
//           data.forEach(item => {
//             let parent = map[item.parent_id];
//             if (parent) {
//               if (!Array.isArray(parent.children)) {
//                 parent.children = [];
//               }
//               parent.children.push(item);
//             } else {
//               obj.push(item);
//             }
//           });
//           return obj;
//         }
//       });

//       function nodes() {}
//     },

//     //新建角色按钮
//     addRoleHandle() {
//       this.role_data = {};
//       this.dialogRole = true;
//       this.dialogRoleType = "ADD";
      
//     },

//     //编辑角色按钮
//     updateRoleHandle(data) {
//       this.role_data = data;
//       this.dialogRole = true;
//       this.dialogRoleType = "UPDATE";
//     },

//     //删除角色按钮
//     deleteRoleHandle(index, data) {
//       console.log(index);
//       deleteRole(data.id).then(response => {
//         this.role_list.splice(index, 1);
//         this.$message(response.msg);
//       });
//     },

//     //提交 新建&编辑角色
//     confirmRole() {
//       //表单校验
//       //TODO

//       if (this.dialogRoleType == "ADD") {
//         this.$refs['roleForm'].resetFields();
//         //新建角色
//         addRole(this.role_data).then(response => {
//           //新建完成，更新角色列表
//           this.role_list.push(response.data);
//           this.$message(response.msg);
//           this.dialogRole = false;
//         });
//       } else {
//         //编辑角色
//         updateRole(this.role_data).then(response => {
//           this.$message(response.msg);
//           this.dialogRole = false;
//         });
//       }
//     },
//     //根据角色ID查询对应选中的菜单节点
//     roleMenuHandle(role_id) {
//       this.role_id = role_id;
//       this.dialogMenu = true;
//       this.getMenus();
//       getRoleIdByMenuId(role_id).then(response => {
//         //根据对应关系设置选中节点 role_menu_data
//         //TODO
//         this.role_menu_data = response.data;

//         const { data } = response;
//         let nodes = [];
//         for (let x in data) {
//           nodes.push(data[x].menu_id);
//         }

//         this.$refs.tree.setCheckedKeys(nodes);
//       });
//     },

//     //保存选中的的菜单节点
//     addRoleMenu() {
//       const nodes = [];
//       const menu_nodes = this.$refs.tree.getCheckedKeys();
//       menu_nodes.forEach(item => {
//         nodes.push({ role_id: this.role_id, menu_id: item });
//       });
//       addRoleMenu(this.role_id, nodes).then(response => {
//         this.$message(response.msg);
//         this.dialogMenu = false;
//       });
//     },
//     resetForm(formName) {
//       this.$refs[formName].resetFields();
//     }
//   },
//   components: {}
// };
</script>


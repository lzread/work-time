<template>
  <div class="container">

    <div class="head">

      <el-button
        size="mini"
        @click="addRoleHandle"
      >新建</el-button>

    </div>

    <el-dialog
      :visible.sync="dialogRole"
      :title="dialogRoleType==='UPDATE'?'编辑角色':'新建角色'"
    >
      <el-form
        :model="role_data"
        label-width="80px"
        label-position="left"
        size="mini"
      >
        <el-form-item label="角色名称">
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
        <el-table :data="role_list">
          <el-table-column
            prop="role_name"
            label="角色名称"
          >
          </el-table-column>
          <el-table-column
            prop="role_desc"
            label="角色描述"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="updateRoleHandle(scope.row)"
                type="text"
                size="mini"
              >编辑角色</el-button>
              <el-button
                @click="roleMenuHandle(scope.row.id)"
                type="text"
                size="mini"
              >权限菜单</el-button>

            </template>
          </el-table-column>
        </el-table>
      </template>

    </div>

  </div>
</template>

<script>
/**
 * #角色&权限&菜单 管理页面#
 * step1 新增角色
 * step2 编辑菜单&编辑权限
 */
import { getRoles, addRole, updateRole } from "@/api/role";
import { getRoleIdByMenuId, addRoleMenu } from "@/api/role_menu";
import { getMenus } from "@/api/menu";
export default {
  name: "Permission",
  data() {
    return {
      role_list: [],
      role_data: {},
      role_menu_data: [],

      menu_list: [],

      dialogRole: false,
      dialogRoleType: "ADD",
      dialogMenu: false,

      role_id: "",

      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    this.getRoles();
  },
  computed: {},
  methods: {
    //查询角色列表
    getRoles() {
      getRoles().then(response => {
        this.role_list = response.data;
      });
    },

    getMenus() {
      getMenus().then(response => {
        //递归生成Tree
        this.menu_list = tree(response.data);
        function tree(data) {
          let map = {};
          let obj = [];
          data.forEach(item => {
            map[item.id] = item;
          });
          data.forEach(item => {
            let parent = map[item.parent_id];
            if (parent) {
              if (!Array.isArray(parent.children)) {
                parent.children = [];
              }
              parent.children.push(item);
            } else {
              obj.push(item);
            }
          });
          return obj;
        }
      });

      function nodes() {}
    },

    //新建角色弹出层
    addRoleHandle() {
      this.role_data = {};
      this.dialogRole = true;
      this.dialogRoleType = "ADD";
    },

    //编辑角色弹出层
    updateRoleHandle(data) {
      this.role_data = data;
      this.dialogRole = true;
      this.dialogRoleType = "UPDATE";
    },

    //提交 新建&编辑角色
    confirmRole() {
      //表单校验
      //TODO

      if (this.dialogRoleType == "ADD") {
        //新建角色
        addRole(this.role_data).then(response => {
          //新建完成，更新角色列表
          this.role_list.push(response.data);
          this.$message(response.msg);
          this.dialogRole = false;
        });
      } else {
        //编辑角色
        updateRole(this.role_data).then(response => {
          this.$message(response.msg);
          this.dialogRole = false;
        });
      }
    },
    //根据角色ID查询对应选中的菜单节点
    roleMenuHandle(role_id) {
      this.role_id = role_id;
      this.dialogMenu = true;
      this.getMenus();
      getRoleIdByMenuId(role_id).then(response => {
        //根据对应关系设置选中节点 role_menu_data
        //TODO
        this.role_menu_data = response.data;

        const { data } = response;
        let nodes = [];
        for (let x in data) {
          nodes.push(data[x].menu_id);
        }

        this.$refs.tree.setCheckedKeys(nodes);
      });
    },

    //保存选中的的菜单节点
    addRoleMenu() {
      const nodes = [];
      const menu_nodes = this.$refs.tree.getCheckedKeys();
      menu_nodes.forEach(item => {
        nodes.push({ role_id: this.role_id, menu_id: item });
      });

      console.log(nodes);

      addRoleMenu(this.role_id, nodes).then(response => {
        console.log(response);
      });
    }
  },
  components: {}
};
</script>


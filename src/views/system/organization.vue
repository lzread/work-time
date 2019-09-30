<template>
  <div class="app-container">

    <div class="search-bar">
      <div class="cell">
        <el-button
          size="mini"
          icon="el-icon-plus"
          :disabled="depButtons.create"
          @click="depVisible('create')"
        >创建部门</el-button>
        <el-button
          size="mini"
          icon="el-icon-edit"
          :disabled="depButtons.edit"
          @click="depVisible('edit')"
        >编辑部门</el-button>
        <el-button
          size="mini"
          icon="el-icon-delete"
          :disabled="depButtons.delete"
          @click="depDelete()"
        >删除部门</el-button>
      </div>
      <div class="cell">
        <el-button
          size="mini"
          icon="el-icon-plus"
        >添加员工</el-button>
        <el-button
          size="mini"
          icon="el-icon-finished"
          :disabled="empButtons.message"
        >批量移动</el-button>
        <el-button
          size="mini"
          icon="el-icon-turn-off"
          :disabled="empButtons.freeze"
        >批量冻结</el-button>
        <el-button
          size="mini"
          icon="el-icon-delete"
          :disabled="empButtons.delete"
        >批量删除</el-button>
        <el-button
          size="mini"
          icon="el-icon-download"
          :disabled="empButtons.export"
        >批量导出</el-button>
        <el-button
          size="mini"
          icon="el-icon-upload2"
          :disabled="empButtons.import"
        >批量导入</el-button>
        <el-button
          size="mini"
          icon="el-icon-s-promotion"
          :disabled="empButtons.message"
        >消息群发</el-button>
      </div>
    </div>

    <div class="tree-area">
      <div class="tree">
        <el-input
          class="filter"
          size="mini"
          v-model="filterText"
          placeholder="输入部门名称进行过滤"
          suffix-icon="el-icon-search"
        ></el-input>
        <el-tree
          ref="tree"
          :data="depList"
          :props="defaultProps"
          :default-expand-all="true"
          :highlight-current="true"
          node-key="id"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="depNodeClick"
        ></el-tree>
      </div>
      <div class="area">
        <el-table
          :data="empList"
          v-loading="empListLoading"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            sortable
          ></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="100"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.sex == 0 ? '男' : '女'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="position_name"
            label="职务"
            sortable
          ></el-table-column>

          <el-table-column
            prop="tel"
            label="手机号"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
              >查看</el-button>
              <el-button
                type="text"
                size="mini"
              >冻结</el-button>
              <el-button
                type="text"
                size="mini"
              >重置密码</el-button>
              <el-button
                type="text"
                size="mini"
              >发送消息</el-button>
              <el-button
                type="text"
                size="mini"
              >编辑</el-button>
              <el-button
                type="text"
                size="mini"
              >删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getUsersList"
        />

      </div>
    </div>

    <el-dialog
      :title="depDialogs.dialogType === 'edit' ? '编辑部门' : '新建部门'"
      :visible.sync="depDialogs.dialogVisible"
      width="30%"
    >

      <el-form
        ref="form"
        :model="depRow"
        label-width="60px"
        size="mini"
      >
        <el-form-item label="上级部门">
          <el-input
            style="width:calc(100% - 60px);"
            v-model="depCurrentRow.name"
            readonly
          ></el-input>
          <el-button
            size="mini"
            @click="depSelect"
          >选择</el-button>
        </el-form-item>

        <el-form-item label="部门名称">
          <el-input v-model="depRow.name"></el-input>
        </el-form-item>

        <el-form-item size="large">
          <el-button
            size="mini"
            @click="depConfirm"
          >Confirm</el-button>
          <el-button
            size="mini"
            @click="depCancel"
          >Cancel</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <select-dep @callback="depCallback"></select-dep>

    

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepClone, formatJson } from "@/utils";
import { getUsersList } from "@/api/user";
import {
  createDepartments,
  editDepartments,
  deleteDepartments,
  getDepartmentsTreeList
} from "@/api/department";
import Pagination from "@/components/Pagination";
import SelectDep from "@/components/Department/select";
export default {
  name: "DepartmentManage",
  data() {
    return {
      depList: [],
      depRow: {},
      depCurrentRow: {},
      empList: [],
      empListLoading: false,
      depSelectDialogVisible: false,
      depButtons: {
        create: true,
        edit: true,
        delete: true
      },
      depDialogs: {
        dialogType: "",
        dialogVisible: false
      },
      empButtons: {
        freeze: true,
        delete: true,
        export: true,
        import: true,
        message: true
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      filterText: "",
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.depTreeList();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {},
  methods: {
    depVisible(type) {
      this.depDialogs.dialogVisible = true;

      const node = this.$refs.tree.getCurrentNode();

      /*---------------用来判断编辑部门的时候不可以选择当前节点--------------------*/
      this.$store.dispatch("department/setCurrentNode", node);
      /*------------------------------------------------------------------------*/

      this.depRow = deepClone(node);

      if (type == "create") {
        this.depRow = {};
        this.depDialogs.dialogType = "create";
        this.depRow.parentId = node.id;
      } else {
        this.depDialogs.dialogType = "edit";
        this.$refs.tree.setCurrentKey(this.depRow.parentId);
      }

      this.depCurrentRow = this.$refs.tree.getCurrentNode();
    },
    depConfirm() {
      if (this.depDialogs.dialogType == "create") {
        createDepartments(this.depRow).then(response => {
          this.depDialogs.dialogVisible = false;
          this.depTreeList();
        });
      } else {
        editDepartments(this.depRow).then(response => {
          this.depDialogs.dialogVisible = false;
          this.depTreeList();
        });
      }
    },
    depDelete() {
      let department_id = this.$refs.tree.getCurrentNode().id;
      let department_name = this.$refs.tree.getCurrentNode().name;
      let department_children = this.$refs.tree.getCurrentNode().children;
      let msg = "";

      if (department_children) {
        msg = "[ " + department_name + " ] 下包含子部门,是否删除?";
      } else {
        msg = "是否删除 [ " + department_name + " ] ?";
      }

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDepartments(department_id).then(response => {
            this.depTreeList();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    depCancel() {
      this.depDialogs.dialogVisible = false;
    },

    /**
     * VUEX 选择部门
     */
    depSelect() {
      //打开弹出层
      this.$store.dispatch("department/setDialogVisible", true);
      //传递上一级选择节点
      this.$store.dispatch(
        "department/setCurrentParentNode",
        this.depCurrentRow
      );
    },
    /**
     * 选择部门回调
     * @param {*} item 当前选择节点
     */
    depCallback(item) {
      this.depCurrentRow = item;
      this.depRow.parentId = item.id;

      if (this.depDialogs.dialogType == "create") {
      } else {
        //this.depRow.id = item.id;
      }
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    depTreeList() {
      getDepartmentsTreeList().then(response => {
        this.depList = response.data;
      });
    },

    getUsersList() {
      this.empListLoading = true;
      let department_id = this.$refs.tree.getCurrentNode().id;
      getUsersList(department_id, this.listQuery).then(response => {
        this.empList = response.data;
        this.total = response.total;
        this.empListLoading = false;
      });
    },

    depNodeClick(data) {
      this.getUsersList();
      this.listQuery.page = 1;
      this.depButtons.create = false;
      if (this.$refs.tree.getCurrentNode().parentId) {
        this.depButtons.edit = false;
        this.depButtons.delete = false;
      } else {
        this.depButtons.edit = true;
        this.depButtons.delete = true;
      }
    }
  },
  components: { Pagination, SelectDep }
};
</script>

<style lang="scss">
.el-popper .el-scrollbar__wrap {
  overflow-x: scroll;
}
</style>


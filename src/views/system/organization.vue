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
        >删除部门</el-button>
      </div>
      <div class="cell">
        <el-button
          size="mini"
          icon="el-icon-plus"
        >添加员工</el-button>
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
          placeholder="输入部门名称进行过滤"
          suffix-icon="el-icon-search"
        ></el-input>
        <el-tree
          ref="tree"
          :data="depList"
          :props="defaultProps"
          :default-expand-all="true"
          :highlight-current="true"
          :current-node-key="0"
          :expand-on-click-node="false"
          @node-click="handleDepartmentNodeClick"
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
        label-width="80px"
        size="mini"
      >

        <el-form-item label="上级部门" v-show="depDialogs.dialogType === 'create'">
          <el-input
            v-model="depParentName"
            readonly
          ></el-input>
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

  </div>
</template>

<script>
import { deepClone, formatJson } from "@/utils";
import { getUsersList } from "@/api/user";
import {
  createDepartments,
  editDepartments,
  getDepartmentsTreeList
} from "@/api/department";
import Pagination from "@/components/Pagination";
export default {
  name: "DepartmentManage",
  data() {
    return {
      depList: [],
      depRow: {},
      depParentName: "",
      empList: [],
      empListLoading: false,
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
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getDepartmentsTreeList();
  },
  computed: {},
  methods: {
    depVisible(type) {
      this.depRow = {};
      this.depParentName = "";
      if (type == "create") {
        this.depDialogs.dialogType = "create";
        this.depDialogs.dialogVisible = true;
        this.depRow.parentId = this.$refs.tree.getCurrentNode().id;
        this.depParentName = this.$refs.tree.getCurrentNode().name;
      } else {
        this.depDialogs.dialogType = "edit";
        this.depDialogs.dialogVisible = true;
        this.depRow = deepClone(this.$refs.tree.getCurrentNode());
      }
    },
    depConfirm() {
      if (this.depDialogs.dialogType == "create") {
        createDepartments(this.depRow).then(response => {
          this.depDialogs.dialogVisible = false;
          this.getDepartmentsTreeList();
          console.log(response);
        });
      } else {
        editDepartments(this.depRow).then(response => {
          this.depDialogs.dialogVisible = false;
          this.getDepartmentsTreeList();
          console.log(response);
        });
      }
    },
    depCancel() {
      this.depDialogs.dialogVisible = false;
    },

    getDepartmentsTreeList() {
      getDepartmentsTreeList(1).then(response => {
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

    handleDepartmentNodeClick(data) {
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
  components: { Pagination }
};
</script>


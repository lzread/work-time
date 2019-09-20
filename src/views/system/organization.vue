<template>
  <div class="app-container">

    <div class="search-bar">
      <div class="cell">
        <el-button
          size="mini"
          icon="el-icon-plus"
          :disabled="depButtons.create"
        >创建部门</el-button>
        <el-button
          size="mini"
          icon="el-icon-edit"
          :disabled="depButtons.edit"
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
          :data="departmentList"
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
          :data="employeeList"
          v-loading="employeeListLoading"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            sortable
          ></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
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
          @pagination="getEmployeeByDepartmentId"
        />

      </div>
    </div>

  </div>
</template>

<script>
import { deepClone, formatJson } from "@/utils";
import { getDepartment, getEmployeeByDepartmentId } from "@/api/system";
import Pagination from "@/components/Pagination";
export default {
  name: "DepartmentManage",
  data() {
    return {
      departmentList: [],
      employeeList: [],
      employeeListLoading: false,
      depButtons: {
        create: true,
        edit: true,
        delete: true
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
    this.getDepartment();
  },
  computed: {},
  methods: {
    getDepartment() {
      getDepartment().then(response => {
        this.departmentList = response.data;
      });
    },

    getEmployeeByDepartmentId() {
      this.employeeListLoading = true;
      let department_id = this.$refs.tree.getCurrentNode().id;
      let query = Object.assign(
        { department_id: department_id },
        this.listQuery
      );
      getEmployeeByDepartmentId(query).then(response => {
        this.employeeList = response.data.items;
        this.total = response.data.total;
        this.employeeListLoading = false;
      });
    },

    handleDepartmentNodeClick(data) {
      this.getEmployeeByDepartmentId();
      this.listQuery.page = 1;
    }
  },
  components: { Pagination }
};
</script>


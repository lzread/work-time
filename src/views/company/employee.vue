<template>
  <div class="app-container">

    <div class="search-bar">
      <el-button
        size="mini"
        icon="el-icon-plus"
        @click="create"
      ></el-button>

      <el-button
        :loading="downloadLoading"
        size="mini"
        icon="el-icon-download"
        @click="handleDownload"
      >
      </el-button>

      <el-button
        size="mini"
        style="float:right"
        icon="el-icon-search"
      ></el-button>

    </div>

    <div class="data-area">
      <el-table
        :data="list"
        v-loading="listLoading"
      >

        <el-table-column
          prop="name"
          label="Name"
        >
        </el-table-column>
        <el-table-column
          prop="position_name"
          label="Position"
        >
        </el-table-column>
        <el-table-column
          prop="department_name"
          label="Department"
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="Tel"
        >
        </el-table-column>

        <el-table-column label="Options">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleView(scope.row)"
            >View</el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.row)"
            >Edit</el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(scope)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      title="view"
      :visible.sync="dialogView"
      width="30%"
    >

      <pre>{{row}}</pre>

    </el-dialog>

    <el-dialog
      :title="dialogType==='edit'?'Edit':'Create'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        ref="form"
        :model="row"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="name">
          <el-input v-model="row.name"></el-input>
        </el-form-item>
        <el-form-item label="birth">
          <el-date-picker
            v-model="row.birth"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="sex">
          <el-radio-group v-model="row.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="tel">
          <el-input v-model="row.tel"></el-input>
        </el-form-item>
        <el-form-item label="mail">
          <el-input v-model="row.mail"></el-input>
        </el-form-item>
        <el-form-item label="address">
          <el-input v-model="row.address"></el-input>
        </el-form-item>
        <el-form-item label="department">
          <el-select
            v-model="row.department_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="position">
          <el-select
            v-model="row.position_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="large">
          <el-button
            size="mini"
            @click="confirm"
          >Confirm</el-button>
          <el-button
            size="mini"
            @click="cancel"
          >Cancel</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { deepClone, formatJson } from "@/utils";
import Pagination from "@/components/Pagination";
import { getEmployee, getDepartment, getPosition } from "@/api/company";
export default {
  name: "EmployeeManage",
  data() {
    return {
      list: [],
      departmentList: [],
      positionList: [],

      row: {},

      dialogView: false,
      dialogVisible: false,
      dialogType: "",

      listLoading: true,
      downloadLoading: false,

      total: 0,

      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    getList() {
      this.listLoading = true;
      getEmployee(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    getSelectList() {
      getDepartment().then(response => {
        this.departmentList = response.data.items;
      });
      getPosition().then(response => {
        this.positionList = response.data.items;
      });
    },
    create() {
      this.dialogType = "create";
      this.dialogVisible = true;
      this.row = {};
      this.getSelectList();
    },
    confirm() {
      if (this.dialogType == "create") {
      } else {
      }
      this.dialogVisible = false;
    },
    cancel() {
      this.dialogVisible = false;
    },
    handleDownload() {},
    handleView(row) {
      this.row = row;
      this.dialogView = true;
    },
    handleEdit(row) {
      this.dialogType = "edit";
      this.row = deepClone(row);
      this.dialogVisible = true;
      this.getSelectList();
    },
    handleDelete({ $index, row }) {}
  },
  components: { Pagination }
};
</script>


<template>
  <div class="app-container">

    <div class="search-bar">
      <div class="cell">
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item label="快速筛选">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="cell">
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="create"
        ></el-button>
      </div>
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

        <el-table-column label="Options">
          <template slot-scope="scope">
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
import { getDepartment } from "@/api/company";
export default {
  name: "DepartmentManage",
  data() {
    return {
      list: [],
      dialogVisible: false,
      dialogType: "",
      listLoading: true,
      row: {},
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
      getDepartment(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    create() {
      this.dialogType = "create";
      this.dialogVisible = true;
    },
    confirm() {
      if (this.dialogType == "create") {
        createCategory(this.row).then(response => {
          this.$message("success");
        });
      } else {
        updateCategory(this.row.id, this.row).then(response => {
          this.$message("success");
        });
      }
      this.dialogVisible = false;
    },
    cancel() {
      this.dialogVisible = false;
    },

    search() {},

    handleEdit(row) {
      this.dialogType = "edit";
      this.row = deepClone(row);
      this.dialogVisible = true;
    },
    handleDelete({ $index, row }) {
      deleteCategory(row.id).then(response => {
        this.list.splice($index, 1);
        this.$message("success");
      });
    }
  },
  components: { Pagination }
};
</script>


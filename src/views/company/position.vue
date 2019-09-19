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
import { getPosition } from "@/api/company";
export default {
  name: "position",
  data() {
    return {
      list: [],
      dialogView: false,
      dialogVisible: false,
      dialogType: "",
      listLoading: true,
      downloadLoading: false,
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
      getPosition(this.listQuery).then(response => {
        console.log(response);
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
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filterVal = ["id", "name"];
        const list = this.list;
        const data = formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: ["ID", "NAME"],
          data,
          filename: "",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
    },
    handleView(row) {
      this.row = row;
      this.dialogView = true;
    },
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


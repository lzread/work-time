<template>
  <div class="app-container">

    <div class="data-area">
      <el-table
        :data="list"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children'}"
      >

        <el-table-column
          prop="name"
          label="部门"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
            >添加</el-button>
            <el-button
              type="text"
              size="mini"
            >编辑</el-button>
            <el-button
              type="text"
              size="mini"
              v-show="scope.row.pid != 0 && !scope.row.children"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script>
import { deepClone, formatJson } from "@/utils";
import { getDepartment } from "@/api/system";
export default {
  name: "DepartmentManage",
  data() {
    return {
      list: [],
      listLoading: true,

      row: {}
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    getList() {
      this.listLoading = true;
      getDepartment().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    }
  },
  components: {}
};
</script>


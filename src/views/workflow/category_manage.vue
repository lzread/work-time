<template>
  <div id="CategoryManage">

    <div class="condition">

      <el-button
        size="mini"
        icon="el-icon-plus"
      ></el-button>
    </div>

    <el-table
      :data="category"
      style="width: 100%"
    >
      <el-table-column label="icon">
        <template slot-scope="scope">
          <el-image
            style="width: 24px; height: 24px"
            :src="scope.row.icon"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
      >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="Create time"
      >
      </el-table-column>
      <el-table-column label="Options">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="view(scope.row)"
          >view</el-button>
          <el-button
            type="text"
            size="mini"
            @click="edit(scope.row)"
          >edit</el-button>
          <el-button
            type="text"
            size="mini"
          >delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="view"
      :visible.sync="dialogView"
      width="30%"
    >

      <pre>{{row}}</pre>

    </el-dialog>

    <el-dialog
      title="view"
      :visible.sync="dialogEdit"
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
          <el-button size="mini" @click="confirm">Confirm</el-button>
          <el-button size="mini" @click="cancel">Cancel</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deepClone } from "@/utils";
const defaultRow = {};
export default {
  name: "CategoryManage",
  data() {
    return {
      dialogView: false,
      dialogEdit: false,
      row: Object.assign({}, defaultRow)
    };
  },
  created() {
    this.$store.dispatch("workflow/getCategory", "1200");
  },
  computed: {
    ...mapGetters({
      category: "workflow/category"
    })
  },
  methods: {
    add() {},
    view(row) {
      this.row = row;
      this.dialogView = true;
    },
    edit(row) {
      this.row = deepClone(row);
      this.dialogEdit = true;
    },
    confirm() {
      console.log(this.row);
    },
    cancel() {
      this.dialogEdit = false;
    }
  },
  components: {}
};
</script>


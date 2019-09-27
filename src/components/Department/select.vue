<template>
  <el-dialog
    title=""
    :visible.sync="visible"
    :before-close="cancel"
    width="300px"
  >

    <div class="tree-cell">
      <div class="hd">
        <el-input
          class="filter"
          size="mini"
          v-model="filterText"
          placeholder="输入部门名称进行过滤"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>

      <div class="bd">
        <el-tree
          ref="tree"
          :data="depList"
          :props="{ children: 'children', label: 'name'}"
          :default-expand-all="true"
          :highlight-current="true"
          node-key="id"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="depNodeClick"
        ></el-tree>
      </div>

      <div class="ft">
        <el-button
          size="mini"
          @click="confirm"
        >Confirm</el-button>
        <el-button
          size="mini"
          @click="cancel"
        >Cancel</el-button>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getDepartmentsTreeList } from "@/api/department";
export default {
  name: "SelectDepartment",
  data() {
    return {
      depList: [],
      filterText: ""
    };
  },
  computed: {
    ...mapGetters({
      visible: "department/dialogVisible",
      current: "department/currentNode"
    })
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    visible() {
      this.depTreeList();
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch("department/setDialogVisible", false);
      this.$store.dispatch(
        "department/setCurrentNode",
        this.$refs.tree.getCurrentNode()
      );
      this.$emit("callback", this.current);
    },
    cancel() {
      this.$store.dispatch("department/setDialogVisible", false);
    },
    depTreeList() {
      getDepartmentsTreeList().then(response => {
        this.depList = response.data;
      });
      setTimeout(() => {
        this.$refs.tree.setCurrentKey(this.current.id);
      }, 100);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    depNodeClick(data) {}
  }
};
</script>

<style lang="scss" scoped>
.tree-cell {
  .bd {
    height: 200px;
    overflow: auto;
    margin: 20px 0;
    border: 1px solid #e6e6e6;
    padding: 20px;
  }
  .ft {
    text-align: center;
  }
}
</style>

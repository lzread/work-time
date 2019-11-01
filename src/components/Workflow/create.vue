<template>
  <el-dialog
    title=""
    :visible.sync="visible"
    :before-close="cancel"
    width="600px"
  >

    <el-form size="mini">
      <el-form-item>
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="mini"
          type="primary"
          @click="confirm"
        >提交</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="cancel"
        >取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CreateFlow",
  computed: {
    ...mapGetters({
      visible: "workflow/dialogVisible"
    })
  },
  methods: {
    confirm() {
      
    },
    cancel() {
      this.$store.dispatch("workflow/setDialogVisible", false);
    }
  }
};
</script>

<style scoped>
</style>

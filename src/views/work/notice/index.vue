<template>
  <div class="container">
    <div class="filterBar">
      <el-button size="mini" type="primary" @click="addHandle">新建</el-button>
    </div>
    <div class="tableArea">
      <el-table :data="rows" stripe>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="release_time" label="发布时间"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" size="mini">正常</el-tag>
            <el-tag v-else size="mini">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="editHandle(scope.row)" type="text" size="mini">编辑</el-button>
            <el-button @click="delHandle(scope.$index, scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog width="400px" :visible.sync="dialogVisible" :title="dialogVisibleType == 'add' ? '新建' : '编辑'">
      <el-form :model="items" label-width="80px" label-position="right" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="items.title" />
        </el-form-item>
        <el-form-item label="发布日期" prop="content">
          <el-date-picker v-model="items.release_time" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="items.content" :autosize="{ minRows: 5, maxRows: 10 }" type="textarea" />
          <el-upload class="avatar-uploader" action="http://127.0.0.1:3111/api/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageURL" :src="imageURL" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="items.content" :autosize="{ minRows: 5, maxRows: 10 }" type="textarea" />
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="items.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="-1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button size="mini" type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="commitHandle()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, edit, del } from "@/api/notice";
import Pagination from "@/components/Pagination";
export default {
  name: "WorkNotice",
  props: {},
  data() {
    return {
      rows: [],
      items: {},
      dialogVisible: false,
      dialogVisibleType: "",
      total: 0,
      imageURL: "",
      listQuery: {
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  filters: {},
  computed: {},
  methods: {
    async getList() {
      const { data, total } = await list(this.listQuery);
      this.rows = data;
      this.total = total;
    },
    addHandle(row) {
      this.dialogVisible = true;
      this.dialogVisibleType = "add";
    },
    editHandle(row) {
      this.dialogVisible = true;
      this.dialogVisibleType = "edit";
      this.items = row;
      this.imageURL = row.image;
    },
    delHandle(index, row) {
      this.$confirm("是否删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.rows.splice(index, 1);
        await del(row.id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },

    handleAvatarSuccess(res, file) {
      if (res.code == "200") {
        this.imageURL = URL.createObjectURL(file.raw);
        this.items.image = res.url;
      } else {
        this.$message.error("上传失败，请重试");
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    async commitHandle() {
      if (this.dialogVisibleType == "add") {
        const { data } = await add(this.items);
      } else {
        const { data } = await edit(this.items);
      }
      this.dialogVisible = false;
      this.getList();
    },
  },
  directives: {},
  watch: {},
  components: { Pagination },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

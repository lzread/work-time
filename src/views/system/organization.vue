<template>
  <div id="home">

    <div class="menu-cells">

      <pre>{{assignPowers}}</pre>

      <el-table
        :data="menus"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >

        <el-table-column
          prop="title"
          label="菜单"
        >
        </el-table-column>

        <el-table-column
          prop="powers"
          label="权限"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="setPermHandle(scope.row)">设置</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>

    <!-- 

    <el-dialog
      width="400px"
      :visible.sync="dialogPower"
      title="权限设置"
    >
      <el-checkbox-group
        v-model="powers_code"
        size="mini"
      >
        <el-checkbox-button
          v-for="(item, index) in powers_default"
          :key="index"
          :label="item.power_code"
        >{{item.power_name}}{{item.id}}</el-checkbox-button>
      </el-checkbox-group>

      <div slot="footer">
        <el-button
          size="mini"
          type="danger"
          @click="dialogPower = false"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="submitPower"
        >提交</el-button>
      </div>

    </el-dialog> -->

  </div>
</template>

<script>
import { getMenus } from "@/api/menu";
import { getPowers, getAssignPowers } from "@/api/power";
import { mapGetters } from "vuex";
import { deepClone } from "@/utils";

export default {
  name: "home",
  data() {
    return {
      menus: [],
      powers: [],
      assignPowers: []
    };
  },
  created() {
    this.getMenus(this.user_id);
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  methods: {
    async getPowers(menu_id) {
      const { data } = await getPowers(menu_id);
      this.powers = data;
    },

    async getAssignPowers(menu_id) {
      const { data } = await getAssignPowers({ menu_id: menu_id, role_id: 3 });
      this.assignPowers = data;
    },

    async getMenus(user_id) {
      const { data } = await getMenus(user_id);
      this.menus = this.treeList(data);
    },

    setPermHandle(row) {
      //this.getPowers(row.id);
      this.getAssignPowers(row.id);
    },

    treeList(data) {
      let obj = [];
      let map = [];
      data.forEach(item => {
        map[item.id] = item;
      });

      data.forEach(item => {
        let parent = map[item.parent_id];
        if (parent) {
          if (!Array.isArray(parent.children)) {
            parent.children = [];
          }
          parent.children.push(item);
        } else {
          obj.push(item);
        }
      });
      return obj;
    }
  },
  components: {}
};
</script>

<style>
#NavBar,
#SideBar,
#TagsView {
  display: none !important;
}
#Layout,
#AppMain {
  padding: 0 !important;
  margin: 0 !important;
}
</style>

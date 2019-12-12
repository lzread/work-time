<template>
  <div id="home">


    <div class="menu-cells">

      <el-table
        :data="powerMenuTreeList"
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

        <el-table-column label="权限">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.powers_code"
              :key="index"
            >
              <el-tag>{{item}}</el-tag>&nbsp;
            </span>

          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.powers_default.length != 0">
              <el-button @click="editPowerHandle(scope.row)"></el-button>
            </div>
          </template>
        </el-table-column>

        <!--
        <el-table-column label="权限设置">
          <template slot-scope="scope">
            <div v-if="scope.row.parent_id != 0">
              <el-checkbox-group
                v-model="scope.row.powers_code"
                size="mini"
              >
                <el-checkbox-button
                  v-for="(item, index) in scope.row.powers_default"
                  :key="index"
                  :label="item.power_code"
                >{{item.power_name}}{{item.id}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
				-->

      </el-table>

    </div>

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

    </el-dialog>

  </div>
</template>

<script>
import { getMenusByRoleId, getMenuPowersByRoleId } from "@/api/menu";
import { getPowers, addRolePowerBatch } from "@/api/power";
import { deepClone } from "@/utils";
export default {
  name: "home",
  data() {
    return {
      dialogPower: false,
      role_id: 3,
      powerMenuTreeList: [],
      powerAllList: [],
      powerList: [],
      powers_default: [],
      powers_code: []
    };
  },
  created() {
    this.getPowers();
  },
  computed: {},
  methods: {
    async getCheckedPowers(role_id) {
      const { data } = await getMenuPowersByRoleId(role_id);
      this.powerAllList = data;
    },
    async getPowers() {
      const { data } = await getPowers();
      this.powerList = data;
      this.getCheckedPowers(this.role_id);
      this.getMenus(this.role_id);
    },
    async getMenus(role_id) {
      const { data } = await getMenusByRoleId(role_id);
      let allPower = this.powerList;
      let allPowerChecked = this.powerAllList;
      data.forEach(item => {
        let powers = [];
        let powers_code = [];
        allPower.forEach(i => {
          if (i.menu_id == item.id) {
            powers.push(i);
          }
        });
        item.powers_default = powers;
        allPowerChecked.forEach(i => {
          if (i.menu_id == item.id) {
            powers_code.push(i.power_code);
          }
        });
        item.powers_code = powers_code;
      });

      this.powerMenuTreeList = this.treeList(data);
    },
    editPowerHandle(row) {
      this.dialogPower = true;
      this.powers_default = deepClone(row.powers_default);
      this.powers_code = deepClone(row.powers_code);
    },
    async submitPower() {
      let data = [];
      this.powers_default.forEach(item => {
        this.powers_code.forEach(i => {
          if (i == item.power_code) {
            data.push({
              id: item.id
            });
          }
        });
      });

      try {
        await addRolePowerBatch(3, data);
        this.getPowers();
        this.dialogPower = false;
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {},

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

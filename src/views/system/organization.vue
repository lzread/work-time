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
        <!-- <el-table-column
          prop="title"
          label="菜单"
        >
        </el-table-column> -->

        <!-- <el-table-column label="权限">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.powers_code"
              :key="index"
            >
              <el-tag>{{item}}</el-tag>&nbsp;
            </span>

          </template>
        </el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="text"
              @click="addPowerHandle(scope.row)"
            >编辑</el-button>
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

      <div slot="footer">
        <el-button
          size="mini"
          type="danger"
          @click="dialogPower = false"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addPower"
        >提交</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getMenusByRoleId, getMenuPowersByRoleId } from "@/api/menu";
import { getPowers, addRolePowerBatch } from "@/api/power";
export default {
  name: "home",
  data() {
    return {
      dialogPower: false,
      powerMenuTreeList: [],
      powerAllList: [],
      powerList: []
    };
  },
  created() {
    this.getPowers();
    this.getCheckedPowers("3");
    this.getMenus("3");
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
    addPowerHandle(row) {
			
			row.powers_code.forEach(item => {
				row.powers_default.forEach(i => {
					if(i.power_code == item){
						console.log(i)
					}
				});

			});
    },
    addPower() {},
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

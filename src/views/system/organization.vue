<template>
  <div id="home">

    <div class="menu-cells">

      <pre>{{list}}</pre>

      <ul>
        
      </ul>

    </div>

  </div>
</template>

<script>
import { getMenusByRoleId } from "@/api/menu";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    getList() {
      getMenusByRoleId("3").then(response => {
        let { data } = response;
        this.list = this.treeList(data);
      });
    },
    treeList(data) {
      let map = {};
      let obj = [];
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

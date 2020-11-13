<template>
    <div id="SideBar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu unique-opened router :default-active="$route.path">
                <sidebar-item :items="permission_routes"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
    name: "SideBar",
    computed: {
        ...mapGetters(["permission_routes"]),
    },
    methods: {},
    components: { SidebarItem },
};
</script>

<style lang="scss" scoped>
#SideBar {
    width: 200px;
    height: calc(100% - 55px);
    position: fixed;
    top: 55px;
    left: 0;
    border-right: 1px solid #e6e6e6;
}
</style>



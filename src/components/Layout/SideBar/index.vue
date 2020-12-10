<template>
    <div id="SideBar">
        <div class="brand"></div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu unique-opened router :default-active="$route.path" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText">
                <sidebar-item :items="permission_routes"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
    name: "SideBar",
    computed: {
        ...mapGetters(["permission_routes"]),
        variables() {
            return variables;
        },
    },
    methods: {},
    components: { SidebarItem },
};
</script>

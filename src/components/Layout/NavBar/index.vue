<template>
    <div id="NavBar">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="navbar-info">
            <!--
      <el-dropdown style="margin: 0 10px" @command="local" trigger="click">
        <span class="el-dropdown-link">
          <em>{{ local_language }}</em
          ><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh-CN">zh-CN</el-dropdown-item>
          <el-dropdown-item command="en">en-US</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
	-->

            <el-avatar :size="24" :src="avatar"></el-avatar>

            <el-dropdown style="margin: 0 10px" @command="person" trigger="click">
                <span class="el-dropdown-link">
                    <em>Hi, {{ name }} </em><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="settings">个人设置</el-dropdown-item>
                    <el-dropdown-item command="password">密码修改</el-dropdown-item>
                    <el-dropdown-item command="logout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>
<script>
import permission from "@/directive/permission/index.js"; // 权限判断指令
import { mapGetters } from "vuex";
export default {
    name: "NavBar",
    data() {
        return {
            //local_language: this.$i18n.locale,
        };
    },
    directives: { permission },
    components: {},
    created() {},
    computed: {
        ...mapGetters({
            name: "name",
            avatar: "avatar",
        }),
    },
    methods: {
        local(command) {
            switch (command) {
                case "zh-CN":
                    this.$i18n.locale = "zh-CN";
                    this.local_language = "zh-CN";
                    break;
                case "en":
                    this.$i18n.locale = "en-US";
                    this.local_language = "en-US";
                    break;
            }
        },
        person(command) {
            switch (command) {
                case "settings":
                    this.$router.push({ path: "/system/user_settings" });
                    break;
                case "password":
                    this.$router.push({ path: "/system/user_password" });
                    break;
                case "logout":
                    this.$store
                        .dispatch("user/logout")
                        .then(() => {
                            this.$router.push({ path: "/login" });
                        })
                        .catch(() => {});
                    break;
            }
        },
    },
};
</script>
<style lang="scss">
</style>

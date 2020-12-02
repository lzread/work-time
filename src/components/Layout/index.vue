<template>
    <div id="Layout">
        <side-bar />
        <nav-bar />
        <tags-view />
        <app-main />
    </div>
</template>

<script>

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import AppMain from "./AppMain";
import TagsView from "./TagsView";

export default {
    name: "Layout",
    components: { NavBar, SideBar, AppMain, TagsView },
};
</script>

<style lang="scss" scoped>

</style>

<template>
    <div id="AppMain">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="cachedViews">
                    <router-view :key="key" />
                </keep-alive>
            </transition>
        </el-scrollbar>
    </div>
</template>
<script>
export default {
    name: "AppMain",
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews;
        },
        key() {
            return this.$route.path;
        },
    },
};
</script>

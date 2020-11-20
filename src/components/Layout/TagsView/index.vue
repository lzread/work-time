<template>
    <div id="TagsView">
        <router-link tag="span" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path" :class="isActive(tag)?'active':''">
            {{tag.name}}
            <i v-show="tag.path != '/'" class='el-icon-close' @click.prevent.stop="delSelectTag(tag)"></i>
        </router-link>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: "TagsView",
    computed: {
        ...mapGetters({
            visitedViews: "visitedviews",
        }),
    },
    mounted() {
        this.addViewTags();
    },
    methods: {
        isActive(route) {
            return route.path == this.$route.path;
        },
        addViewTags() {
            const { name } = this.$route;
            if (name) {
                this.$store.dispatch("addVisitedViews", this.$route);
            }
            return false;
        },
        delSelectTag(route) {
            this.$store.dispatch("delVisitedViews", route).then((views) => {
                if (this.isActive(route)) {
                    let lastView = views.slice(-1)[0];
                    if (lastView) {
                        this.$router.push({ path: lastView.path });
                    } else {
                        this.$router.push("/");
                    }
                }
            });
        },
    },
    watch: {
        $route() {
            this.addViewTags();
        },
    },
};
</script>

<style lang="scss" scoped>
#TagsView {
    width: calc(100% - 200px);
    height: 35px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    position: fixed;
    right: 0;
    top: 55px;
    z-index: 9;
    background-color: #fff;
    padding: 0 2.5px;
    box-sizing: border-box;
    font-size: 12px;

    span {
        border: 1px solid #eee;
        margin: 0 2.5px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        padding: 0 5px;
        cursor: pointer;
        color: #ccc;
        background-color: #f9f9f9;

        i {
            margin: 0 0 0 5px;
            &:hover {
                color: #333;
                transition: all 0.5s;
            }
        }

        &.active {
            background-color: #fff;
            border-color: #e6e6e6;
            color: #333;
        }
    }
}
</style>

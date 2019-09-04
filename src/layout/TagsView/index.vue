<template>
  <div id="TagsView">
    <router-link
      tag="span"
      v-for="tag in Array.from(visitedViews)"
      :to="tag.path"
      :key="tag.path"
      :class="isActive(tag)?'active':''"
    >
      {{tag.name}}
      <i
        v-show="tag.path != '/'"
        class='el-icon-close'
        @click.prevent.stop="delSelectTag(tag)"
      ></i>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "TagsView",
  computed: {
    ...mapGetters({
      visitedViews: "visitedviews"
    })
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
      this.$store.dispatch("delVisitedViews", route).then(views => {
        if (this.isActive(route)) {
          let lastView = views.slice(-1)[0];
          if (lastView) {
            this.$router.push(lastView);
          } else {
            this.$router.push("/home");
          }
        }
      });
    }
  },
  watch: {
    $route() {
      this.addViewTags();
    }
  }
};
</script>

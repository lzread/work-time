<template>
  <div id="AppMain">

    <el-main>

      <transition name="slide-fade">
        <router-view />
      </transition>

    </el-main>

  </div>
</template>
<script>
export default {
  name: "AppMain",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  components: {}
};
</script>
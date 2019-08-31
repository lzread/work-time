<template>
  <div id="home">
    <top></top>
    <el-container>
      <sidenav></sidenav>
      <el-main>
        <transition name="slide-fade">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import top from "@/components/top";
import sidenav from "@/components/sidenav";
export default {
  name: "home",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  components: { top, sidenav }
};
</script>
<style lang="less">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: none;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

#home {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  height: 100%;
  #top {
    width: calc(100% - 200px);
    position: absolute;
    right: 0;
    top: 0;
    & > .header {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      height: 44px;
      border-bottom: solid 1px #e6e6e6;
      padding: 0 0 0 10px;
      & > .info {
        flex-grow: 1;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: flex-end;
        .block {
          height: 100%;
          padding: 0 20px;
          flex-grow: 0;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          background-color: #f9f9f9;
          .el-avatar {
            margin: 0 10px 0 0;
          }
        }
      }
    }
    & > .page-tabs {
      padding: 5px 2.5px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      border-bottom: solid 1px #e6e6e6;
      .item {
        border: 1px solid #e6e6e6;
        margin: 0 2.5px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        height: 25px;
        padding: 0 5px;
        a {
          padding: 0 5px;
          font-size: 12px;
        }
        i {
          cursor: pointer;
          &:hover {
            background-color: #ddd;
            color: #fff;
            transition: all 0.5s;
          }
        }
        &.current {
          background-color: #eee;
          border-color: #eee;
          i {
            display: none;
          }
        }
      }
    }
  }
  #sidenav {
    height: 100%;
    & > .el-menu:not(.el-menu--collapse) {
      width: 200px;
      height: 100%;
    }
  }
  & > .el-container > .el-main {
    margin-top: 80px;
    padding: 0;
  }

  /*-------ElementUI 样式调整部分-------*/
  @fontSize: 12px;
  .el-menu {
    .el-menu-item {
      font-size: @fontSize;
      height: 44px;
      line-height: 44px;
    }
    .el-submenu__title {
      font-size: @fontSize;
      height: 44px;
      line-height: 44px;
    }
  }
  .el-dropdown {
    font-size: @fontSize;
  }
  .el-dropdown-menu__item {
    font-size: @fontSize;
  }
  .el-breadcrumb {
    font-size: @fontSize;
  }
  .el-table {
    font-size: @fontSize;
    td,
    th {
      padding: 5px 0;
    }
  }
}
</style>

<template>
  <el-menu
    :default-active="$route.name"
    :collapse="isCollapse"
    @select="handleSelect"
    background-color="rgb(22, 87, 155)"
    text-color="#fff"
    active-text-color="#fff"
    class="menu-bar"
  >
    <sidebar-item v-for="item in availableRoutes" :key="item.path" :item="item" />
  </el-menu>
</template>

<script>
import { mapState } from 'vuex';
import SidebarItem from '@/components/SidebarItem';

export default {
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },

  components: {
    SidebarItem
  },

  computed: {
    ...mapState(['dynamicRoutes']),

    availableRoutes() {
      return this.dynamicRoutes[0].children;
    }
  },

  methods: {
    handleSelect(key) {
      // 点击菜单强制刷新路由
      this.$router.push({
        path: key,
        query: {
          t: Date.now()
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-bar {
  height: $side-bar-height;
  overflow-y: scroll;
  transition: all 0s;
  .el-menu-item {
    overflow: hidden;
  }
}
.menu-bar:not(.el-menu--collapse) {
  width: $side-bar-width;
}
/deep/ .el-menu-item,
/deep/ .el-submenu__title {
  height: 44px !important;
  line-height: 44px !important;
}
/deep/ .el-submenu .el-menu-item {
  min-width: 0 !important;
}
/deep/ .el-menu-item.is-active {
  background-color: rgb(10, 44, 74) !important;
}
/deep/ .el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background-color: rgb(10, 44, 74) !important;
}
</style>

<template>
  <el-menu
    :default-active="$route.name"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#000"
    active-text-color="#fe7c7f"
  >
    <sidebar-item v-for="item in availableRoutes" :key="item.path" :item="item" />
  </el-menu>
</template>

<script>
import { mapState } from 'vuex';
import SidebarItem from '@/components/SidebarItem';

export default {
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
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
/deep/ .el-menu-item,
/deep/ .el-submenu__title {
  height: $menu-height !important;
  line-height: $menu-height !important;
  border-bottom: none !important;
}
/deep/ .el-menu-item.is-active {
  background-color: #f1f4f5 !important;
  border-bottom: none !important;
}
/deep/ .el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background-color: #f1f4f5 !important;
}
</style>

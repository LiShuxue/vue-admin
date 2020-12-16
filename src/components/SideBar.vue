<template>
  <el-menu
    :default-active="defaultActiveRoute"
    :collapse="isCollapse"
    @select="handleSelect"
    background-color="#eef1f6"
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

    defaultActiveRoute() {
      return this.dynamicRoutes[0].redirect;
    },

    availableRoutes() {
      return this.dynamicRoutes[0].children;
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    }
  }
};
</script>

<style lang="scss">
.menu-bar {
  height: calc(100vh - 60px);
  .iconfont {
    margin-right: 15px;
  }
  .el-menu-item {
    overflow: hidden;
  }
}
.menu-bar:not(.el-menu--collapse) {
  width: 14vw;
}
</style>

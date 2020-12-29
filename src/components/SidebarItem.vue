<template>
  <el-menu-item :index="item.name" v-if="!item.children">
    <!-- <i v-if="item.meta && item.meta.icon" class="iconfont" :class="item.meta.icon"></i> -->
    <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
  </el-menu-item>

  <el-submenu :index="item.name" v-else>
    <template slot="title">
      <!-- <i v-if="item.meta && item.meta.icon" class="iconfont" :class="item.meta.icon"></i> -->
      <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
    </template>

    <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-submenu>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  margin-right: 10px;
  color: white;
}
</style>

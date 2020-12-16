<template>
  <div>
    <template v-if="!item.children">
      <el-menu-item :index="item.name">
        <i v-if="item.meta && item.meta.icon" class="iconfont" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

    <template v-else>
      <el-submenu :index="item.name">
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" class="iconfont" :class="item.meta.icon"></i>
          <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
        </template>

        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
      </el-submenu>
    </template>
  </div>
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

<template>
  <div class="table-content">
    <div class="table" :style="wrapperStyle">
      <div class="grid" :style="gridStyle">
        <slot name="grid"></slot>
      </div>
      <div class="page">
        <slot name="page"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gridHeight: Number
  },

  computed: {
    wrapperStyle() {
      return this.gridHeight ? `height: ${this.gridHeight + 35}px;` : '';
    },
    gridStyle() {
      return this.gridHeight ? `height: ${this.gridHeight}px;` : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.table-content {
  $table-height: 100%;

  .table {
    height: $table-height;
    background: #fff;
    .grid {
      height: calc(#{$table-height} - #{$table-pagination-height});
      // overflow-y: scroll; // 不再需要， 因为table设置了height 100% , 高度等于当前高度, 所以表头固定，表内滚动
    }
  }
  .page {
    position: absolute;
    width: 100%;
    height: $table-pagination-height;
    right: 0;
    bottom: 0;
    border-top: 1px solid rgba(144, 166, 193, 0.3);

    /deep/ .el-pagination {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>

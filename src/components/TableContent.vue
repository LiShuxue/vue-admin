<template>
  <div class="table-content">
    <div class="grid">
      <!-- 列表 -->
      <el-table :data="tableData" style="width: 100%" height="100%" @selection-change="selectionChange" border>
        <el-table-column
          v-for="item in columnList"
          :type="item.type"
          :prop="item.field"
          :label="item.headerName"
          :align="item.align"
          :width="item.width"
          :key="item.key"
        >
        </el-table-column>
        <slot name="ops-column"> </slot>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalItem"
        layout="total, sizes, prev, pager, next"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columnList: Array, // 列
    dataList: Array, // 后端返回的所有的list信息
    height: Number
  },

  data() {
    return {
      tableData: [], // 当前页面显示的table
      pageIndex: 1, // 分页器上显示的当前页
      pageSize: 10, // 每页的条数
      totalItem: 0 // 数据的总条数
    };
  },

  watch: {
    dataList() {
      this.initData();
    }
  },

  methods: {
    // 初始化所有数据
    initData() {
      this.totalItem = this.dataList.length;
      this.tableData = this.dataList.slice(0, this.pageSize);
      this.pageIndex = 1;
    },

    // 改变每页的条数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.tableData = this.dataList.slice(0, this.pageSize);
    },
    // 改变当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      let currentPageArrIndexStart = (val - 1) * this.pageSize;
      let currentPageArrIndexEnd = (val - 1) * this.pageSize + this.pageSize;
      this.tableData = this.dataList.slice(currentPageArrIndexStart, currentPageArrIndexEnd);
    },
    // 在table中选择不同的行
    selectionChange(sels) {
      this.$emit('select', sels);
    }
  }
};
</script>

<style lang="scss" scoped>
$table-height: 225px;
$pagination-height: 35px;

.table-content {
  position: relative;
  background: white;
  height: $table-height;
  .grid {
    height: calc(100% - #{$pagination-height});
  }

  .pagination {
    position: absolute;
    border-bottom: 0;
    right: 0;
    height: $pagination-height;
  }
}
</style>

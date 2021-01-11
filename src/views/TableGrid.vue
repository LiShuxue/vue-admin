<template>
  <div class="table-grid">
    <div style="margin-bottom: 30px;">
      <div>表格列可配置。 表格区域(包含分页)默认高度225px</div>
      <table-content :columnList="tableFileds" :dataList="userList"> </table-content>
    </div>

    <div style="margin-bottom: 30px;">
      <div>带选择框， 列宽度自适应。 表格区域(包含分页)高度由当前的class "test" 决定</div>
      <table-content :columnList="tableFiledsWithSelect" :dataList="userList" @select="onSelectChange" class="test">
      </table-content>
    </div>

    <div>带操作列，表格区域(包含分页)高度由参数height自定义</div>
    <table-content :columnList="tableFiledsWithAutoWidth" :dataList="userList" :height="300">
      <template v-slot:ops-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="seeDetail(scope.row)" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </template>
    </table-content>
  </div>
</template>

<script>
import TableContent from '@/components/TableContent';
import { getUserList } from '@/ajax/api';

export default {
  data() {
    return {
      tableFileds: [
        {
          field: 'name',
          headerName: '名称',
          width: '200',
          align: 'center'
        },
        {
          field: 'age',
          headerName: '年龄',
          width: '',
          align: 'center'
        }
      ],

      tableFiledsWithSelect: [
        {
          type: 'selection',
          width: '100'
        },
        {
          field: 'name',
          headerName: '名称',
          width: '',
          align: 'center'
        },
        {
          field: 'age',
          headerName: '年龄',
          width: '',
          align: 'center'
        }
      ],

      tableFiledsWithAutoWidth: [
        {
          field: 'name',
          headerName: '名称',
          width: '',
          align: 'center'
        },
        {
          field: 'age',
          headerName: '年龄',
          width: '',
          align: 'center'
        }
      ],
      userList: []
    };
  },
  components: {
    TableContent
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      getUserList().then(res => {
        this.userList = res;
      });
    },

    onSelectChange(rows) {
      console.log(rows);
    },

    seeDetail(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-grid {
  .test {
    height: 180px;
  }
}
</style>

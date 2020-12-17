<template>
  <div class="user">
    <!-- 工具条 -->
    <el-form :inline="true" :model="filterForm" size="mini">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryUser">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showForm">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" :disabled="this.selectRows.length === 0" @click="clickDeleteAll">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <table-content
      :columnList="tableFiledsWithAutoWidth"
      :dataList="userList"
      @select="onSelectChange"
      class="my-table"
    >
      <template v-slot:ops-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="showForm(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="clickDeleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </table-content>

    <!-- 表单页面 -->
    <el-dialog :visible.sync="formVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="clickConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableContent from '@/components/TableContent';
import { getUserList } from '@/ajax/api';
export default {
  data() {
    return {
      // 顶部工具条表单信息
      filterForm: {
        name: ''
      },

      // 表单信息模板
      formTemplate: {
        name: '',
        age: ''
      },

      form: {}, // 新增页面表单信息
      formVisible: false, // 控制新增页面显示

      selectRows: [], // 选中的行

      tableFiledsWithAutoWidth: [
        {
          type: 'selection',
          width: '60'
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
    // 初始化页面数据
    initData() {
      this.queryUser();
    },

    // 查询店铺
    queryUser() {
      getUserList().then(res => {
        this.userList = res;
      });
    },

    // 点击新增按钮，显示Form表单
    showForm(row) {
      this.formVisible = true;
      this.form = Object.assign({}, this.formTemplate, row);
    },
    // 点击取消按钮，关闭Form表单
    closeForm() {
      this.$confirm('确认放弃编辑吗？', '提示', {}).then(() => {
        this.formVisible = false;
      });
    },
    // 点击确定，增加店铺
    clickConfirm() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        console.log(this.form);
        this.formVisible = false;
      });
    },

    // 点击批量删除
    clickDeleteAll() {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let ids = this.selectRows.map(value => {
          return value.id;
        });
        this.deleteUserItem(ids);
      });
    },
    // 在某一行点击删除
    clickDeleteItem(row) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteUserItem([row.id]);
      });
    },
    deleteUserItem(ids) {
      console.log(ids);
    },

    // 在table中选择不同的行
    onSelectChange(sels) {
      console.log(sels);
      this.selectRows = sels;
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .my-table {
    height: 500px;
  }
}
</style>

<template>
  <div class="admin">
    <!-- 工具条 -->
    <el-form :inline="true" :model="filterForm">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryUsers">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showAddForm">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" :disabled="this.selectRows.length===0" @click="clickDeleteAll">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table :data="tableData" stripe border style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" width="200" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="200" align="center"></el-table-column>
      <el-table-column prop="date" label="创建时间" width="200" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button size="mini" @click="clickEditItem(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDeleteItem(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalItem"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <!-- 新增页面 -->
    <el-dialog title="新增管理员" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="addForm.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddForm">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑页面 -->
    <el-dialog title="编辑管理员" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="editForm.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditForm">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterForm: {
        name: ''
      },
      addForm: {
        name: '',
        phone: '',
        date: ''
      },
      editForm: {
        name: '',
        phone: '',
        date: ''
      },
      tableData: [],
      mockTableData: [],
      selectRows: [],
      addFormVisible: false,
      editFormVisible: false,
      pageIndex: 1,
      pageSize: 10,
      totalItem: 0
    }
  },

  created() {
    let mockTableData = [];
    for (let i = 1; i <= 100; i++) {
      mockTableData.push({
        id: i,
        name: '张三' + i,
        phone: '13112213445',
        date: '2016-05-02'
      })
    }
    this.mockTableData = mockTableData
    this.totalItem = mockTableData.length
    console.log(mockTableData.length);
    this.tableData = mockTableData.slice(0, this.pageSize)
    console.log(mockTableData.length);
  },

  methods: {
    // 查询用户
    queryUsers() {
      console.log(this.filterForm.name)
      let arr = this.tableData.filter((value, index) =>{
        return value.name === this.filterForm.name
      })
      this.tableData = arr
    },

    // 点击新增按钮，显示Form表单
    showAddForm() {
      console.log('open add dialog')
      this.addFormVisible = true
      this.addForm = {
        name: '',
        phone: '',
        date: ''
      }
    },
    // 点击取消按钮，关闭Form表单
    closeAddForm() {
      console.log('close add')
      this.addFormVisible = false
    },
    // 点击确定，增加用户
    addUser() {
      console.log('add user')
      console.log(this.addForm)
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        let id = this.tableData[this.tableData.length - 1].id
        this.tableData.push(Object.assign({}, this.addForm, { id: id + 1 }))
        this.addFormVisible = false
      })
    },

    // 点击批量删除
    clickDeleteAll() {
      console.log('delete all')
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        console.log(this.selectRows)
        this.tableData = this.tableData.filter((value) => {
          return !this.selectRows.includes(value)
        })
      }).catch(() => {})
    },

    // 在table中选择不同的行
    selectionChange(sels) {
      console.log(sels)
      this.selectRows = sels;
    },

    // 在某一行点击编辑
    clickEditItem(index, row) {
      console.log(index)
      console.log(row)
      this.editFormVisible = true
      this.editForm = row
    },
    // 关闭编辑页面
    closeEditForm() {
      console.log('close edit form')
      this.editFormVisible = false
    },
    // 编辑以后点击确定
    editUser() {
      console.log('edit user')
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        let idArr = this.tableData.map((value) => {
          return value.id
        })
        let index = idArr.indexOf(this.editForm.id)
        this.tableData[index] = this.editForm
        this.editFormVisible = false
      })
    },

    // 在某一行点击删除
    handleDeleteItem(index, row) {
      console.log(index)
      console.log(row)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.tableData = this.tableData.filter((value) => {
          return value.id !== row.id
        })
      }).catch(() => {})
    },

    // 改变每页的条数
    sizeChangeHandle (val) {
      console.log(val)
      this.pageSize = val
      this.pageIndex = 1

      this.tableData = this.mockTableData.slice(0, this.pageSize)
    },
    // 改变当前页
    currentChangeHandle (val) {
      console.log(val)
      this.pageIndex = val
      let currentPageArrIndexStart = (val - 1) * this.pageSize
      let currentPageArrIndexEnd = (val - 1) * this.pageSize + this.pageSize
      this.tableData = this.mockTableData.slice(currentPageArrIndexStart, currentPageArrIndexEnd)
    }
  }
}
</script>

<style lang="scss">
.admin {
  padding: 20px;

  .pagination{
    position: absolute;
    right: 0px;
    margin: 20px;
  }
}
</style>

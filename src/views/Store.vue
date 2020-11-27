<template>
  <div class="store">
    <!-- 工具条 -->
    <el-form :inline="true" :model="filterForm">
      <el-form-item>
        <el-input v-model="filterForm.address" placeholder="请输入店铺地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryStore">查询</el-button>
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
      <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
      <el-table-column prop="role" label="店铺类型" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="负责人" width="100" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="200" align="center"></el-table-column>
      <el-table-column prop="address" label="店铺地址" width="400" align="center"></el-table-column>
      <el-table-column prop="date" label="创建时间" width="200" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="clickSeeItem(scope.row, scope.$index)">查看</el-button>
        <el-button size="mini" @click="clickEditItem(scope.row, scope.$index)">编辑</el-button>
        <el-button size="mini" type="danger" @click="clickDeleteItem(scope.row, scope.$index)">删除</el-button>
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
    <el-dialog title="新增店铺" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="店铺类型" prop="role">
          <el-radio-group v-model="addForm.role">
            <el-radio label="总店">总店</el-radio>
            <el-radio label="直营店">直营店</el-radio>
            <el-radio label="加盟店">加盟店</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="addForm.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddForm">取 消</el-button>
        <el-button type="primary" @click="clickAddStore">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑页面 -->
    <el-dialog title="编辑店铺" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="店铺类型" prop="role">
          <el-radio-group v-model="editForm.role">
            <el-radio label="总店">总店</el-radio>
            <el-radio label="直营店">直营店</el-radio>
            <el-radio label="加盟店">加盟店</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="editForm.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditForm">取 消</el-button>
        <el-button type="primary" @click="clickEditStore">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 店铺详情页 -->
    <el-dialog title="店铺详情" :visible.sync="seeFormVisible" :close-on-click-modal="false">
      <el-form :model="seeForm" label-width="80px">
        <el-form-item label="店铺类型" prop="role">
          <el-radio-group disabled v-model="seeForm.role">
            <el-radio label="总店">总店</el-radio>
            <el-radio label="直营店">直营店</el-radio>
            <el-radio label="加盟店">加盟店</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人" prop="name">
          <el-input disabled v-model="seeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input disabled v-model="seeForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input disabled v-model="seeForm.address"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker disabled v-model="seeForm.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeSeeForm">关 闭</el-button>
        <el-button @click="clickEditInSeeForm">编 辑</el-button>
        <el-button type="danger" @click="clickDeleteInSeeForm">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStoreList, saveStore, deleteStore, updateStore, getStoreDetail } from '@/ajax/api'
export default {
  data() {
    return {
      // 顶部工具条表单信息
      filterForm: {
        address: ''
      },

      // 表单信息模板
      formTemplate: {
        name: '',
        role: '',
        phone: '',
        address: '',
        date: ''
      },

      // 新增页面表单信息
      addForm: {},

      // 编辑页面表单信息
      editForm: {},

      // 查看详情页面表单信息
      seeForm: {},

      tableData: [], // 当前页面显示的table
      storeList: [], // 后端返回的所有的list信息
      queryList: [], // 查询出来的list信息
      selectRows: [], // 选中的行
      addFormVisible: false, // 控制新增页面显示
      editFormVisible: false, // 控制编辑页面显示
      seeFormVisible: false, // 控制查看详情页面显示
      pageIndex: 1, // 分页器上显示的当前页
      pageSize: 10, // 每一页的条数
      totalItem: 0 // 数据的总条数
    }
  },

  computed: {
    // 将一些数据转换成用户可以懂的信息
    refactorTableData() {
      let refactorData = []
      this.tableData.forEach(value => {
        let item = Object.assign({}, value)
        item.date = value.date.substring(0, 10)
        refactorData.push(item)
      })
      return refactorData
    }
  },

  created() {
    this.initData()
  },

  methods: {
    // 初始化页面数据
    initData() {
      console.log('init data')
      getStoreList().then(response => {
        this.$message.success(response.msg)
        // 初始化所有数据
        this.storeList = response.data
        this.totalItem = this.storeList.length
        this.tableData = this.storeList.slice(0, this.pageSize)
        this.queryList = []
        this.selectRows = []
        this.pageIndex = 1
      }).catch(err => {
        err && this.$message.error(err.msg || err.message)
      })
    },

    // 查询店铺
    queryStore() {
      console.log(this.filterForm.address)
      let arr = this.storeList.filter((value, index) =>{
        return value.address.includes(this.filterForm.address)
      })
      this.queryList = arr
      this.tableData = this.queryList.slice(0, this.pageSize)
      this.totalItem = this.queryList.length
      this.pageIndex = 1
    },

    // 点击新增按钮，显示Form表单
    showAddForm() {
      console.log('open add dialog')
      this.addFormVisible = true
      this.addForm = Object.assign({}, this.formTemplate)
    },
    // 点击取消按钮，关闭Form表单
    closeAddForm() {
      console.log('close add')
      this.$confirm('确认放弃添加吗？', '提示', {}).then(() => {
        this.addFormVisible = false
      })
    },
    // 点击确定，增加店铺
    clickAddStore() {
      console.log('add store')
      console.log(this.addForm)
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.addStore(this.addForm)
      })
    },
    addStore(store) {
      saveStore(store).then(response => {
        this.$message.success(response.msg)
        this.addFormVisible = false
        this.initData()
      }).catch(err => {
        err && this.$message.error(err.msg || err.message)
      })
    },

    // 点击批量删除
    clickDeleteAll() {
      console.log('delete all')
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let ids = this.selectRows.map(value => {
          return value.id
        })
        this.deleteStoreItem(ids)
      }).catch(() => {})
    },
    deleteStoreItem(ids){
      deleteStore({ orgIds: ids }).then(response => {
        this.$message.success(response.msg)
        this.initData()
      }).catch(err => {
        err && this.$message.error(err.msg || err.message)
      })
    },

    // 在table中选择不同的行
    selectionChange(sels) {
      console.log(sels)
      this.selectRows = sels;
    },

    // 在某一行点击查看
    clickSeeItem(row, index) {
      console.log(index)
      console.log(row)
      getStoreDetail(row.id).then(response => {
        this.$message.success(response.msg)
        this.seeForm = response.data
        this.seeFormVisible = true
      }).catch(err => {
        err && this.$message.error(err.msg || err.message)
      })
    },
    // 关闭详情页面
    closeSeeForm() {
      console.log('close see form')
      this.seeFormVisible = false
    },
    // 在详情页点击编辑
    clickEditInSeeForm() {
      console.log('edit in see form')
      this.seeFormVisible = false
      this.clickEditItem(this.seeForm)
    },
    // 在详情页点击删除
    clickDeleteInSeeForm() {
      console.log('delete in see form')
      this.seeFormVisible = false
      this.clickDeleteItem(this.seeForm)
    },

    // 在某一行点击编辑
    clickEditItem(row, index) {
      console.log(index)
      console.log(row)
      let editItem = this.tableData.filter(value => {
        return value.id === row.id
      })
      this.editForm = Object.assign({}, this.formTemplate, editItem[0])
      this.editFormVisible = true
    },
    // 关闭编辑页面
    closeEditForm() {
      console.log('close edit form')
      this.$confirm('确认放弃修改吗？', '提示', {}).then(() => {
        this.editFormVisible = false
      })
    },
    // 编辑以后点击确定
    clickEditStore() {
      console.log('edit store')
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editStore(this.editForm)
      })
    },
    editStore(store) {
      updateStore(store).then(response => {
        this.$message.success(response.msg)
        this.editFormVisible = false
        this.initData()
      }).catch(err => {
        err && this.$message.error(err.msg || err.message)
      })
    },

    // 在某一行点击删除
    clickDeleteItem(row, index) {
      console.log(index)
      console.log(row)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.deleteStoreItem([row.id])
      }).catch(() => {})
    },

    // 改变每页的条数
    sizeChangeHandle (val) {
      console.log(val)
      this.pageSize = val
      this.pageIndex = 1

      if (this.queryList.length > 0) {
        this.tableData = this.queryList.slice(0, this.pageSize)
      } else {
        this.tableData = this.storeList.slice(0, this.pageSize)
      }
    },
    // 改变当前页
    currentChangeHandle (val) {
      console.log(val)
      this.pageIndex = val
      let currentPageArrIndexStart = (val - 1) * this.pageSize
      let currentPageArrIndexEnd = (val - 1) * this.pageSize + this.pageSize

      if (this.queryList.length > 0) {
        this.tableData = this.queryList.slice(currentPageArrIndexStart, currentPageArrIndexEnd)
      } else {
        this.tableData = this.storeList.slice(currentPageArrIndexStart, currentPageArrIndexEnd)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.store {
  padding: 20px;

  .pagination{
    position: absolute;
    right: 0px;
    margin: 20px;
  }
}
</style>

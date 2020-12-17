<template>
  <div class="permission-control">
    <div class="menu">
      <div class="menu-content">
        <div
          v-for="item in roleList"
          :key="item"
          :class="[item === currentRole ? 'menu-item active' : 'menu-item']"
          @click="chooseRole(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <el-transfer
          v-model="defaultSelectedPerm1"
          :data="permData1"
          :titles="['未分配菜单权限', '已分配菜单权限']"
        ></el-transfer>
        <el-transfer
          v-model="defaultSelectedPerm2"
          :data="permData2"
          :titles="['未分配按钮权限', '已分配按钮权限']"
        ></el-transfer>
        <div class="my-btn">
          <el-button type="primary" @click="confirm" size="mini">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: ['角色1', '角色2', '角色3', '角色4'],
      currentRole: '角色1',

      // 组件用到的数据
      permData1: [],
      permData2: [],
      defaultSelectedPerm1: [],
      defaultSelectedPerm2: [],

      // 业务的数据
      totalMenuList: ['系统简介', '图表面板', '表格显示', '导入导出', '文本编辑', '权限管理'],
      totalPermList: ['按钮1', '按钮2', '按钮3', '按钮4', '按钮5'],
      roleMenuList: [],
      rolePermList: []
    };
  },

  watch: {
    currentRole() {
      this.setRoleInfo();
      this.setTransferComponentData();
    }
  },

  created() {
    this.initData();
  },
  methods: {
    chooseRole(role) {
      this.currentRole = role;
    },

    initData() {
      this.setRoleInfo();
      this.setTransferComponentData();
    },

    setRoleInfo() {
      // 根据role获取当前角色已经拥有的权限
      this.roleMenuList = [];
      this.rolePermList = [];
    },

    setTransferComponentData() {
      // 总数据
      const data1 = [];
      for (let i = 0; i < this.totalMenuList.length; i++) {
        data1.push({
          key: i,
          label: this.totalMenuList[i]
        });
      }
      this.permData1 = data1;

      const data2 = [];
      for (let i = 0; i < this.totalPermList.length; i++) {
        data2.push({
          key: i,
          label: this.totalPermList[i]
        });
      }
      this.permData2 = data2;

      // 设置已分配权限列表
      const arr1 = [];
      this.roleMenuList.forEach(item => {
        arr1.push(this.totalMenuList.indexOf(item));
      });
      this.defaultSelectedPerm1 = arr1;

      const arr2 = [];
      this.rolePermList.forEach(item => {
        arr2.push(this.totalPermList.indexOf(item));
      });
      this.defaultSelectedPerm2 = arr2;
    },

    confirm() {
      const arr1 = [];
      this.defaultSelectedPerm1.forEach(item => {
        arr1.push(this.totalMenuList[item]);
      });

      const arr2 = [];
      this.defaultSelectedPerm2.forEach(item => {
        arr2.push(this.totalPermList[item]);
      });

      // 分配的权限
      console.log(arr1);
      console.log(arr2);
    }
  }
};
</script>

<style lang="scss" scoped>
.permission-control {
  $transfer-parent-padding: 10px;
  $transfer-height: calc(0.5 * (#{$container-inner-height} - 5 * #{$transfer-parent-padding} - 28px));
  $transfer-header-height: 40px;

  display: flex;
  .menu {
    flex-grow: 1;
    flex-shrink: 1;
    height: $container-inner-height;
    width: calc(0.2 * #{$container-inner-width});
    margin: 0 $common-margin 0 0;
    background: white;

    .menu-content {
      padding: 20px 0 0 40px;
      .menu-item {
        padding: 10px 0;
        cursor: pointer;
      }
      .menu-item:hover,
      .active {
        color: #409eff;
      }
    }
  }
  .right {
    flex-grow: 1;
    flex-shrink: 1;
    width: calc(0.8 * #{$container-inner-width});
    height: $container-inner-height;
    margin: 0 $common-margin 0 0;
    background: white;

    .content {
      padding: $transfer-parent-padding;
      .my-btn {
        display: flex;
        justify-content: center;
        padding-top: $transfer-parent-padding;
      }

      /deep/ .el-transfer {
        display: flex;
        padding-bottom: $transfer-parent-padding;
        .el-transfer-panel {
          flex-grow: 1;
          flex-shrink: 1;
          height: $transfer-height;
          .el-transfer-panel__header {
            height: $transfer-header-height;
          }
          .el-transfer-panel__body {
            padding: calc(2 * #{$transfer-parent-padding}) 0;
            height: calc(#{$transfer-height} - #{$transfer-header-height});
            .el-checkbox-group.el-transfer-panel__list {
              height: 100%;
            }
          }
        }
        .el-transfer__buttons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .el-button + .el-button {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>

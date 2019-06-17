<template>
  <div class="home">
    <div class="header">
      <div :class="isCollapse?'menu-header-fold':'menu-header-unfold'">XXX管理系统</div>

      <div class="container-header">
        <div class="fold-icon" @click="foldMenu">
          <i v-show="isCollapse" class="el-icon-s-unfold"></i>
          <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        </div>
      </div>
    </div>

    <el-menu default-active="1" :collapse="isCollapse" @select="handleSelect" background-color="#eef1f6" class="menu-bar">
      <el-menu-item index="intro">
        <i class="el-icon-s-home"></i>
        <span slot="title">系统简介</span>
      </el-menu-item>
      <el-menu-item index="dashboard">
        <i class="el-icon-s-data"></i>
        <span slot="title">图表面板</span>
      </el-menu-item>
      <el-menu-item index="adminList">
        <i class="el-icon-s-custom"></i>
        <span slot="title">管理员列表</span>
      </el-menu-item>
      <el-menu-item index="userList">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="input">
        <i class="el-icon-edit"></i>
        <span slot="title">表单输入</span>
      </el-menu-item>
      <el-menu-item index="edit">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">文本编辑</span>
      </el-menu-item>
    </el-menu>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    foldMenu() {
      this.isCollapse = !this.isCollapse;
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.$router.push(key)
    }
  }
}
</script>

<style lang="scss">
.home {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;

  .header {
    width: 100%;
    height: 60px;
    background: #20a0ff;
    display: flex;
    flex-direction: row;

    .menu-header-fold {
      line-height: 60px;
      border-right: solid 1px white;
      box-sizing: border-box;
      padding-left: 20px;
      width: 65px;
      height: 100%;
      transition: all .4s;
    }

    .menu-header-unfold {
      line-height: 60px;
      border-right: solid 1px white;
      box-sizing: border-box;
      padding-left: 28px;
      width: calc(14vw + 1px);
      height: 100%;
      transition: all .4s;
    }

    .container-header {
      line-height: 60px;
      height: 100%;

      .fold-icon {
        padding: 0 15px;
        color: white;
        font-size: 1.5em;
      }
    }
  }

  .menu-bar{
    height: calc(100vh - 60px);

    .el-menu-item [class^=el-icon-] {
      margin-right: 15px;
    }

    .el-menu-item {
      overflow: hidden;
    }
  }
  .menu-bar:not(.el-menu--collapse) {
    width: 14vw;
  }

  .container{
    position: absolute;
    top: 60px;
    left: 14vw;
    width: 86vw;
    height: calc(100vh - 60px);
    padding: 20px;
  }
}
</style>

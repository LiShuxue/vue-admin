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

    <div class="container">
      <el-menu default-active="intro" :collapse="isCollapse" @select="handleSelect" background-color="#eef1f6" class="menu-bar">
        <el-menu-item index="intro">
          <i class="el-icon-s-home"></i>
          <span slot="title">系统简介</span>
        </el-menu-item>
        <el-menu-item index="dashboard">
          <i class="el-icon-s-data"></i>
          <span slot="title">图表面板</span>
        </el-menu-item>
        <el-menu-item index="admin">
          <i class="el-icon-s-custom"></i>
          <span slot="title">管理员列表</span>
        </el-menu-item>
        <el-menu-item index="user">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="input">
          <i class="el-icon-edit"></i>
          <span slot="title">表单输入</span>
        </el-menu-item>
        <el-menu-item index="editor">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">文本编辑</span>
        </el-menu-item>
      </el-menu>

      <div :class="isCollapse?'container-fold':'container-unfold'">
        <div class="container-wrapper">
          <router-view/>
        </div>
      </div>
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
  width: 100vw;
  height: 100vh;

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

  .container{
    display: flex;
    flex-direction: row;

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

    .container-unfold{
      position: relative;
      box-sizing: border-box;
      width: 86vw;
      padding: 20px;
      background: #f1f4f5;
      transition: all .4s;
    }
    .container-fold{
      position: relative;
      box-sizing: border-box;
      width: calc(100vw - 65px);
      padding: 20px;
      background: #f1f4f5;
      transition: all .4s;
    }

    .container-wrapper{
      position: absolute;
      top: 20px;
      left: 20px;
      bottom: 20px;
      right: 20px;
      background: #fff;
      overflow: scroll;
    }
  }
}
</style>

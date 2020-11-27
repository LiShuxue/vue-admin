<template>
  <div class="home">
    <div class="header">
      <div class="logo"></div>
      <div class="title">大港油田网络安全管理平台</div>
      <div class="tools">
        <span class="role">普通用户</span>
        <span class="danwei">单位：科技信息处</span>
        <span class="iconfont icon-quanping"></span>
        <span class="iconfont icon-huanfu"></span>
        <el-dropdown @command="handleCommand">
          <span class="iconfont icon-user"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="content">
      <side-bar :isCollapse="isCollapse"></side-bar>

      <div :class="isCollapse?'container-fold':'container-unfold'">
        <div class="container-wrapper">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogout } from '@/ajax/api.js'
import SideBar from '@/components/SideBar'

export default {
  data() {
    return {
      isCollapse: false
    }
  },

  components: {
    SideBar
  },

  methods: {
    foldMenu() {
      this.isCollapse = !this.isCollapse
    },

    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userLogout().then(response => {
            this.$message.success(response.msg)
            this.$store.dispatch('logout')
            this.$router.push('/login')
          }).catch(err => {
            err && this.$message.error(err.msg || err.message)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;

  .header {
    position: relative;
    width: 100%;
    height: 55px;
    color: rgba(255, 255, 255, 1);
    background: rgba(52, 128, 207, 1);
    display: flex;
    flex-direction: row;
    align-items: center;

    .logo{
      height: 30px;
      width: 30px;
      margin: 0 15px 0 30px;
      background: url('../assets/img/logo.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .title{
      font-size: 20px;
    }

    .tools{
      position: absolute;
      right: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .role, .danwei{
        margin-right: 50px;
      }
      .iconfont{
        font-size: 30px;
        margin-right: 10px;
      }
    }
  }

  .content{
    display: flex;
    flex-direction: row;

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

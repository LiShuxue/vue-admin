<template>
  <div class="home">

    <div class="header">
      <div :class="isCollapse?'system-title-fold':'system-title-unfold'">XXX管理系统</div>
      <div class="fold-icon" @click="foldMenu">
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
      </div>
      <div class="admin-icon">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="username">{{this.$store.state.username}}</span>
            <img src="https://ws4.sinaimg.cn/large/006tKfTcly1g0s9z66ra9j305k05k3yj.jpg"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login">个人中心</el-dropdown-item>
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
            this.$message.success(response.data.msg)
            this.$store.dispatch('logout')
            this.$router.push('/login')
          }).catch(err => {
            err && this.$message.error(err.data.msg)
          })
        })
      }
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

    .system-title-fold {
      line-height: 60px;
      border-right: solid 1px white;
      box-sizing: border-box;
      padding-left: 20px;
      width: 65px;
      height: 100%;
      transition: all .4s;
    }

    .system-title-unfold {
      line-height: 60px;
      border-right: solid 1px white;
      box-sizing: border-box;
      padding-left: 28px;
      width: calc(14vw + 1px);
      height: 100%;
      transition: all .4s;
    }

    .fold-icon {
      line-height: 60px;
      padding: 0 15px;
      color: white;
      font-size: 1.5em;
      width: 30px;
    }

    .admin-icon{
      position: absolute;
      right: 30px;
      height: 60px;
      line-height: 60px;
      .username{
        position: relative;
        top: -25px;
        right: 10px;
        color: #fff;
      }
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
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

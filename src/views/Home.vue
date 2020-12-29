<template>
  <div class="home">
    <div class="header">
      <div class="logo"></div>
      <div class="title">xxxx管理平台</div>
      <div class="tools">
        <span class="name">张三</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="user"></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="banner"></div>

    <div class="menu">
      <side-bar></side-bar>
    </div>

    <div class="container-wrapper">
      <router-view />
    </div>

    <div class="footer">
      <span class="mianze">版权与免责声明</span>
    </div>
  </div>
</template>

<script>
import { userLogout } from '@/ajax/api.js';
import SideBar from '@/components/SideBar';

export default {
  components: {
    SideBar
  },

  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm(`确定退出 ？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userLogout().then(() => {
            this.$store.dispatch('logout');
            this.$router.push('/login');
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: $app-width;
  height: $app-height;

  .header {
    position: relative;
    width: $header-width;
    height: $header-height;
    color: rgba(255, 255, 255, 1);
    background: rgba(52, 128, 207, 1);
    display: flex;
    flex-direction: row;
    align-items: center;

    .logo {
      height: 30px;
      width: 30px;
      margin: 0 15px 0 40px;
      background: url('../assets/img/logo.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .title {
      font-size: 20px;
    }

    .tools {
      position: absolute;
      right: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        margin-right: 50px;
      }
      .user {
        display: inline-block;
        height: 25px;
        width: 25px;
        background: url('../assets/img/user.png') no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
  }

  .banner {
    width: $banner-width;
    height: $banner-height;
    background: #405f93;
  }

  .menu {
    width: $menu-width;
    height: $menu-height;
  }

  .container-wrapper {
    width: $container-wrapper-width;
    height: $container-wrapper-height;
    padding: $container-wrapper-padding;
    overflow-y: scroll;
    background: #f1f4f5;
  }

  .footer {
    width: $footer-width;
    height: $footer-height;
    color: white;
    font-size: 14px;
    background: #354a79;
    line-height: $footer-height;

    .mianze {
      margin-left: 30px;
    }
  }
}
</style>

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

    <div class="content">
      <side-bar :isCollapse="isCollapse"></side-bar>

      <div class="container" :class="isCollapse ? 'container-collapse' : ''">
        <div class="container-header1">
          <span class="collapse" @click="collapseMenu"></span>
          <span class="path">{{ getPath().join(' / ') }}</span>
        </div>
        <div class="container-header2">
          <div class="content">
            <el-tag
              v-for="(tab, index) in tabList"
              :key="index"
              closable
              :class="[tab === $route.name ? 'my-tab choose' : 'my-tab']"
              @close="closeTab(tab)"
              @click="clickTab(tab)"
            >
              {{ getRouteTitle(tab) }}
            </el-tag>
          </div>
        </div>
        <div class="container-wrapper">
          <!-- key是为了点击菜单强制刷新路由-->
          <router-view :key="$route.path + $route.query.t"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { userLogout } from '@/ajax/api.js';
import SideBar from '@/components/SideBar';

export default {
  data() {
    return {
      isCollapse: false
    };
  },

  components: {
    SideBar
  },

  computed: {
    ...mapState(['dynamicRoutes', 'tabList'])
  },

  watch: {
    $route(to) {
      if (!this.tabList.includes(to.name)) {
        this.$store.commit('pushTab', to.name);
      }
    }
  },

  created() {
    this.$store.commit('pushTab', this.$route.name);
  },

  methods: {
    collapseMenu() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
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
    },

    routePathMappingName(mapping, routes) {
      routes.forEach(route => {
        mapping.push({ name: route.name, title: route.meta.title });
        if (route.children) {
          this.routePathMappingName(mapping, route.children);
        }
      });
      return mapping;
    },

    getRouteTitle(name) {
      let pathMappingName = this.routePathMappingName([], this.dynamicRoutes[0].children);
      let item = pathMappingName.filter(map => {
        return map.name === name;
      });
      return item[0] && item[0].title;
    },

    getPath() {
      let routePath = this.$router.currentRoute.matched;
      let routePathTitle = routePath.map(item => {
        return this.getRouteTitle(item.name);
      });
      routePathTitle.shift();

      if (routePathTitle[0] !== '管理平台') {
        routePathTitle.unshift('管理平台');
      }
      return routePathTitle;
    },

    clickTab(name) {
      this.$router.push(name);
    },

    closeTab(name) {
      this.$store.dispatch('deleteTabAction', name);
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

  .content {
    display: flex;
    flex-direction: row;
    background: #f1f4f5;
    width: $content-width;
    height: $content-height;
    .container {
      width: $container-width;
      height: $container-height;

      .container-header1 {
        width: $container-header1-width;
        height: $container-header1-height;
        padding-left: 30px;
        display: flex;
        align-items: center;
        color: rgba(144, 166, 193, 1);
        font-size: 15px;
        border-bottom: 1px solid rgba(144, 166, 193, 0.2);
        background: #fff;

        .collapse {
          display: inline-block;
          height: 20px;
          width: 20px;
          margin-right: 10px;
          background: url('../assets/img/collapse.png') no-repeat;
          background-size: contain;
          background-position: center;
          cursor: pointer;
        }
      }
      .container-header2 {
        width: $container-header2-width;
        height: $container-header2-height;
        padding: 0 30px;
        background: #fff;
        color: rgba(144, 166, 193, 1);
        border-bottom: 1px solid rgba(144, 166, 193, 0.2);
        box-shadow: $common-box-shadow;

        .content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          background: #fff;
          overflow-x: scroll;
        }

        .my-tab {
          background-color: #90a6c1;
          display: inline-block;
          height: 26px;
          line-height: 26px;
          font-size: 10px;
          color: white;
          border: none;
          border-radius: 0;
          margin-right: 10px;
          cursor: pointer;
        }
        .my-tab.choose {
          background: rgba(58, 142, 230, 1);
        }
        .my-tab /deep/ .el-icon-close {
          color: white;
        }
      }
      .container-wrapper {
        width: $container-wrapper-width;
        height: $container-wrapper-height;
        padding: $container-wrapper-padding;
        margin-bottom: $container-wrapper-margin-bottom;
        box-shadow: $common-box-shadow;
        overflow-y: scroll;
      }
    }

    .container-collapse {
      width: $container-collapse-width;
      .container-header1 {
        width: $container-header1-collapse-width;
      }
      .container-header2 {
        width: $container-header2-collapse-width;
      }
      .container-wrapper {
        width: $container-wrapper-collapse-width;
      }
    }
  }
}
</style>

<template>
  <div class="login-page">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="50px" class="login-form">
      <h3 class="title">系统登录</h3>

      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>

      <el-checkbox v-model="remeberPass" checked class="remember">记住密码</el-checkbox>

      <el-button type="primary" @click="submitLogin" class="login-button">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      remeberPass: true
    }
  },
  methods: {
    submitLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          console.log(this.loginForm.username)
          console.log(this.loginForm.password)

          this.$store.dispatch('saveAccessTokenAction', 'access_token-*****************')
          this.$store.dispatch('saveRefreshTokenAction', 'refresh_token-*****************')
          this.$store.dispatch('saveUsernameAction', this.loginForm.username)

          // 根据传过来的参数，跳到不同的页面
          let redirect = decodeURIComponent(this.$route.query.redirect)
          if (redirect !== 'undefined') {
            this.$router.push(redirect)
          } else {
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-page{
  .login-form{
    max-width: 400px;
    max-height: 400px;
    margin: 180px auto;
    padding: 30px 40px 30px 30px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;

    .title{
      text-align: center;
    }

    .remember{
      margin-left: 10px;
    }

    .login-button{
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>

<template>
  <div class="login-page">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="70px" class="login-form">
      <h3 class="title">系统登录</h3>

      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="captcha">
        <el-row>
          <el-col :span="14">
            <el-input type="text" v-model="loginForm.captcha" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="10">
            <img :src="captchaPath" @click="getCaptcha()" class="captcha-img">
          </el-col>
        </el-row>
      </el-form-item>

      <el-checkbox v-model="remeberPass" class="remember">记住密码</el-checkbox>

      <el-button type="primary" @click="submitLogin" class="login-button">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from '@/ajax/api.js'
import SHA256 from 'crypto-js/sha256'
import { getUUID } from '@/utils'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      remeberPass: false,
      captchaPath: ''
    }
  },

  created() {
    this.getCaptcha()
    // 恢复密码
    this.loginForm.username = localStorage.getItem('username')
    this.loginForm.password = localStorage.getItem('password')
  },

  methods: {
    submitLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let data = {
            username: this.loginForm.username,
            password: SHA256(this.loginForm.password).toString(),
            captcha: this.loginForm.captcha,
            uuid: this.loginForm.uuid
          }
          userLogin(data).then(response => {
            this.$message.success(response.data.msg)
            this.$store.dispatch('login', response.data)

            // 保存密码
            if (this.remeberPass) {
              localStorage.setItem('username', this.loginForm.username)
              localStorage.setItem('password', this.loginForm.password)
            } else {
              localStorage.removeItem('username')
              localStorage.removeItem('password')
            }

            // 根据传过来的参数，跳到不同的页面
            let redirect = decodeURIComponent(this.$route.query.redirect)
            if (redirect !== 'undefined') {
              this.$router.push(redirect)
            } else {
              this.$router.push('/home')
            }
          }).catch(err => {
            this.getCaptcha()
            err && this.$message.error(err.data.msg)
          })
        }
      })
    },

    getCaptcha () {
      this.loginForm.uuid = getUUID()
      this.captchaPath = process.env.VUE_APP_API_URL + `/captcha.jpg?uuid=${this.loginForm.uuid}`
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
    padding: 30px;
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

    .captcha-img{
      display: block;
      width: 100%;
      height: 40px;
      padding-left: 5px;
    }

    .login-button{
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>

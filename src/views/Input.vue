<template>
  <div class="input">
    <el-form :model="inputForm" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="inputForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="inputForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
          <el-radio label="不男不女">不男不女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="爱好" prop="favorite">
        <el-checkbox-group v-model="inputForm.favorite">
          <el-checkbox label="唱">唱</el-checkbox>
          <el-checkbox label="跳">跳</el-checkbox>
          <el-checkbox label="rap">rap</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="出生日期" prop="birth">
        <el-date-picker v-model="inputForm.birth" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-cascader v-model="inputForm.address" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
      </el-form-item>

      <el-form-item label="简介" prop="intro">
        <el-input type="textarea" placeholder="请输入内容" v-model="inputForm.intro" maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data() {
    return {
      inputForm: {
        name: '',
        sex: '',
        favorite: [],
        birth: '',
        address: [],
        intro: ''
      },
      options: regionData
    }
  },

  methods: {
    handleChange(value) {
      console.log(value)
      console.log(this.inputForm.address)
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  padding: 20px;
  width: 400px;
}
</style>

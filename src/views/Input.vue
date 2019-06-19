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

      <el-form-item label="地址" prop="adress">
        <el-cascader v-model="inputForm.adress" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
      </el-form-item>

      <el-form-item label="简介" prop="intro">
        <el-input type="textarea" placeholder="请输入内容" v-model="inputForm.intro" maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      options: [
        {
          value: '天津',
          label: '天津',
          children: [{
            value: '红桥区',
            label: '红桥区',
            children: [{
              value: '本溪路',
              label: '本溪路'
            }, {
              value: '洪湖里',
              label: '洪湖里'
            }]
          },
          {
            value: '滨海新区',
            label: '滨海新区',
            children: [{
              value: '泰达',
              label: '泰达'
            }, {
              value: '塘沽',
              label: '塘沽'
            }]
          }]
        },
        {
          value: '北京',
          label: '北京',
          children: [{
            value: '丰台区',
            label: '丰台区',
            children: [{
              value: '丰北桥',
              label: '丰北桥'
            }, {
              value: '望园东里',
              label: '望园东里'
            }]
          },
          {
            value: '海淀区',
            label: '海淀区',
            children: [{
              value: '小南庄',
              label: '小南庄'
            }, {
              value: '中关村',
              label: '中关村'
            }]
          }]
        }
      ]
    }
  },

  methods: {
    handleChange() {
      console.log('change')
    }
  }
}
</script>

<style lang="scss">
.input{
  padding: 20px;
  width: 400px;
}
</style>

<template>
  <div style="width: 400px;height: 300px;margin: auto">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username"
                    :rules="[
      { required: true, message: '用户名不能为空'}
    ]">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password"
                    :rules="[
      { required: true, message: '密码不能为空'}
    ]">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import http from '../../api/http'

export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http.post('api/user/login/', {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(result => {
            if (result.data && result.data.success === true && result.data.data.length > 0) {
              alert('login success!')
              sessionStorage.setItem('isLogin', 1)
              this.$router.push('/hello')
              return true
            } else {
              alert('username or password error!')
              return false
            }
          })
        } else {
          console.log('error submit!!')
          alert('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

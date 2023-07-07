<template>
  <div class="login">
    <el-container class="login-container"
                  label-positon="left"
                  label-width="0px"
                  v-loading="isSending">
      <el-main>
        <el-row>
          <el-col>
            <h1 class="login-title">登录</h1>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-form :model="ruleForm"
                     status-icon
                     :rules="rules"
                     ref="ruleForm">
              <el-form-item label="昵称："
                            prop="username">
                <el-input v-model="ruleForm.username"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-user-solid" />
              </el-form-item>
              <el-form-item label="密码："
                            prop="password">
                <el-input placeholder="请输入密码"
                          v-model="ruleForm.password"
                          show-password
                          autocomplete="off"
                          prefix-icon="el-icon-lock"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;"
                           type="primary"
                           @click="login"
                           :disabled="isDisabled||isSending">
                  登录<el-icon class="el-icon--right">
                  </el-icon>
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { userLogin, userCenter } from '../api/api'
import { jsToFormData } from '../utils/data.js'
export default {
  name: 'LoginIndex',
  data () {
    var checkEmpty = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      isSending: false,
      rules: {
        username: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        password: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    //注册按钮是否可点击
    isDisabled () {
      if (this.ruleForm.username && this.ruleForm.password) {
        return false;
      }
      return true;
    },
  },
  methods: {
    login () {
      this.isSending = true
      let formData1 = new FormData();
      formData1 = jsToFormData(this.ruleForm);
      userLogin(formData1).then(res => {
        this.isSending = false
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            message: '登录成功,现在返回主页面',
            type: 'success'
          })

          this.$cookie.set('token', res.data.data.token, { 'sameSite': 'None', 'Secure': 'true', 'expires': 30 })
          this.$cookie.set('userName', res.data.data.username, { 'sameSite': 'None', 'Secure': 'true', 'expires': 30 })
          this.$store.commit("setToken", res.data.data.token)
          let formData2 = new FormData();
          formData2.append('username', res.data.data.username)
          userCenter(formData2).then(response => {
            console.log(response)
            this.$cookie.set('permission', response.data.data.permission, { 'sameSite': 'None', 'Secure': 'true', 'expires': 30 })
            this.$store.commit("setId", response.data.data.id)
            this.$store.commit("setName", response.data.data.username)
            this.$store.commit("setAvatar", response.data.data.avatar)
            this.$store.commit("setEmail", response.data.data.mail)
            this.$store.commit("setBalance", response.data.data.balance)
            this.$store.commit("setPermission", response.data.data.permission)
            this.$store.commit("setReal", response.data.data.real)
            this.$router.push({ path: '/main' })
          })
        }
        else {
          this.$alert(res.data.message, '提示', { type: 'warning' })
        }
      }).catch(error => {
        console.log(error);
        this.isSending = false;
        this.$alert(error.message, '提示', { type: 'warning' })
      })
    }
  }
}
</script>
<style>
.login {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  width: 50vw;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.login-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
</style>

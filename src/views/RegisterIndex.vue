<template>
  <div class="register">
    <el-container v-loading="isSending"
                  label-positon="left"
                  label-width="0px"
                  class="register-container">
      <el-main>
        <el-row>
          <el-col>
            <h1 class="register-title">注册</h1>
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
                          type="password"
                          autocomplete="off"
                          prefix-icon="el-icon-lock"></el-input>
              </el-form-item>
              <el-form-item label="确认密码"
                            prop="checkPass">
                <el-input type="password"
                          v-model="ruleForm.checkPass"
                          autocomplete="off"
                          prefix-icon="el-icon-lock"
                          show-password></el-input>
              </el-form-item>
              <el-form-item label="邮箱："
                            prop="mail">
                <el-input v-model="ruleForm.mail"
                          autocomplete="off"
                          prefix-icon="el-icon-message" />
              </el-form-item>
              <el-form-item label="验证码："
                            prop="code">
                <el-input v-model="ruleForm.code"
                          autocomplete="off"
                          prefix-icon="el-icon-message" />
                <el-button style="width:100%;"
                           :disabled="isTimeout||isWriting"
                           @click.stop="mail"
                           type="primary"
                           icon="el-icon-message">{{codeText}}
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;"
                           @click="resetForm('ruleForm')">
                  重置<el-icon>
                  </el-icon>
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;"
                           type="primary"
                           @click.stop="register"
                           :disabled="isDisabled||isSending">
                  注册<el-icon>
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
// import axios from 'axios'
import { jsToFormData } from '../utils/data.js'
import { userRegister, sendMail } from '../api/api.js'
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // form: {
      //   username: '',
      //   password: '',
      //   mail: '',
      //   code: '',
      //   checkPass: '',
      // },
      ruleForm: {
        username: '',
        password: '',
        mail: '',
        code: '',
        checkPass: ''
      },
      isRegistered: true, //是否已注册
      isTrue: false,
      codeText: "获取验证码",
      timer: 60,//倒计时时间设置成一分钟
      isSending: false,
      isTimeout: false,
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        mail: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        code: [
          { validator: checkEmpty, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    //注册按钮是否可点击
    isDisabled () {
      if (this.ruleForm.username && this.ruleForm.password && this.ruleForm.mail && this.ruleForm.code) {
        return false;
      }
      return true;
    },
    isWriting () {
      if (this.ruleForm.mail) {
        return false;
      }
      return true;
    }
  },
  methods: {
    register () {
      //通过new 一个FormData()构造函数来创建一个空对象
      this.isSending = true;
      let formData = new FormData();
      formData = jsToFormData(this.ruleForm);
      userRegister(formData).then(
        response => {
          if (response.data.code == 200) {
            console.log("注册成功", response);
            this.isSending = false;
            this.$alert('注册成功,现在返回登录页面', '提示', { type: 'success' })
            this.$router.push({ path: '/login' })
          }
          else {
            this.$alert(response.data.message, '提示', { type: 'warning' })
          }
        })
        .catch(error => {
          console.log(error);
          this.isSending = false;
          this.$alert(error.message, '提示', { type: 'warning' })
        })
    },
    mail () {
      //通过new 一个FormData()构造函数来创建一个空对象
      let formData = new FormData();
      formData.append('mail', this.ruleForm.mail);
      console.log(formData)
      sendMail(formData).then(
        response => {
          if (response.data.code == 200) {
            console.log("验证码发生成功", response);
            this.$alert('验证码发生成功', '提示', { type: 'success' })
          }
          else {
            this.$alert(response.data.message, '提示', { type: 'warning' })
          }
        })
        .catch(error => {
          console.log(error);
          // this.$alert(error.message, '提示', { type: 'warning' }) 
        });
      this.codeTimer();
    },
    //验证码倒计时
    codeTimer () {
      let _this = this;
      if (this.timer >= 1) {
        this.isTimeout = true;
        this.codeText = this.timer + "s 后才能再获取";
        this.timer--;
        setTimeout(function () {
          _this.codeTimer();
        }, 1000);
      } else {
        this.codeText = "获取验证码";
        this.timer = 60;
        this.isTimeout = false
      }
    },
    resetForm (formName) {
      console.log((formName));
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    }
  }
}
</script>
<style>
.register {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
}
.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 10px auto;
  padding: 10px 10px 10px 10px;
  width: 50vh;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.register-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
</style>
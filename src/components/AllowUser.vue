<template>
  <div class="allow">
    <el-container class="allow-container"
                  label-positon="left"
                  label-width="0px"
                  v-loading="isSending">
      <el-main>
        <el-row>
          <el-col>
            <h1 class="allow-title">解封用户</h1>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-form :model="ruleForm"
                     status-icon
                     :rules="rules"
                     ref="ruleForm">
              <el-form-item label="用户昵称："
                            prop="username">
                <el-input v-model="ruleForm.username"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-user-solid" />
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;"
                           type="primary"
                           @click="allow"
                           :disabled="isDisabled||isSending">
                  解封<el-icon class="el-icon--right">
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
import { allowUser } from '../api/api'
export default {
  name: 'AllowUser',
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
      },
      isSending: false,
      rules: {
        username: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    //注册按钮是否可点击
    isDisabled () {
      if (this.ruleForm.username) {
        return false;
      }
      return true;
    },
  },
  methods: {
    allow () {
      this.isSending = true
      let formData = new FormData();
      formData.append('username', this.username);
      allowUser(formData).then(
        response => {
          this.isSending = false
          console.log(response)
          if (response.data.code == 200) {
            this.$alert('解封用户成功', '提示', { type: 'success' })
          }
        }
      )
    }
  }
}
</script>
<style>
.allow {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
}
.allow-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  width: 50vw;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.allow-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
</style>

<template>
  <div>
    <el-container class="back-money-container"
                  label-positon="left"
                  label-width="0px"
                  v-loading="isSending">
      <el-main>
        <el-row>
          <el-col>
            <h1 class="back-money-title">用户退钱</h1>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-form :model="ruleForm"
                     status-icon
                     :rules="rules"
                     ref="ruleForm">
              <el-form-item label="form："
                            prop="form">
                <el-input v-model="ruleForm.form"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-user-solid" />
              </el-form-item>
              <el-form-item label="to："
                            prop="to">
                <el-input v-model="ruleForm.to"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-user-solid" />
              </el-form-item>
              <el-form-item label="金额："
                            prop="money">
                <el-input v-model="ruleForm.money"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-user-solid" />
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;"
                           type="primary"
                           @click="back"
                           :disabled="isDisabled||isSending">
                  退钱<el-icon class="el-icon--right">
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
import { backMoney } from '../api/api'
import { jsToFormData } from '../utils/data.js'
export default {
  name: 'BackMoney',
  data () {
    var checkEmpty = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var checkNumber = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      }
      if (isNaN(value)) {
        return callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        from: '',
        to: '',
        money: '',
      },
      isSending: false,
      rules: {
        form: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        to: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        money: [
          { validator: checkNumber, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    //注册按钮是否可点击
    isDisabled () {
      if (this.ruleForm.form && this.ruleForm.to && this.ruleForm.money) {
        return false;
      }
      return true;
    },
  },
  methods: {
    back () {
      this.isSending = true
      let formData = new FormData();
      formData = jsToFormData(this.ruleForm);
      backMoney(formData).then(
        response => {
          this.isSending = false
          console.log(response)
          if (response.data.code == 200) {
            this.$alert('退钱成功', '提示', { type: 'success' })
          }
          else {
            this.$alert('退钱失败', '提示', { type: 'error' })
          }
        }
      )
    }
  }
}
</script>
<style>
.back-money-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 10px 10px 15px 35px;
  width: 50vw;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.back-money-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
</style>

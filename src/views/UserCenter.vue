<template>
  <div class="center">
    <el-container class="center-container"
                  label-positon="left"
                  label-width="0px">
      <el-main>
        <el-avatar :size="60"
                   :src="this.$store.state.avatar"
                   @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
        <el-descriptions class="margin-top"
                         :column="3"
                         :size="size"
                         border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{this.$store.state.userName}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱
            </template>
            {{this.$store.state.email}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-coin"></i>
              余额
            </template>
            {{this.$store.state.balance}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              备注
            </template>
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i :class="icon"></i>
              权限
            </template>
            {{permission}}
          </el-descriptions-item>
        </el-descriptions>
        <div class="button">
          <el-button type="primary"
                     :style="width"
                     @click="changePassword">修改密码
          </el-button>
          <el-button type="primary"
                     :style="width"
                     @click="changeAvatar">修改头像
          </el-button>
          <el-button type="primary"
                     :style="width"
                     @click="toAdmin">管理员中心
          </el-button>
        </div>
        <div class="button">
          <el-button type="primary"
                     :style="width"
                     @click="toMyTopicCenter">帖子中心
          </el-button>
        </div>
        <el-upload class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :http-request="sendAvatar"
                   :before-upload="beforeAvatarUpload"
                   v-if="isChange">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="button"
             v-show="!realShow&&$store.state.real">
          <el-button type="primary"
                     :style="width"
                     @click="toReal">实名认证
          </el-button>
        </div>
        <div v-show="realShow">
          <el-row>
            <el-col>
              <h1 class="login-title">实名认证</h1>
            </el-col>
          </el-row>
          <el-row align="middle">
            <el-col>
              <el-form :model="ruleForm"
                       status-icon
                       :rules="rules"
                       ref="ruleForm">
                <el-form-item label="身份证号："
                              prop="username">
                  <el-input v-model="ruleForm.id"
                            autocomplete="off"
                            type="text"
                            prefix-icon="el-icon-user-solid" />
                </el-form-item>
                <el-form-item label="姓名："
                              prop="password">
                  <el-input type="text"
                            v-model="ruleForm.name"
                            show-password
                            autocomplete="off"
                            prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button style="width:100%;"
                             type="primary"
                             @click="real"
                             :disabled="isDisabled||isSending">
                    认证<el-icon class="el-icon--right">
                    </el-icon>
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { sendAvatar, toReal } from '../api/api'
import { jsToFormData } from '../utils/data.js'
export default {
  name: "UserCenter",
  data () {
    var checkEmpty = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      isChange: false,
      isSending: false,
      size: '',
      rules: {
        id: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        name: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
      },
      ruleForm: {
        id: '',
        name: '',
      },
      realShow: false
    }
  },
  computed: {
    permission () {
      if (this.$store.state.permission) {
        return "管理员"
      }
      return "普通用户"
    },
    icon () {
      if (this.permission == "管理员") {
        return "el-icon-s-check"
      }
      return "el-icon-s-custom"
    },
    width () {
      if (this.permission == "管理员") {
        return "width:30%";
      }
      return "width:50%"
    },
    isDisabled () {
      if (this.ruleForm.name && this.ruleForm.id) {
        return false;
      }
      return true;
    },
  },
  methods: {
    errorHandler () {
      return true
    },
    changePassword () {
      this.$router.push({ path: '/password' })
    },
    changeAvatar () {
      this.isChange = true;
    },
    sendAvatar (val) {
      let formData = new FormData();
      formData.append('file', val.file);
      const fileReader = new FileReader();
      let that = this;
      fileReader.readAsDataURL(val.file)
      fileReader.addEventListener('load', function () {
        that.$store.commit("setAvatar", fileReader.result);
      })
      // this.isChange = false
      // sendAvatar(formData).then(res => {

      //   console.log(res)
      //   // this.avatar = res.data.data.avatar
      // });
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    toAdmin () {
      this.$router.push({ path: '/admin' });
    },
    toMyTopicCenter () {
      this.$router.push({ path: '/topic-center' });
    },
    real () {
      this.isSending = true
      let formData = new FormData();
      formData = jsToFormData(this.ruleForm);
      toReal(formData).then(res => {
        this.isSending = false
        console.log(res)
        this.$message({
          message: '认证成功',
          type: 'success'
        });
        this.$store.commit("setReal", 1)
      })
    },
    toReal () {
      this.realShow = true
    }
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.center {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
}
.center-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  width: 500px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.center-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
.button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px 0px 0px;
}
</style>
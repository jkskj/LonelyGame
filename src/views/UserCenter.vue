<template>
  <div class="center">
    <el-container class="center-container"
                  label-positon="left"
                  label-width="0px">
      <el-main>
        <el-avatar :size="60"
                   :src="avatar"
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
            {{username}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱
            </template>
            {{email}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-coin"></i>
              余额
            </template>
            {{balance}}
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
              <i class="el-icon-office-building"></i>
              联系地址
            </template>
            江苏省苏州市吴中区吴中大道 1188 号
          </el-descriptions-item>
        </el-descriptions>
        <el-button type="primary"
                   @click="changePassword">修改密码</el-button>
        <el-button type="primary"
                   @click="changeAvatar">修改头像</el-button>
        <el-upload class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :http-request="sendAvatar"
                   :before-upload="beforeAvatarUpload"
                   v-if="isChange">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { sendAvatar } from '../api/api'
export default {
  name: "UserCenter",
  data () {
    return {
      avatar: "img/default_head.jpg",
      username: "用户名",
      isChange: false,
      email: "",
      balance: "",
    }
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
      console.log(val.file.name)
      sendAvatar(formData).then(res => {
        this.isChange = false
        console.log(res)
        this.avatar = res.data.data.avatar
      });
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
    }
  },
  mounted () {
    this.username = this.$store.state.userName;
    this.email = this.$store.state.email;
    this.balance = this.$store.state.balance
  }
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
</style>
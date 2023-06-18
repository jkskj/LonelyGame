<template>
  <el-container style="height:100%;">
    <el-aside style="width:60%;height:100%;background: #0dbcd7;text-align: center;line-height:500px;color: #fdf6ec;font-size: 25px;">
      孤独游戏
    </el-aside>
    <el-main style="height:100%;background: #d1edc4;padding-top:200px;">
      <el-row :gutter="1"
              align="middle">
        <el-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="16">
          <div class="grid-content ep-bg-purple" />
          <h1>欢迎使用本二手游戏账号交易平台</h1>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>
      <el-row :gutter="1"
              align="middle">
        <el-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="16">
          <div class="grid-content ep-bg-purple" />
          <el-form>
            <el-form-item>
              <el-button style="width:100%;"
                         type="primary"
                         @click="register">
                注册<el-icon class="el-icon--right">
                </el-icon>
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%;"
                         type="primary"
                         @click="login">
                登录<el-icon class="el-icon--right">
                </el-icon>
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "HomeIndex",
  methods: {
    register () {
      this.$router.push({ path: '/register' })
    },
    login () {
      this.$router.push({ path: '/login' })
    },
  }
}
</script>

<style>
</style>
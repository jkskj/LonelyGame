<template>
  <div class="background">
    <el-menu :default-active="activeIndex1"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-container class="left">
        <div class="welcome">Hi，欢迎来到孤独游戏</div>
        <el-menu-item index="1"
                      @click="login">请先登录</el-menu-item>
        <el-menu-item index="2"
                      @click="register">免费注册</el-menu-item>
      </el-container>
      <el-container class="right">
        <el-menu-item index="3"
                      @click="center">我的个人中心</el-menu-item>
        <el-menu-item index="4">收藏夹</el-menu-item>
        <el-menu-item index="5">买家中心</el-menu-item>
        <el-menu-item index="6"
                      @click="sendTopic">我要发贴</el-menu-item>
      </el-container>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex1: '1',
    };
  },
  methods: {
    // handleSelect (key, keyPath) {
    //   console.log(key, keyPath);
    // },
    register () {
      this.$router.push('/register');
    },
    login () {
      this.$router.push('/login');
    },
    center () {
      this.$router.push('/center');
    },
    sendTopic () {
      this.$router.push('/post-topic');
    }
  },
  mounted () {
    this.$router.push('/main');
  }
}
</script>

<style>
.right {
  /* padding-right: 1rem; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.welcome {
  padding-left: 1rem;
  color: #fff;
  margin-right: 20px;
}
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* .background {
  width: 100%;
  height: 100%;
  overflow: auto;
} */
</style>

<template>
  <div class="background">
    <el-menu :default-active="this.$router.path"
             v-if="this.$cookie.get('userName')"
             class="head"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
      <el-container class="left">
        <div class="welcome">{{welcome}}</div>
        <el-menu-item index="/login">请先登录</el-menu-item>
        <el-menu-item index="/register">免费注册</el-menu-item>
        <el-menu-item index="/main">推荐页</el-menu-item>
      </el-container>
      <el-container class="right">
        <el-menu-item index="/center">我的个人中心</el-menu-item>
        <!-- <el-menu-item index="4">收藏夹</el-menu-item> -->
        <el-menu-item index="/chat-room">聊天室</el-menu-item>
        <el-menu-item index="/post-topic">我要发贴</el-menu-item>
      </el-container>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { userCenter } from '@/api/api'
export default {
  name: 'App',
  data () {
    return {
      isLogin: false,
    };
  },
  computed: {
    welcome () {
      if (this.$store.state.username) {
        return "Hi，欢迎" + this.$store.state.username
      }
      return "Hi，欢迎来到孤独游戏";
    }
  },
  methods: {
    // handleSelect (key, keyPath) {
    //   console.log(key, keyPath);
    // },
  },
  mounted () {
    if (this.$cookie.get('token') && this.$cookie.get('userName')) {
      let formData2 = new FormData();
      formData2.append('username', this.$cookie.get('userName'))
      //获取用户信息
      userCenter(formData2).then(response => {
        console.log(response)
        if (!this.$cookie.get('permission')) {
          this.$cookie.set('permission', response.data.data.permission, { 'sameSite': 'None', 'Secure': 'true', 'expires': 30 })
        }
        this.$store.commit("setId", response.data.data.id)
        this.$store.commit("setName", response.data.data.username)
        this.$store.commit("setAvatar", response.data.data.avatar)
        this.$store.commit("setEmail", response.data.data.mail)
        this.$store.commit("setBalance", response.data.data.balance)
        this.$store.commit("setPermission", response.data.data.permission)
        this.$store.commit("setReal", response.data.data.real)
        this.$router.push('/main');
      });
    }
    else {
      this.$router.push('/home');
    }
    this.$socket.connect();
    this.sockets.subscribe('message', data => {
      console.log("提醒")
      if (data.type == "receive") {
        this.$message({
          message: data.username + "给你发来了一条消息",
          type: "success",
        });
      }
    })
  },
  beforeDestroy () {
    this.$socket.close();
    this.sockets.unsubscribe('message')
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
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
}
.background {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>

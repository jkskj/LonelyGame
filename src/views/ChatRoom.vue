<template>
  <el-container style="height:93%;">
    <el-aside>
      <span class="welcome">用户：{{this.$store.state.userName}}</span>
      <el-menu active-text-color="#ffd04b"
               background-color="#545c64"
               class="el-menu-vertical-demo"
               default-active="2"
               text-color="#fff">
        <!-- <el-submenu index="1">
        </el-submenu> -->
        <el-submenu index="2">
          <template #title>单聊</template>
          <!-- <el-menu-item v-for="item in friendsList"
                        :key="item.id"
                        :index="'2-'+item.id"
                        @click="getMessage(item.id,item.user_name)">
            <template #title>{{item.user_name}}</template>
          </el-menu-item> -->
        </el-submenu>
      </el-menu>

    </el-aside>

    <el-main style="padding: 0;height:100%;border: 1px solid #A8ABB2;">
      <el-header style="height:5%;line-height:30px;border-bottom: 1px solid #C0C4CC;">当前聊天对象&emsp;{{friend}}</el-header>
      <el-main style="background-color: #F2F6FC;height:70%;border-bottom: 1px solid #C0C4CC;">
        <ChatList v-for="item in contentList"
                  :userId="item.from_user.id"
                  :userName="item.from_user.user_name"
                  :content="item.message_data"
                  :id="id"
                  :key="item.id"></ChatList>

      </el-main>
      <el-footer style="height:30%;">
        <el-form>
          <el-tiptap :extensions="extensions"
                     placeholder="请输入聊天内容"
                     v-model="textarea"
                     type="textarea"
                     :autosize="{minRows:3,maxRows:10}"
                     style="height:125px;width:100%;overflow: auto;"
                     lang="zh" />
          <el-row>
            <el-col :span=18></el-col>
            <el-col :span=6>

              <el-button type="success"
                         @click="sendMessage">
                发送<el-icon class="el-icon--right">
                </el-icon>
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import { uploadPicture } from '../api/api'
import ChatList from '../components/ChatList.vue'
import {
  // 需要的 extensions
  Doc,
  Text,
  Image,
  Paragraph,
} from 'element-tiptap';
export default {
  name: 'Chatroom',
  components: {
    ChatList
  },
  data () {
    return {
      visible: false,
      textarea: '',
      contentList: [],
      fid: 0,
      friend: "",
      extensions: [
        new Doc(), // 必须项
        new Text(), // 必须项
        new Paragraph(), // 必须项

        new Image({// 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            //image是后台接口需要参数名
            fd.append('file', file)
            //走后台接口进行上传返回上传后的图片地址
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadPicture(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.pic_list[0]
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }), // 图片
      ],
    }
  },
  sockets: { //监听用的是this.sockets   发送消息是this.$socket，不要弄混
    connecting () { console.log('正在连接') },
    connect () { console.log('连接成功') },
    disconnect () { console.log('断开连接') },
    connect_failed () { console.log('连接失败') },
    error () { console.log('错误发生，并且无法被其他事件类型所处理') },
    reconnecting () { console.log('正在重连') },
    reconnect_failed () { console.log('重连失败') },
    reconnect () { console.log('重连成功') },
    message: data => {//全局监听订阅事件，需要与后端约定好
      console.log('welcome data', data)
    },
    join: data => {//全局监听订阅事件，需要与后端约定好
      console.log('welcome data', data)
    }
  },
  methods: {

    // 连接socket
    connect () {

      // this.$socket.open()       // 开始连接socket

      // 订阅事件
      this.sockets.subscribe('message', data => {
        console.log('welcome data ', data)
      })

    },

    // 发送消息
    sendMessage () {
      console.log(this.textarea)
      this.$socket.emit('message', {
        "from": this.$store.state.id,
        "message": this.textarea,
        "to": this.fid
      })

    },

    onSubmit () {

    }

  },
  mounted () {
    // 订阅事件，testCall 是与后端约定好的名称
    this.sockets.subscribe('message', (res) => {
      console.log(res)
    })
    this.sockets.subscribe('join', (res) => {
      console.log(res)
    })
    this.$socket.emit('join', { "id": this.$store.state.id })
    this.fid = this.$route.query.fid
  },
}
</script>

<style scoped>
.el-textarea__inner {
  border: 0;
  resize: none;
  box-shadow: none;
}
.el-aside {
  width: 100%;
  height: 100%;
  background: #545c64;
}
.el-header {
  height: 10%;
  background-color: #f2f6fc;
}
.el-menu {
  width: 100%;
}
.welcome {
  color: aqua;
  display: block;
  width: 100%;
  text-align: center;
}
</style>

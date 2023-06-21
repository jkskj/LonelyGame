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
                  :userName="item.fromUser.userName"
                  :content="item.messageData"
                  :id="id"
                  :key="item.id"
                  :time="item.time"></ChatList>

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
      num: 0,
      id: 0,
      message: { 'fromUser': { "id": 0, "userName": "" }, 'id': 0, 'messageData': "", time: '' },
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
  methods: {
    // 发送消息
    sendMessage () {
      console.log(this.textarea)
      this.$socket.emit('message', {
        "from": String(this.$store.state.id),
        "message": this.textarea,
        "to": this.fid
      })
      var date = new Date();
      // 年月日
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      // 时分秒
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
      this.message.fromUser.id = this.$store.state.id
      this.message.fromUser.userName = this.$store.state.userName
      this.message.messageData = this.textarea
      this.message.id = this.num
      this.message.time = time
      this.num++
      this.contentList.push(JSON.parse(JSON.stringify(this.message)))
    },

    onSubmit () {

    }

  },
  mounted () {
    this.$socket.emit('join', { "id": this.$store.state.id })
    this.sockets.unsubscribe('message')
    console.log('this.$socket')
    //订阅事件
    this.sockets.subscribe('message', data => {
      console.log('message data', data)
      if (data.type == "receive") {
        this.message.fromUser.id = data.from
        this.message.fromUser.userName = data.username
        this.message.messageData = data.message
        this.message.time = data.date
        this.message.id = this.num
        this.num++
        this.contentList.push(JSON.parse(JSON.stringify(this.message)))
      }
    })
    this.fid = this.$route.query.uid
    this.friend = this.$route.query.toUser
    this.id = this.$store.state.id
  },
  beforeDestroy () {
    this.sockets.unsubscribe('message')
  }
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

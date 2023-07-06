<template>
  <el-container style="height:93%;">
    <el-aside>
      <span class="welcome">用户：{{this.$store.state.userName}}</span>
      <el-menu active-text-color="#ffd04b"
               background-color="#545c64"
               class="el-menu-vertical-demo"
               default-active="1"
               text-color="#fff">
        <!-- <el-submenu index="1">
        </el-submenu> -->
        <el-submenu index="1">
          <template #title>聊天对象</template>
          <el-menu-item v-for="(item,index) in chatList"
                        :key="item.id"
                        :index="'1-'+index"
                        @click="getFriend(index)"
                        :default-active="defautindex">
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </el-submenu>
      </el-menu>

    </el-aside>

    <el-main style="padding: 0;height:100%;border: 1px solid #A8ABB2;"
             v-show="fid!=0">
      <el-header style="height:5%;line-height:30px;border-bottom: 1px solid #C0C4CC;">当前聊天对象&emsp;{{friend}}</el-header>
      <el-main style="background-color: #F2F6FC;height:70%;border-bottom: 1px solid #C0C4CC;">
        <ChatList v-for="(item,index) in messageList"
                  :userName="item.fromUser.userName"
                  :content="item.messageData"
                  :id="id"
                  :userId="item.fromUser.id"
                  :avatar="item.fromUser.avatar"
                  :key="index"
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
      chatList: [],
      fid: 0,
      friend: "",
      num: 0,
      id: 0,
      defautindex: "",
      message: { 'fromUser': { "id": 0, "userName": "", "avatar": "" }, 'id': 0, 'messageData': "", time: '' },
      chatData: { 'name': "", 'id': "", 'content': [] },
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
            console.log(fd)
            //走后台接口进行上传返回上传后的图片地址
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadPicture(fd).then(res => {
              console.log(res)
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
      this.message.fromUser.avatar = this.$store.state.avatar
      this.message.messageData = this.textarea
      // this.message.id = this.num
      this.message.time = time
      // this.num++
      var index = this.chatList.findIndex(item => item.id == this.fid)
      this.chatList[index].content.push(JSON.parse(JSON.stringify(this.message)))
      this.textarea = ""
    },

    onSubmit () {

    },
    getFriend (val) {
      this.friend = this.chatList[val].name
      this.fid = this.chatList[val].id
    },

  },
  computed: {
    messageList () {
      var index = this.chatList.findIndex(item => item.id == this.fid)
      if (index == -1) {
        return []
      } else {
        return this.chatList[index].content
      }
    },
  },
  mounted () {
    //加入房间
    this.$socket.emit('join', { "id": Number(this.$store.state.id) })
    this.id = this.$store.state.id
    //获取本地存储的聊天记录
    if (localStorage.getItem(this.id)) {
      this.chatList = JSON.parse(localStorage.getItem(this.id))
    }
    //订阅事件
    this.sockets.subscribe('message', data => {
      console.log('message data', data)
      if (data.type == "receive") {
        this.message.fromUser.id = data.from
        this.message.fromUser.userName = data.username
        this.message.fromUser.avatar = data.avatar
        this.message.messageData = data.message
        this.message.time = data.date
        // this.message.id = this.num
        // this.num++
        var index = this.chatList.findIndex(item => item.id == data.from)
        if (index == -1) {
          this.chatData.name = data.username
          this.chatData.id = data.from
          this.chatData.content.push(this.message)
          this.chatList.push(JSON.parse(JSON.stringify(this.chatData)))
        } else {
          this.chatList[index].content.push(JSON.parse(JSON.stringify(this.message)))
        }
      }
    })
    //判断是否是从帖子跳转过来的
    if (this.$route.query.toUser) {
      var index = this.chatList.findIndex(item => item.id == this.$route.query.uid)
      console.log(index)
      if (index == -1) {
        this.chatData.name = this.$route.query.toUser
        this.chatData.id = this.$route.query.uid
        this.chatList.push(JSON.parse(JSON.stringify(this.chatData)))
        this.defautindex = '1-' + (this.chatList.length - 1)
      }
      else {
        this.defautindex = '1-' + index
      }
    }
  },
  beforeDestroy () {
    //离开页面取消订阅
    this.sockets.unsubscribe('message')
    //离开页面保存聊天记录
    localStorage.setItem(this.id, JSON.stringify(this.chatList));
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

<template>
  <el-container style="height:100%;">
    <el-aside>
      <span class="welcome">用户：{{name}}</span>
      <el-menu active-text-color="#ffd04b"
               background-color="#545c64"
               class="el-menu-vertical-demo"
               default-active="2"
               text-color="#fff"
               @open="handleOpen"
               @close="handleClose">
        <!-- <el-submenu index="1">
        </el-submenu> -->
        <el-submenu index="2">
          <template #title>单聊</template>
          <el-menu-item v-for="item in friendsList"
                        :key="item.id"
                        :index="'2-'+item.id"
                        @click="getMessage(item.id,item.user_name)">
            <template #title>{{item.user_name}}</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <span>群聊</span>
        </el-menu-item>
      </el-menu>

    </el-aside>

    <el-main style="padding: 0;height:100%;border: 1px solid #A8ABB2;"
             v-show="fid!=0">
      <el-header style="height:5%;line-height:30px;border-bottom: 1px solid #C0C4CC;">当前聊天对象&emsp;{{friend}}</el-header>
      <el-main style="background-color: #F2F6FC;height:75%;border-bottom: 1px solid #C0C4CC;">
        <chat-list v-for="item in contentList"
                   :userId="item.from_user.id"
                   :userName="item.from_user.user_name"
                   :content="item.message_data"
                   :id="id"
                   :key="item.id"></chat-list>

      </el-main>
      <el-footer style="height:20%;">
        <el-form>
          <el-input v-model="textarea"
                    type="textarea"
                    placeholder="请输入聊天内容"
                    :autosize="{minRows:3,maxRows:10}"
                    style="height:90px;width:100%;overflow: auto;" />
          <el-row>
            <el-col :span=18></el-col>
            <el-col :span=6>
              <el-tooltip v-model:="visible"
                          placement="left"
                          :auto-close=1000
                          effect="light">
                <template #content>
                  <span>不能发送空白内容</span>
                </template>
                <el-button type="success"
                           @click="onSubmit">
                  发送<el-icon class="el-icon--right">
                    <Check />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import ChatList from '../components/ChatList.vue'
export default {
  name: 'Chatroom',
  components: {
    ChatList
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

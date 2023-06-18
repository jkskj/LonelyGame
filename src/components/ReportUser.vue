<template>
  <div class="report">
    <el-row class="report-user"
            type="flex">
      <el-col :span="3"><img :src="avatar"
             style="height:100px" /></el-col>
      <el-col :span="12">
        <el-descriptions direction="vertical"
                         :column="4"
                         border>
          <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
          <el-descriptions-item label="用户id">{{id}}</el-descriptions-item>
          <el-descriptions-item label="被举报的理由"
                                :span="2">{{reason}}</el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="3"
              v-show="!isDone"><el-button style="width:100%;"
                   type="danger"
                   @click="ban('-1')"
                   :disabled="isSending">
          封禁<el-icon class="el-icon--right">
          </el-icon>
        </el-button></el-col>
      <el-col :span="3"
              v-show="!isDone"><el-button style="width:100%;"
                   type="primary"
                   @click="ban('0')"
                   :disabled="isSending">
          不封禁<el-icon class="el-icon--right">
          </el-icon>
        </el-button></el-col>
      <el-col :span="3"
              v-show="isDone">
        <el-tag type="success">解决</el-tag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userCenter, banUser } from '../api/api'
export default {
  name: 'ChatList',
  data () {
    return {
      avatar: '',
      isDone: false,
      isSending: false
    }
  },
  props: {
    id: { required: true },
    username: { type: String, required: true },
    reason: { type: String, required: true },
  },
  mounted () {
    let formData = new FormData();
    formData.append('username', this.username)
    userCenter(formData).then(response => {
      console.log(response)
      this.avatar = response.data.data.avatar
    })
  },
  methods: {
    ban (status) {
      this.isSending = true
      let formData = new FormData();
      formData.append('id', String(this.id))
      formData.append('state', String(status))
      banUser(formData).then(response => {
        console.log(response)
        this.isDone = true
        this.isSending = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-div {
  text-align: left;
  background-color: #fff;
  line-height: 39px;
  padding: 0 3px;
}
.el-row {
  margin-bottom: 10px;
}
</style>


<template>
  <div v-if="userId != id">
    <el-row :gutter="20">
      <el-col :span="3"><img style="width:35px;height:35px;"
             :src="avatar" />{{userName}}</el-col>
      <el-col :span="12">
        <div v-html="content"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"
              class="content-div"
              style="text-align: right;">
        {{time}}
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <el-row :gutter="20">
      <el-col :span="9"></el-col>
      <el-col :span="12"
              class="content-div"
              style="text-align: right;">
        <div v-html="content"></div>
      </el-col>
      <el-col :span="3"><img style="width:35px;height:35px;"
             :src="avatar" />{{userName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12"
              class="content-div"
              style="text-align: right;">
        {{time}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userCenter } from '../api/api'
export default {
  name: 'ChatList',
  data () {
    return {
      avatar: '',
      userId: 0
    }
  },
  props: {
    userName: { type: String, required: true },
    id: { required: true },
    content: { type: String, required: true },
    time: { type: String, required: true }
  },
  mounted () {
    let formData = new FormData();
    formData.append('username', this.userName)
    userCenter(formData).then(response => {
      if (response.data.code == 200) {
        this.avatar = response.data.data.avatar
        this.userId = response.data.data.id
      } else {
        this.$message.error(response.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
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


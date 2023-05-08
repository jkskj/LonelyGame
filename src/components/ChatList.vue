<template>
  <el-row :gutter="20"
          v-if="userId != id">
    <el-col :span="3"><img style="width:35px;height:35px;"
           :src="headImg" />{{userName}}</el-col>
    <el-col :span="12"
            class="content-div">
      <div v-html="content"></div>
    </el-col>
  </el-row>
  <el-row :gutter="20"
          v-else>
    <el-col :span="9"></el-col>
    <el-col :span="12"
            class="content-div"
            style="text-align: right;">
      <div v-html="content"></div>
    </el-col>
    <el-col :span="3"><img style="width:35px;height:35px;"
           :src="avatar" />{{userName}}</el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ChatList',
  data () {
    return {
      headImg: '',
    }
  },
  props: {
    userId: { required: true },
    userName: { type: String, required: true },
    id: { required: true },
    avatar: { type: String },
    content: { type: String, required: true },
  },
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


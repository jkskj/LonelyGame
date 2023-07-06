<template>
  <div v-if="userId != id">
    <el-row :gutter="20">
      <el-col :span="2"><img style="width:50px;height:50px;"
             :src="avatar" /><span class="name">{{userName}}</span></el-col>
      <el-col :span="12"
              class="content-div">
        <div v-html="content"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
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
      <el-col :span="2"
              style="text-align: right;"><img style="width:50px;height:50px;"
             :src="avatar" /><span class="name">{{userName}}</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="14"
              style="text-align: right;">
        {{time}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  data () {
    return {
    }
  },
  props: {
    userName: { type: String, required: true },
    id: { required: true },
    content: { type: String, required: true },
    time: { type: String, required: true },
    userId: { required: true },
    avatar: { type: String, required: true },
  },
  mounted () {
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
.name {
  width: 100%;
  display: inline-block;
}
</style>


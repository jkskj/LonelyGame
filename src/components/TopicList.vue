<template>
  <el-row class="topic-list"
          type="flex">
    <el-col :span="3"><el-avatar :size="130"
                 :src="cover"
                 :fit="fit"></el-avatar></el-col>
    <el-col :span="12"
            class="content-div">
      标题：{{title}}
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "TopicList",
  data () {
    return {
      fit: 'contain'
    }
  },
  props: {
    cover: { type: String },
    title: { type: String, required: true },
  },
}
</script>

<style scoped>
.topic-list {
  height: 130px;
  width: 100%;
  background: #0ea4e4;
}
.content-div {
  text-align: left;
  line-height: 130px;
  padding: 0 100px;
}
.el-row {
  margin-bottom: 10px;
}
</style>
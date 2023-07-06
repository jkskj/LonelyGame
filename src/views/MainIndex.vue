<template>
  <div>
    <el-input v-model="input"
              placeholder="请输入内容"
              @change="searchPost()"></el-input>
    <el-container>
      <el-main style="background-color: #F2F6FC;height:75%;border-bottom: 1px solid #C0C4CC;">
        <topic-list v-for="(item,index) in topicList"
                    :key="index"
                    :cover="item.cover"
                    :title="item.title"
                    @click.native="toDetail(item.post_id)"></topic-list>
        <el-pagination :page-size="5"
                       :pager-count="11"
                       layout="prev, pager, next"
                       :total="1"
                       style="text-align: center;">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TopicList from '@/components/TopicList.vue'
import { getRecommend, search } from '../api/api'
export default {
  name: 'MainIndex',
  data () {
    return {
      length: 0,
      input: "",
      topicList: [{ avatar: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg", title: "asdad" }]
    }
  },
  components: { TopicList },
  methods: {
    toDetail (val) {
      this.$router.push({ path: '/view-topic', query: { post_id: val } });
    },
    searchPost () {
      let formData = new FormData();
      formData.append("type", "post")
      formData.append("key", this.input)
      formData.append("page", "1")
      console.log(formData)
      search(formData).then(res => {
        console.log(res)
        this.topicList = res.data.data
      })
    }
  },
  mounted () {
    // let formData = new FormData();
    // formData.append("page", "1")
    // console.log(formData)
    console.log("asdasd")
    getRecommend().then(res => {
      console.log(res)
      this.topicList = res.data.data
    })
  }

}
</script>

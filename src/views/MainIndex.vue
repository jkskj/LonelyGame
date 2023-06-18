<template>
  <div>
    <search-bar></search-bar>
    <el-container>
      <el-main style="background-color: #F2F6FC;height:75%;border-bottom: 1px solid #C0C4CC;">
        <topic-list v-for="(item,index) in topicList"
                    :key="index"
                    :cover="item.cover"
                    :title="item.title"
                    @click.native="toDetail(item.post_id)"></topic-list>
        <el-pagination :page-size="20"
                       :pager-count="11"
                       layout="prev, pager, next"
                       :total="1000">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import TopicList from '@/components/TopicList.vue'
import { getRecommend } from '../api/api'
export default {
  name: 'MainIndex',
  data () {
    return {
      topicList: [{ avatar: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg", title: "asdad" }]
    }
  },
  components: { SearchBar, TopicList },
  methods: {
    toDetail (val) {
      this.$router.push({ path: '/view-topic', query: { post_id: val } });
    }
  },
  mounted () {
    let formData = new FormData();
    getRecommend(formData).then(res => {
      console.log(res)
      this.topicList = res.data.data
    })
  }
}
</script>

<template>
  <div>
    <topic-list v-for="(item,index) in topicList"
                :key="index"
                :cover="item.cover"
                :title="item.title"
                @click.native="toDetail(item.pid)"></topic-list>
    <el-empty :image-size="200"
              v-show="isEmpty"></el-empty>
    <el-pagination :page-size="5"
                   :pager-count="11"
                   layout="prev, pager, next"
                   :total="1"
                   v-show="!isEmpty"
                   style="text-align: center;">
    </el-pagination>
  </div>
</template>

<script>
import { getMyCollection } from '@/api/api'
import TopicList from '@/components/TopicList.vue'
export default {
  name: "MyCollection",
  data () {
    return {
      topicList: []
    }
  },
  components: { TopicList },
  computed: {
    isEmpty () {
      if (this.topicList.length == 0) {
        return true
      }
      else
        return false
    }
  },
  methods: {
    toDetail (val) {
      this.$router.push({ path: '/view-topic', query: { post_id: val } });
    },
  },
  mounted () {
    let formData = new FormData();
    getMyCollection(formData).then(res => {
      console.log(res)
      this.topicList = res.data.data.fav_list
    })
  }
}
</script>

<style>
</style>
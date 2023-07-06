<template>
  <div>
    <topic-list v-for="(item,index) in topicList"
                :key="index"
                :cover="item.cover"
                :title="item.title"
                v-show="!isEmpty"
                @click.native="toAudit(item.id)"></topic-list>
    <el-empty :image-size="200"
              v-show="isEmpty"></el-empty>
  </div>
</template>

<script>
import TopicList from '@/components/TopicList.vue'
import { getAudit } from '@/api/api'
export default {
  name: "AuditList",
  components: { TopicList },
  data () {
    return {
      topicList: [],
    }
  },
  computed: {
    isEmpty () {
      if (this.topicList.length == 0)
        return true;
      else return false;
    },
  },
  methods: {
    toAudit (val) {
      this.$router.push({ path: '/audit-topic', query: { post_id: val } });
    },
  },
  mounted () {
    let formData = new FormData();
    getAudit(formData).then(res => {
      console.log(res)
      this.topicList = res.data.data.post_list
    })
  }
}
</script>

<style>
</style>
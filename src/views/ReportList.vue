<template>
  <div>
    <report-user v-for="(item,index) in reportList"
                 :key="index"
                 :id="item.id"
                 :username="item.username"
                 :v-show="!isEmpty"
                 :reason="item.reason"></report-user>
    <el-empty :image-size="200"
              v-show="isEmpty"></el-empty>
  </div>
</template>

<script>
import ReportUser from '@/views/AllowUser.vue'
import { getReport } from '@/api/api'
export default {
  name: "ReportList",
  components: { ReportUser },
  data () {
    return {
      reportList: [],
    }
  },
  computed: {
    isEmpty () {
      if (this.reportList.length == 0)
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
    getReport(formData).then(res => {
      console.log(res)
      this.reportList = res.data.data
    })
  }
}
</script>

<style>
</style>
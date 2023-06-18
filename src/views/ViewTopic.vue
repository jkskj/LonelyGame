<template>
  <topic-detail :post_id="this.$route.query.post_id"
                :isReport="true">
    <view-other :post_id="this.$route.query.post_id">
    </view-other>
  </topic-detail>
</template>

<script>
import TopicDetail from "@/components/TopicDetail.vue"
import ViewOther from "@/components/ViewOther.vue"
export default {
  name: "ViewTopic",
  components: { TopicDetail, ViewOther },
}
</script>

<style>
</style>
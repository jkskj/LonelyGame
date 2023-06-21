<template>
  <topic-detail :postId="this.postId"
                :isReport="true"
                :title="this.title"
                :id="this.id"
                :content="this.content"
                :price="this.price"
                :userName="this.userName"
                :avatar="this.avatar"
                :fav="this.fav"
                :nowBuyer="this.nowBuyer">
    <view-other :postId="this.postId"
                :userName="this.userName"
                :id="this.id">
    </view-other>
  </topic-detail>
</template>

<script>
import TopicDetail from "@/components/TopicDetail.vue"
import ViewOther from "@/components/ViewOther.vue"
import { viewTopic } from '@/api/api'
export default {
  name: "ViewTopic",
  components: { TopicDetail, ViewOther },
  data () {
    return {
      title: "",
      content: "",
      price: "",
      userName: "",
      id: 0,
      avatar: "",
      fav: 0,
      nowBuyer: '',
      postId: 0
    }
  },
  mounted () {
    let formData = new FormData();
    formData.append('post_id', String(this.$route.query.post_id))
    viewTopic(formData).then(res => {
      console.log(res)
      this.title = res.data.data.detail.title
      this.id = res.data.data.detail.user_id
      this.content = res.data.data.detail.content
      this.price = res.data.data.detail.price
      this.userName = res.data.data.detail.username
      this.avatar = res.data.data.detail.avatar
      this.fav = res.data.data.detail.fav
      this.nowBuyer = res.data.data.detail.now_buyer
    })
    this.postId = this.$route.query.post_id
  },
}
</script>

<style>
</style>
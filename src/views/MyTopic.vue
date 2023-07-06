<template>
  <topic-detail :postId="this.postId"
                :isReport="false"
                :title="this.title"
                :id="this.id"
                :content="this.content"
                :price="this.price"
                :userName="this.userName"
                :avatar="this.avatar"
                :fav="this.fav"
                :nowBuyer="this.nowBuyer">
    <div class="button">
      <el-button type="primary"
                 :style="width"
                 @click="change">修改封面
      </el-button>
      <el-button type="primary"
                 :style="width"
                 v-show="!isLook"
                 @click="look">查看开价
      </el-button>
    </div>
    <el-upload class="avatar-uploader"
               action="https://jsonplaceholder.typicode.com/posts/"
               :show-file-list="false"
               :http-request="sentCover"
               :before-upload="beforeAvatarUpload"
               v-if="isChange">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-row align="middle"
            v-show="isLook">
      <el-col>
        <el-descriptions>
          <el-descriptions-item label="价格">{{givePrice}}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </topic-detail>
</template>

<script>
import TopicDetail from "@/components/TopicDetail.vue"
import { changCover, viewTopic } from '@/api/api'
export default {
  name: "MyTopic",
  components: { TopicDetail },
  data () {
    return {
      isChange: false,
      width: "30%",
      isLook: false,
      givePrice: 0,
      title: "",
      content: "",
      price: "",
      userName: "666",
      id: 0,
      avatar: "",
      fav: 0,
      nowBuyer: '',
      postId: 0
    }
  },
  methods: {
    change () {
      this.isChange = true
    },
    sentCover (val) {
      let formData = new FormData();
      formData.append('file', val.file);
      formData.append('postid', this.postId);
      changCover(formData).then(res => {
        if (res.data.code === 200) {
          this.isChange = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    look () {
      let formData = new FormData();
      formData.append('pid', this.postId);
      changCover(formData).then(res => {
        if (res.data.code === 200) {
          this.isLook = true
          this.givePrice = res.data.price
        } else {
          this.$message({
            message: '查看失败' && res.data.message,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mounted () {
    let formData = new FormData();
    this.postId = this.$route.query.post_id
    formData.append('post_id', String(this.postId))
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

  },

}
</script>

<style>
</style>
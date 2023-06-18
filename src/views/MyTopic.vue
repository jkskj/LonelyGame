<template>
  <topic-detail :post_id="this.$route.query.post_id"
                :isReport="false">
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
          <el-descriptions-item label="价格">{{price}}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </topic-detail>
</template>

<script>
import TopicDetail from "@/components/TopicDetail.vue"
import { changCover } from '@/api/api'
export default {
  name: "MyTopic",
  components: { TopicDetail },
  data () {
    return {
      isChange: false,
      width: "30%",
      isLook: false,
      price: 0
    }
  },
  methods: {
    change () {
      this.isChange = true
    },
    sentCover (val) {
      let formData = new FormData();
      formData.append('file', val.file);
      formData.append('postid', this.$route.query.post_id);
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
      formData.append('pid', this.$route.query.post_id);
      changCover(formData).then(res => {
        if (res.data.code === 200) {
          this.isLook = true
          this.price = res.data.price
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
  }
}
</script>

<style>
</style>
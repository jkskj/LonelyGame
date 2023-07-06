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
    <el-row>
      <el-col>
        <el-button style="width:40%;"
                   type="primary"
                   @click="audit('1')"
                   :disabled="isSending||!isPass">
          通过<el-icon class="el-icon--right">
          </el-icon>
        </el-button>
        <el-button style="width:40%;"
                   type="danger"
                   @click="unPass">
          未过<el-icon class="el-icon--right">
          </el-icon>
        </el-button></el-col>
    </el-row>
    <el-row>
      <el-col v-show="!isPass">
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item label="原因："
                        prop="msg">
            <el-input v-model="ruleForm.msg"
                      autocomplete="off"
                      type="text"
                      prefix-icon="el-icon-user-solid" />
          </el-form-item>
          <el-form-item v-show="!isPass">
            <el-button style="width:100%;"
                       type="primary"
                       @click="audit('0')"
                       :disabled="isDisabled||isSending">
              提交<el-icon class="el-icon--right">
              </el-icon>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </topic-detail>
</template>

<script>
import { auditPost, viewTopic } from '../api/api'
import TopicDetail from "@/components/TopicDetail.vue"
export default {
  name: "AuditTopic",
  components: { TopicDetail },
  data () {
    var checkEmpty = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      post_id: "",
      ruleForm: {
        msg: '',
      },
      isSending: false,
      rules: {
        msg: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
      },
      isPass: true,
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
  computed: {
    //提交按钮是否可点击
    isDisabled () {
      if (this.ruleForm.msg) {
        return false;
      }
      return true;
    },
  },
  methods: {
    audit (status) {
      this.isSending = true;
      let formData = new FormData();
      formData.append('postid', this.post_id);
      formData.append('state', status);
      if (status == "1") {
        formData.append('msg', "审核通过");
      }
      else formData.append('msg', this.msg);
      auditPost(formData).then(res => {
        this.isSending = false
        console.log(res)
        this.$message({
          message: '审核成功,现在返回',
          type: 'success'
        })
        this.$router.back()
      })
    },
    unPass () {
      this.isPass = false;
    }
  },
  mounted () {
    this.post_id = this.$route.query.post_id
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
  }
}
</script>

<style>
</style>
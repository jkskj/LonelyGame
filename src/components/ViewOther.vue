<template>
  <div>
    <div class="button">
      <el-button style="width:100%;"
                 type="primary"
                 @click="collect"
                 :disabled="isSending">
        收藏<el-icon class="el-icon--right">
        </el-icon>
      </el-button>
      <el-button style="width:100%;"
                 type="primary"
                 @click="give"
                 :disabled="isSending">
        出价<el-icon class="el-icon--right">
        </el-icon>
      </el-button>
      <el-button style="width:100%;"
                 type="primary"
                 @click="toChat">
        与卖家交流<el-icon class="el-icon--right">
        </el-icon>
      </el-button>
    </div>
    <el-form v-show="isCommit"
             :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm">
      <el-form-item label="出价："
                    prop="price">
        <el-input v-model="ruleForm.price"
                  autocomplete="off"
                  type="text"
                  prefix-icon="el-icon-user-solid" />
      </el-form-item>
    </el-form>
    <div class="button"
         v-show="isCommit">
      <el-button style="width:100%;"
                 type="primary"
                 @click="commit"
                 :disabled="isSending">
        提交<el-icon class="el-icon--right">
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import { collectTopic, givePrice } from '../api/api'
import { viewTopic } from '@/api/api'
export default {
  name: "ViewOther",
  data () {
    var checkEmpty = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      isSending: false,
      isCommit: false,
      rules: {
        price: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
      },
      ruleForm: {
        price: '',
      },
      id: 0
    }
  },
  props: { post_id: { required: true } },
  methods: {
    collect () {
      let formData = new FormData();
      this.isSending = true
      formData.append('post_id', String(this.post_id))
      collectTopic(formData).then(res => {
        this.isSending = false
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            message: '收藏成功',
            type: 'success'
          });
        }
        else {
          this.$message({
            message: res.data.msg || '收藏失败',
            type: 'warning'
          });
        }
      })
    },
    commit () {
      let formData = new FormData();
      this.isSending = true
      formData.append('post_id', String(this.post_id))
      formData.append('price', this.ruleForm.price)
      givePrice(formData).then(res => {
        this.isSending = false
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            message: '出价成功',
            type: 'success'
          });
        }
        else {
          this.$message({
            message: res.data.msg || '出价失败',
            type: 'warning'
          });
        }
      })
    },
    give () {
      this.isCommit = !this.isCommit
    },
    toChat () {
      this.$router.push({ path: '/chat-room', query: { "fid": this.id } })
    }
  },
  mounted () {
    let formData = new FormData();
    console.log(this.post_id)
    formData.append('post_id', String(this.post_id))
    viewTopic(formData).then(res => {
      console.log(res)
      this.id = res.data.data.detail.user_id
    })
  }
}

</script>

<style>
</style>
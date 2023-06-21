<template>
  <div class="topic-detail">
    <el-container class="topic-detail-container"
                  label-positon="left"
                  label-width="0px">
      <el-main>
        <el-row>
          <el-col>
            <h1 class="topic-detail-title">标题：{{title}}
            </h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <h2 class="topic-detail-title">用户：
              <el-avatar :size="30"
                         :src="avatar"
                         @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              {{userName}}
            </h2>
          </el-col>
          <el-col :span="6"
                  style="height:100%;margin: 15px 15px;">
            <el-popover placement="top"
                        width="160"
                        v-model="visible"
                        v-show="isReport">
              <p>确定举报吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini"
                           type="text"
                           v-show="!isConfirmed"
                           @click="isConfirmed = false;visible=false">取消</el-button>
                <el-button type="primary"
                           size="mini"
                           v-show="!isConfirmed"
                           @click="isConfirmed = true">确定</el-button>
                <el-input placeholder="请输入理由"
                          v-model="reason"
                          autocomplete="off"
                          v-show="isConfirmed"
                          prefix-icon="el-icon-lock"></el-input>
                <el-button type="primary"
                           size="mini"
                           v-show="isConfirmed"
                           @click="report">举报</el-button>
              </div>
              <el-button slot="reference">举报用户</el-button>
            </el-popover>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <div v-html="content"></div>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-descriptions>
              <el-descriptions-item label="价格">{{price}}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-descriptions>
              <el-descriptions-item label="收藏数">{{fav}}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-descriptions>
              <el-descriptions-item label="出价人数">{{nowBuyer}}</el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reportUser } from '@/api/api'
export default {
  name: "TopicDetail",
  data () {
    return {
      visible: false,
      reason: "",
      isConfirmed: false,
    }
  },
  props: {
    postId: { required: true },
    isReport: { default: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    price: { required: true },
    userName: { type: String, required: true },
    id: { required: true },
    avatar: { type: String, required: true },
    fav: { required: true },
    nowBuyer: { required: true },
  },
  methods: {
    errorHandler () {
      return true
    },
    report () {
      let formData = new FormData();
      formData.append('aim_id', this.id);
      formData.append('reason', this.reason);
      reportUser(formData).then(res => {
        console.log(res)
        this.visible = false;
        this.reason = "";
        this.isConfirmed = false;
        if (res.data.code == 200) {
          this.$message({
            message: '举报成功',
            type: 'success'
          });
        }
        else {
          this.$message({
            message: res.data.message || '举报失败',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '举报失败',
          type: 'error'
        });
      })
    }
  }
}
</script>

<style>
.topic-detail {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
}
.topic-detail-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  width: 50vw;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.topic-detail-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
</style>
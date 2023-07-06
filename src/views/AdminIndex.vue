<template>
  <div>
    <el-container style="height:100%;">
      <el-aside>
        <!-- <span class="welcome">用户：{{name}}</span> -->
        <el-menu active-text-color="#ffd04b"
                 background-color="#545c64"
                 class="admin-menu"
                 :default-active="this.$router.path"
                 text-color="#fff"
                 router>
          <!-- <el-submenu index="1">
        </el-submenu> -->
          <el-menu-item index="/audit">
            <template #title>审核帖子</template>
          </el-menu-item>
          <el-menu-item index="/allow">
            <template #title>解封用户</template>
          </el-menu-item>
          <el-menu-item index="/report">
            <template #title>封禁用户</template>
          </el-menu-item>
          <el-menu-item index="/back">
            <template #title>用户退钱</template>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-main style="padding:0"
               class="cover">
        <!-- <topic-list v-for="(item,index) in topicList"
                    :key="index"
                    :coverUrl="item.coverUrl"
                    :title="item.title"
                    v-show="model==1&&!isEmpty"
                    @click.native="toAudit(item.id)"></topic-list>
        <report-user v-for="(item,index) in reportList"
                     :key="index"
                     :id="item.id"
                     :username="item.username"
                     :reason="item.reason"
                     v-show="model==3"></report-user>
        <allow-user v-show="model==2"></allow-user>
        <h1 style="text-align:center"
            v-show="isEmpty">无</h1> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import TopicList from '@/components/TopicList.vue'
// import { getReport, getAudit } from '@/api/api'
// import AllowUser from '@/views/AllowUser.vue'
// import ReportUser from '@/components/ReportUser.vue'
export default {
  name: "AdminIndex",
  // components: { TopicList, ReportUser, AllowUser },
  // data () {
  //   return {
  //     model: '',
  //     topicList: [],
  //     reportList: [],
  //   }
  // },
  // computed: {
  //   isEmpty () {
  //     if (this.model == 1 && this.topicList.length == 0)
  //       return true;
  //     if (this.model == 3 && this.reportList.length == 0)
  //       return true;
  //     else return false;
  //   },
  // },
  // methods: {
  //   toAudit (val) {
  //     this.$router.push({ path: '/audit-topic', query: { post_id: val } });
  //   },
  //   audit () {
  //     getAudit().then(res => {
  //       console.log(res)
  //       this.topicList = res.data.data.post_list
  //     })
  //   },
  //   handleMenuSelect (index) {
  //     console.log("当前选中的菜单项索引是：" + index);
  //     // 在这里可以编写菜单项的点击事件处理逻辑
  //     this.model = index;
  //   },
  // },
  // watch: {
  //   // 此处监听variable变量，当期有变化时执行
  //   // item1为新值，item2为旧值
  //   model (item1, item2) {
  //     console.log(item1, item2)
  //     let formData = new FormData();
  //     if (item1 == "1") {
  //       getAudit(formData).then(res => {
  //         console.log(res)
  //         this.topicList = res.data.data.post_list
  //       })
  //     }
  //     if (item1 == "4") {
  //       getReport(formData).then(res => {
  //         console.log(res)
  //         this.topicList = res.data.data
  //       })
  //     }
  //     if (item1 == "3") {
  //       getReport(formData).then(res => {
  //         console.log(res)
  //         this.reportList = res.data.data
  //       })
  //     }
  //   },
  //   immediate: true // watch侦听操作内的函数会立刻被执行
  // },
  mounted () {
    // this.model = "1"
  }
}
</script>

<style>
.cover {
  background-position: center;
  height: 93vh;
  width: 100%;
  background-size: cover;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
}
.admin-menu {
  height: 100%;
}
</style>
<template>
  <div>
    <el-container style="height:100%;">
      <el-aside>
        <!-- <span class="welcome">用户：{{name}}</span> -->
        <el-menu active-text-color="#ffd04b"
                 background-color="#545c64"
                 class="topic-center-menu"
                 :default-active="model"
                 text-color="#fff"
                 @select="handleMenuSelect">
          <!-- <el-submenu index="1">
        </el-submenu> -->
          <el-menu-item index="1">
            <template #title>我的发贴</template>
          </el-menu-item>
          <el-menu-item index="2">
            <template #title>我的收藏</template>
          </el-menu-item>
          <el-menu-item index="3">
            <template #title>我的卖出</template>
          </el-menu-item>
          <el-menu-item index="4">
            <template #title>我的购买</template>
          </el-menu-item>
        </el-menu>

      </el-aside>

      <el-main style="padding: 0;height:100%;border: 1px solid #A8ABB2;">
        <el-header style="height:5%;line-height:30px;border-bottom: 1px solid #C0C4CC;"></el-header>
        <el-main style="background-color: #F2F6FC;height:75%;border-bottom: 1px solid #C0C4CC;">
          <topic-list v-for="(item,index) in topicList"
                      :key="index"
                      :cover="item.cover"
                      :title="item.title"
                      @click.native="toDetail(item.pid)"></topic-list>
          <el-empty :image-size="200"
                    v-show="isEmpty"></el-empty>
          <el-pagination :page-size="5"
                         :pager-count="11"
                         layout="prev, pager, next"
                         :total="1"
                         v-show="!isEmpty"
                         style="text-align: center;">
          </el-pagination>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getMyPost, getMyCollection, getMyBought, getMySold } from '@/api/api'
import TopicList from '@/components/TopicList.vue'
export default {
  name: "TopicCenter",
  data () {
    return {
      model: "1",
      topicList: []
    }
  },
  components: { TopicList },
  methods: {
    toDetail (val) {
      console.log(val)
      if (this.model == "1") {
        this.$router.push({ path: '/my-topic', query: { post_id: val } });
      }
      else
        this.$router.push({ path: '/view-topic', query: { post_id: val } });
    },
    handleMenuSelect (index) {
      console.log("当前选中的菜单项索引是：" + index);
      // 在这里可以编写菜单项的点击事件处理逻辑
      this.model = index;
    },
  },
  watch: {
    // 此处监听variable变量，当期有变化时执行
    // item1为新值，item2为旧值
    model (item1, item2) {
      console.log(item1, item2)
      let formData = new FormData();
      if (item1 == "1") {
        getMyPost(formData).then(res => {
          console.log(res)
          this.topicList = res.data.data.posts_lists
        })
      }
      if (item1 == "2") {
        getMyCollection(formData).then(res => {
          console.log(res)
          this.topicList = res.data.data.fav_list
        })
      }
      if (item1 == "3") {
        getMySold(formData).then(res => {
          console.log(res)
          this.topicList = res.data.data.posts_lists
        })
      }
      if (item1 == "4") {
        getMyBought(formData).then(res => {
          console.log(res)
          this.topicList = res.data.data.posts_lists
        })
      }

    },
    // immediate: true // watch侦听操作内的函数会立刻被执行
  },
  computed: {
    isEmpty () {
      if (this.topicList.length == 0) {
        return true
      }
      else
        return false
    }
  },
  mounted () {
    this.model = this.$route.query.model
    // if (this.model == "1") {
    //   getMyPost().then(res => {
    //     console.log(res)
    //     this.topicList = res.data.data.posts_lists
    //   })
    // }
    // if (this.model == "2") {
    //   getMyCollection().then(res => {
    //     console.log(res)
    //     this.topicList = res.data.data.fav_list
    //   })
    // }
    // if (this.model == "3") {
    //   getMySold().then(res => {
    //     console.log(res)
    //     this.topicList = res.data.data.posts_lists
    //   })
    // }
    // if (this.model == "4") {
    //   getMyBought().then(res => {
    //     console.log(res)
    //     this.topicList = res.data.data.posts_lists
    //   })
    // }
  }
}
</script>

<style>
.topic-center-menu {
  height: 93vh;
}
</style>
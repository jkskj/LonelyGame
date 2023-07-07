<template>
  <div>
    <el-container style="height:100%;">
      <el-aside>
        <el-menu active-text-color="#ffd04b"
                 background-color="#545c64"
                 class="topic-center-menu"
                 :default-active="this.$router.path"
                 text-color="#fff"
                 router>
          <el-menu-item index="/my-post">
            <template #title>我的发贴</template>
          </el-menu-item>
          <el-menu-item index="/my-collection">
            <template #title>我的收藏</template>
          </el-menu-item>
          <el-menu-item index="/my-sold">
            <template #title>我的卖出</template>
          </el-menu-item>
          <el-menu-item index="/my-bought">
            <template #title>我的购买</template>
          </el-menu-item>
        </el-menu>

      </el-aside>

      <el-main style="padding: 0;height:100%;border: 1px solid #A8ABB2;">
        <el-header style="height:5%;line-height:30px;border-bottom: 1px solid #C0C4CC;"></el-header>
        <el-main style="background-color: #F2F6FC;height:75%;border-bottom: 1px solid #C0C4CC;">
          <router-view></router-view>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "TopicCenter",
}
</script>

<style>
.topic-center-menu {
  height: 93vh;
}
</style>
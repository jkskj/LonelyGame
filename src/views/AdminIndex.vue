<template>
  <div>
    <el-container style="height:100%;">
      <el-aside>
        <el-menu active-text-color="#ffd04b"
                 background-color="#545c64"
                 class="admin-menu"
                 :default-active="this.$router.path"
                 text-color="#fff"
                 router>
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
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminIndex",
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
<template>
  <div>
    <el-button style="width:100%;"
               type="primary"
               @click="getPriceList"
               :disabled="isDisabled||isSending">
      查看开价列表<el-icon class="el-icon--right">
  </div>
</template>

<script>
import { getPrice } from '../api/api'
export default {
  name: 'ListPrice',
  methods: {
    getPriceList () {
      getPrice().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
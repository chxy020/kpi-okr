<template>
  <el-col
    type="flex"
    justify="center"
    align="middle"
    :span="20"
  >
    <img
      style="width: 130px; height: 130px"
      src="@/assets/empty_images/no_data.png"
      fit="none"
    >
    <div class="color-style mt-1">
      这里是空的
    </div>
  </el-col>
</template>
<script>
export default {
  name: 'NoData'
}
</script>
<style lang="scss" scoped>
.color-style {
  color: #909399;
}
</style>

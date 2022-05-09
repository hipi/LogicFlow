<template>
  <div>
    <div class="item-title">
      占位提示
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          输入内容的引导语，如：请填写姓名
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <el-input
        size="small"
        v-model="model.attrs.placeholder">
      </el-input>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    model: Object
  }
}
</script>

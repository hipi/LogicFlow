<template>
  <div>
    <div class="item-title">
      标签
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          组件标签，默认为组件类型
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <el-input size="small" v-model="model.attrs.label"></el-input>
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

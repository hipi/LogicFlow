<template>
  <div>
    <div class="item-title">
      内容
    </div>
    <div class="item-content">
      <el-input
        type="textarea"
        size="small"
        v-model="model.attrs.content"
      >
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

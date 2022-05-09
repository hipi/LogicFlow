<template>
  <div class="pc-brick">
    <div class="brick-label">{{model.attrs.label}}</div>
    <el-input
      type="textarea"
      :rows="2"
      :placeholder="model.attrs.placeholder"
      v-model="model.attrs.defaultValue">
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    model: Object
  },
  data() {
    return {}
  }
}
</script>

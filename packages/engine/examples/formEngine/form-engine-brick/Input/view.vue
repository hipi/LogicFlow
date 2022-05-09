<template>
  <div class="pc-brick">
    <div class="brick-label">{{model.attrs.label}}</div>
    <el-input
      v-model="model.attrs.defaultValue"
      :placeholder="model.attrs.placeholder"
    >
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

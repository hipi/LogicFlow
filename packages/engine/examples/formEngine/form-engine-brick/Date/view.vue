<template>
  <div class="pc-brick">
    <div class="brick-label">{{model.attrs.label}}</div>
    <el-date-picker
      v-model="model.attrs.defaultValue"
      type="date"
      :placeholder="model.attrs.placeholder">
    </el-date-picker>
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

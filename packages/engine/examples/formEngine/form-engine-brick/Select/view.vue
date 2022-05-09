<template>
  <div class="pc-brick">
    <div class="brick-label">{{model.attrs.label}}</div>
    <el-select
      v-model="model.attrs.defaultValue"
      :placeholder="model.attrs.placeholder">
      <el-option
        v-for="item in model.attrs.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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

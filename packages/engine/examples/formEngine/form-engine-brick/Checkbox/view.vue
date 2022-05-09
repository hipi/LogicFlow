<template>
  <div class="pc-brick">
    <div class="brick-label">{{model.attrs.label}}</div>
    <el-checkbox-group v-model="model.attrs.defaultValue">
      <el-checkbox
        v-for="(item,index) in model.attrs.options"
        :key="index"
        :label="item.value">{{item.label}}</el-checkbox>
    </el-checkbox-group>
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

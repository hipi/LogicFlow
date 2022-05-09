<template>
  <div>
    <div class="item-title">
      默认值设置
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          渲染时组件默认选中的值
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <el-select
        style="width: 100%"
        size="small"
        v-model="model.attrs.defaultValue"
        :multiple="multiple"
        clearable
        placeholder="请选择默认值"
      >
        <el-option
          v-for="(item, index) in model.attrs.options"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    model: Object,
    multiple: Boolean
  },
  data() {
    return {
    }
  },
  watch: {
  }
}
</script>

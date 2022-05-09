<template>
  <div>
    <div class="item-title">高级设置（RD专用）</div>
    <div class="label-key">
      是否提交展示值 <el-switch v-model="model.attrs.isCommitLabel" size="small"></el-switch>
      <div class="laebl-key-input" v-if="model.attrs.isCommitLabel">
        <span class="laebl-key-info">展示值key: </span>
        <el-input size="small" placeholder="key" v-model="model.attrs.infoLabelKey"> </el-input>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    model: Object
  },
  data() {
    return {
    }
  },
  watch: {
    'model.attrs.infoLabelKey'(val) {
      this.model.commitInfoKeys[1] = val
    }
  }
}
</script>
<style scoped>
.label-key {
  color: #606266;
}
.label-key .laebl-key-input {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.label-key .laebl-key-info{
  margin-right: 5px;
  white-space: nowrap;
}
</style>

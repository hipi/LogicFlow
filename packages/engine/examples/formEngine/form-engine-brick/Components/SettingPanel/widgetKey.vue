<template>
  <div>
    <div class="item-title">
      组件key
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          组件提交给后台的key值，默认为组件ID
          <br>
          如果需要提交多个key，用，隔开
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <el-input
        size="small"
        placeholder="key"
        v-model="commitKey">
      </el-input>
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
      commitKey: this.model.commitInfoKeys.join()
    }
  },
  watch: {
    commitKey(val) {
      if (val) {
        this.model.commitInfoKeys = val.split(',')
      } else {
        this.model.commitInfoKeys = []
      }
    },
    'model.commitInfoKeys': {
      handler() {
        this.commitKey = this.model.commitInfoKeys.join()
      },
      deep: true
    }
  }
}
</script>

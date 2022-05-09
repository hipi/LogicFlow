<template>
  <div>
    <el-button size="small" @click="isOpenLogic = true">表单逻辑配置</el-button>
    <el-tooltip effect="dark" placement="top">
      <div slot="content">
        控制组件的显示和隐藏。例如一个列表，其中的某一项为其它，用户选择其它后出现一个输入框。
      </div>
      <i class="el-icon-question" style="color: #a8adbd"></i>
    </el-tooltip>
    <!-- <el-drawer
      title="表单逻辑配置"
      :visible.sync="isOpenLogic"
      direction="rtl"
      size="750px"
    >
      <logic-setting
        :logics="logics"
        :model="this.store.state.model"
        v-if="isOpenLogic"
        @saveLogic="saveLogic"
      >
      </logic-setting>
    </el-drawer> -->
  </div>
</template>

<script>
// import LogicSetting from '../logic/LogicSetting.vue'

export default {
  props: {
    store: Object
  },
  data() {
    return {
      isOpenLogic: false,
      logics: {}
    }
  },
  mounted() {
    this.logics = this.store.state.logics
  },
  methods: {
    saveLogic(logics) {
      this.store.updateLogic(logics)
      this.logics = logics
      this.isOpenLogic = false
    }
  },
  // components: {
  //   LogicSetting
  // }
}
</script>

<style>
.el-drawer__body {
  overflow: auto;
}
</style>

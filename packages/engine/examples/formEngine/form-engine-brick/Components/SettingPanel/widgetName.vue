<template>
  <div>
    <div class="item-title">
      组件名称
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          组件名称可在添加判断条件时与用户选择值组合使用，不会显示给用户。
          <br>
          中文名称可用于选择拖曳判断条件，英文名称可用于代码书写判断条件。
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <el-input
        class="item-input-name"
        size="small"
        placeholder="中文名称"
        v-model="model.name">
      </el-input>
      <el-input
        class="item-input-name"
        size="small"
        placeholder="英文名称"
        v-model="key">
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
      // 组件真正提交的值默认保存在commitInfoKey的第一项，这是一种约定
      // 但这里存在一个包袱，只有优惠券列表的动态key放在了最后一位，所以这里做了特殊判断
      // 如果后面优惠券列表有改动，顺便一起改了
      key: this.model.type === 'ImCouponList' ? this.model.commitInfoKeys[2] : this.model.commitInfoKeys[0]
    }
  },
  watch: {
    key(val) {
      if (this.model.type === 'ImCouponList') {
        this.model.commitInfoKeys[2] = val
      } else {
        this.model.commitInfoKeys[0] = val
      }
    }
  }
}
</script>

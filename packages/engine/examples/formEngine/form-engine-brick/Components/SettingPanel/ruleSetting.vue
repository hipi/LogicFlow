<template>
  <div>
    <div class="item-title">
      规则设置
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          设置组件的选项和错误提示
          <br>
          如：打开后，则为必填，出现提示文字
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <div class="rule-item">
        <div class="rule-item-line">
          <div class="label">是否必须</div>
          <!-- <div class="value"><el-switch v-model="model.rules[0].required" active-color="#2961EF"></el-switch></div> -->
        </div>
        <div class="rule-item-line">
          <div class="label">错误提示</div>
          <!-- <div class="value"><el-input size="small" v-model="model.rules[0].message" placeholder="请输入内容"></el-input></div> -->
        </div>
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
    return {}
  },
  methods: {
  },
}
</script>

<style scoped>
.item-li-row1 {
  width: 80px;
}
</style>

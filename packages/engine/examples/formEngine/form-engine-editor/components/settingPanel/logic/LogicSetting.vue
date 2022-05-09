<template>
  <div class="logic-setting">
    <div class="logic-title">默认展示组件</div>
    <el-select
      v-model="defaultShow"
      size="small"
      multiple
      placeholder="无默认显示组件，请检查配置的逻辑"
      class="logic-select"
      :disabled="true"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="logic-title">逻辑设置</div>
    <div class="logic-item-wrap">
      <el-row v-if="rules.length">
        <el-col :span="16">展示条件</el-col>
        <el-col :span="8">展示组件</el-col>
      </el-row>
      <logic-item
        v-for="(logicRule, index) in rules"
        :key="index"
        :logicRule="logicRule"
        :options="options"
        @delete="$_deleteRule(index)"
      >
      </logic-item>
    </div>
    <div>
      <span @click="$_addLogic" class="add-logic">新增展示逻辑</span>
    </div>
    <div class="logic-footer">
      <el-button size="small" type="primary" @click="$_save">确认</el-button>
      <el-button size="small" @click="$_reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import LogicItem from './LogicItem.vue'
import { getOptions, getDefaultShow } from '../../../utils/logics.js'

export default {
  props: {
    logics: Object,
    model: {
      type: Array
    }
  },
  data () {
    return {
      rules: [],
      options: []
    }
  },
  mounted () {
    this.options = getOptions(this.model, []);
    // 为了让保存才生效修改内容，需要克隆一份数据，让点击保存才生效。
    if (this.logics.rules) {
      this.rules = JSON.parse(JSON.stringify(this.logics.rules))
    }
  },
  computed: {
    /**
     * 基于配置的规则动态算出默认会显示的组件
     */
    defaultShow() {
      return getDefaultShow(this.rules, this.model);
    }
  },
  methods: {
    $_addLogic () {
      const rule = {
        conditions: [
          {
            conditionFeildId: '',
            value: '',
            expression: '=',
            logical: '',
            hasAttrOptions: false,
            attrOptions: []
          }
        ],
        result: {
          show: []
        }
      };
      this.rules.push(rule)
    },
    $_deleteRule (index) {
      this.rules.splice(index, 1)
    },
    $_save () {
      // todo: 逻辑校验
      this.$emit('saveLogic', {
        rules: this.rules,
        defaultShow: this.defaultShow
      })
    },
    $_reset () {
      // 为了让保存才生效修改内容，需要克隆一份数据，让点击保存才生效。
      if (this.logics.rules) {
        this.rules = JSON.parse(JSON.stringify(this.logics.rules))
      } else {
        this.rules = []
      }
    }
  },
  components: {
    LogicItem
  }
}
</script>

<style scoped>
.logic-setting {
  padding: 0px 20px;
}
.logic-title {
  margin: 5px 0;
}
.el-row {
  padding-left: 10px;
  font-size: 14px;
  color: #72767b;
}
.logic-select {
  width: 100%;
  margin-bottom: 10px;
}
.logic-item {
  border: 1px solid #e9eaec;
  padding: 10px;
  margin: 10px 0;
}
.add-logic {
  color: #407cff;
  cursor: pointer;
}
.logic-footer {
  margin: 10px;
  text-align: right;
}
</style>
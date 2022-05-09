<template>
  <div class="logic-item">
    <el-row>
      <el-col :span="16">
        <div v-for="(condition, index) in logicRule.conditions" :key="index">
          <el-select
            v-model="condition.conditionFeildId"
            size="small"
            :disabled="logicRule.disabled"
            class="logic-condition"
            @change="$_conditionChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            size="small"
            :disabled="logicRule.disabled"
            v-model="condition.expression"
            class="logic-expression"
          >
            <el-option
              v-for="(item, index) in expressionOption"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select
            v-if="condition.hasAttrOptions"
            size="small"
            :disabled="logicRule.disabled"
            v-model="condition.value"
            class="logic-condition"
            multiple
          >
            <el-option
              v-for="(item, index) in condition.attrOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            v-else
            class="logic-condition"
            size="small"
            :disabled="logicRule.disabled"
            v-model="condition.value"
            placeholder="请输入值"
          >
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="logicRule.result.show"
          multiple
          :disabled="logicRule.disabled"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <i class="el-icon-delete delete-icon" @click="$_delete"></i>
  </div>
</template>

<script>
export default {
  props: {
    logicRule: Object,
    options: {
      type: Array
    }
  },
  data () {
    return {
      value: '',
      condtions: [],
      expressionOption: [
        "=",
        "!=",
        ">",
        "<",
        ">=",
        "<="
      ]
    }
  },
  computed: {
    selectBrick() {

    }
  },
  methods: {
    $_delete () {
      if (this.logicRule.disabled) {
        this.$message({
          message: '内置逻辑不允许删除',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$emit('delete')
    },
    $_conditionChange (val) {
      if (!val) return
      const selectOption = this.options.find(item => item.value === val)
      const selectCondition = this.logicRule.conditions.find(item => item.conditionFeildId === val)
      const optionTypes = ['PcRadio', 'PcCheckbox', 'PcSelect']
      if (optionTypes.indexOf(selectOption.type) !== -1) {
        selectCondition.hasAttrOptions = true
        selectCondition.attrOptions = selectOption.options
        selectCondition.value = []
      } else {
        selectCondition.hasAttrOptions = false
        selectCondition.attrOptions = []
        selectCondition.value = ''
      }
    }
  }
}
</script>

<style scoped>
.logic-item {
  position: relative;
}
.delete-icon {
  position: absolute;
  right: 5px;
  top: 20px;
  color: #ff7d41;
  cursor: pointer;
}
.logic-expression {
  width: 60px;
}
.logic-condition {
  width: 180px;
}
</style>
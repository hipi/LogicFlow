<template>
  <div class="filter-setting">
    <div class="filter-title">条件设置</div>
    <div class="filter-wrap">
      <div class="filter-groups" v-for="(group, groupIndex) in filters" :key="groupIndex">
        <div class="filter-group" v-if="Array.isArray(group)">
          <div class="filter-group-title _flex">
            <div>{{(groupIndex / 2) + 1}}组</div>
            <i class="el-icon-close" @click="deleteGroup(groupIndex)"></i>
          </div>
          <div class="filter-group-content">
            <div v-for="(item, itemIndex) in group" :key="itemIndex">
              <div class="filter-item" v-if="!item.isRelation">
                <!-- 选择条件 -->
                <el-select v-model="item.key" size="small" @change="handleConditonChange($event, group, itemIndex)" placeholder="请选择" class="filter-item-condition">
                  <el-option
                    class="_flex"
                    v-for="(condition, conditionIndex) in conditions"
                    :key="conditionIndex"
                    :label="condition.name"
                    :value="condition.key">
                    <span>{{ condition.name }}</span>
                    <el-tooltip effect="dark" placement="top">
                      <div slot="content">{{condition.description}}</div>
                      <i class="el-icon-question" style="color: #a8adbd"></i>
                    </el-tooltip>
                  </el-option>
                </el-select>
                <div class="filter-item-compare">=</div>
                <!-- 下拉框 -->
                <el-select v-if="item.type === 'select'" v-model="item.value" @change="handleStatusChange($event, item)" placeholder="请选择" size="small" class="filter-item-value">
                  <el-option
                    v-for="status in item.options"
                    :key="status.value"
                    :label="status.label"
                    :value="status.value">
                  </el-option>
                </el-select>
                <!-- 输入框 -->
                <el-input
                  v-if="item.type === 'input' && item.dataType === 'string'"
                  size="small"
                  v-model="item.value"
                  class="filter-item-value"
                  placeholder="请输入值">
                </el-input>
                <!-- 数字输入框 -->
                <el-input
                  v-if="item.type === 'input' && item.dataType === 'integer'"
                  type="number"
                  size="small"
                  class="filter-item-value"
                  v-model="item.value"
                  placeholder="请输入值">
                </el-input>
                <!-- 时间选择 -->
                <el-date-picker
                  size="small"
                  class="filter-item-value"
                  v-if="item.type === 'input' && item.dataType === 'date'"
                  v-model="item.value"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择日期">
                </el-date-picker>
                 <!-- 时间范围选择 -->
                <!-- <el-date-picker
                  size="small"
                  class="filter-item-value"
                  v-if="item.type === 'input' && item.dataType === 'daterange'"
                  v-model="item.value"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker> -->
                <el-date-picker
                  size="small"
                  class="filter-item-value"
                  type="dates"
                  v-if="item.type === 'input' && item.dataType === 'daterange'"
                  v-model="item.value"
                  value-format="yyyy-MM-dd"
                  @change="datesPickerChange($event, item)"
                  placeholder="选择一个或两个日期">
                </el-date-picker>
                <i class="el-icon-delete" @click="deleteGroupItem(group, itemIndex)"></i>
              </div>             
              <div v-else class="filter-item">
                <el-select v-model="item.value" size="small" @change="handleRelationChange(item)" placeholder="请选择" class="filter-item-relation">
                  <el-option
                    v-for="relation in relations"
                    :key="relation.value"
                    :label="relation.name"
                    :value="relation.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-button class="filter-add-btn" type="text" size="smal" @click="addItem(group)">新增条件</el-button>
          </div>
        </div>
        <div class="filter-relation" v-else>
          <el-select v-model="group.value" size="small" @change="handleRelationChange(group)" placeholder="请选择" class="filter-item-relation">
            <el-option
              v-for="relation in relations"
              :key="relation.value"
              :label="relation.name"
              :value="relation.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="_flex">
      <el-button type="text" @click="addItem()">新增条件组</el-button>
      <div>提示：您可以在1个组上添加多个条件</div>
    </div>
    <div class="filter-foot">
      <el-button size="small" type="primary" @click="save">确认</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    model: Object,
    conditions: Array
  },
  data () {
    return {
      relations: [
        {
          name: '并且',
          value: '&&'
        },
        {
          name: '或者',
          value: '||'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      filters: []
    }
  },
  watch: {
    'model.attrs': {
      handler() {
        this.filters = JSON.parse(JSON.stringify(this.model.attrs.filters))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addItem(group) {
      const newRelation = {
        name: '并且',
        value: '&&',
        isRelation: true
      }
      const newFilter = {
        key: '',
        name: '',
        description: '',
        type: 'input',
        dataType: 'string',
        compare: '=',
        value: ''
      }
      if (group) {
        group.length ? group.push(newRelation, newFilter) : group.push(newFilter)
      } else {
        this.filters.length ? this.filters.push(newRelation, [newFilter]) : this.filters.push([newFilter])
      }
    },
    deleteGroup(groupIndex) {
      this.handleDelete(this.filters, groupIndex)
    },
    deleteGroupItem(group, itemIndex) {
      this.handleDelete(group, itemIndex)
    },
    handleDelete(arr, index) {
      const preItem = arr[index - 1]
      const nextItem = arr[index + 1]
      arr.splice(index, 1)
      if (preItem) {
        arr.splice(index - 1, 1)
      }
      if (!preItem && nextItem) {
        arr.splice(index, 1)
      }
    },
    // 条件下拉框改变
    handleConditonChange(val, group, index) {
      const condition = this.conditions.find(item => item.key === val)
      const extra = {
        compare: '=',
        value: ''
      }
      group.splice(index, 1, {...condition, ...extra})
    },
    // 逻辑下拉框改变
    handleRelationChange(row) {
      const relation = this.relations.find(item => item.value === row.value)
      row.name = relation.name
    },
    // 当条件为select时，值改变
    handleStatusChange(val, row) {
      const realName = row.options.find(item => item.value === val).label
      row.realName = realName
    },
    datesPickerChange(val, item) {
      if (val.length > 2) {
        this.$message.warning('已选日期超过2个，请重新选择')
        item.value = []
      }
    },
    save() {
      let isPass = true
      this.filters.forEach(group => {
        group.forEach(item => {
          if (!item.value) {
            isPass = false
            return this.$message.warning('请补充过滤条件的值')
          }
        })
      })
      isPass && this.$emit('saveFilters', this.filters)
    },
    reset() {
      if (this.model.attrs.filters.length) {
        this.filters = JSON.parse(JSON.stringify(this.model.attrs.filters))
      } else {
        this.filters = []
      }
    }
  }
}
</script>

<style scoped>
._flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-setting {
  color: #72767b;
  padding: 0 20px;
}
.filter-title {
  color: #000;
  margin-bottom: 5px;
}
.filter-foot {
  margin: 10px;
  text-align: right;
}
.filter-group,.filter-relation {
  margin-bottom: 10px;
}
.filter-group {
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
  transition: .3s;
  padding: 10px;
}
.filter-group-title {
  margin-bottom: 10px;
}
.filter-group-content {
  padding: 10px;
  border: 1px dashed #ddd;
}
.filter-item {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}
.filter-item-condition {
  width: 150px;
}
.filter-item-relation {
  width: 100px;
}
.filter-item-compare {
  padding: 0 10px;
}
.filter-item-value {
  flex: 1;
}
.filter-item .el-icon-delete {
  padding-left: 10px;
}
.filter-add-btn {
  padding: 0;
}
.el-icon-close,.el-icon-delete {
  cursor: pointer;
}
</style>
<template>
  <div>
    <div class="item-title">
      选择业务线
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          {{tips.businessTip}}
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content flex-wrap">
      <el-select v-if="isTenantRequire" class="tenant-select" v-model="model.attrs.tenantId" size="small" placeholder="请选择租户">
        <el-option
          v-for="item in tenantList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="model.attrs.businessTypeList" class="business-select" size="small" multiple placeholder="请选择业务线">
        <el-option-group
          v-for="group in businessList"
          :key="group.groupKey"
          :label="group.groupName"
          :disabled="group.disabled">
          <el-option
            v-for="item in group.businessTypeList"
            :key="item.businessType"
            :label="item.businessTypeName"
            :value="item.businessType"
            @click.native="handleBusinessChange(group.groupKey, group.disabled)">
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <div class="item-title">
      {{tips.filterTitle}}
      <el-tooltip effect="dark" placement="top">
        <div slot="content">
          {{tips.filterTip}}
        </div>
        <i class="el-icon-question" style="color: #a8adbd"></i>
      </el-tooltip>
    </div>
    <div class="item-content">
      <div class="filter-content">
        <div class="filter-groups" v-for="(group, groupIndex) in model.attrs.filters" :key="groupIndex">
          <div class="filter-group" v-if="Array.isArray(group)">
            (
              <span v-for="(item, itemIndex) in group" :key="itemIndex">
                <span class="filter-item" v-if="!item.isRelation">
                  {{item.name}} {{item.compare}}
                  <span v-if="item.type === 'select'">
                    {{item.realName}}
                  </span>
                  <span v-else>
                    <span v-if="item.dataType === 'daterange'">
                    {{item.value[0]}}至{{item.value[1] || '今'}}
                    </span>
                    <span v-else>
                      {{item.value}}
                    </span>
                  </span>
                </span>
                <span v-else class="filter-item-relation">{{item.name}}</span>
              </span>
            )
          </div>
           <div class="filter-relation" v-else>
             {{group.name}}
           </div>
        </div>
      </div>
      <el-button class="filter-content-btn" type="primary" size="mini" @click="addFilter">添加条件</el-button>
    </div>
    <el-drawer
      title="列表过滤条件"
      :visible.sync="isOpenFilter"
      direction="rtl"
      size="500px"
    >
      <filter-setting :model="model" :conditions="conditions" @saveFilters="saveFilters"></filter-setting>
    </el-drawer>
  </div>
</template>

<script>
import FilterSetting from '../Filter/filterSetting'

export default {
  props: {
    model: Object,
    store: Object,
    tips: Object,
    isTenantRequire: Boolean
  },
  components: { FilterSetting },
  data() {
    return {
      tenantList: [{
        label: '滴滴',
        value: 'didi'
      }, {
        label: '橙心',
        value: 'chengxin'
      }],
      businessList: [],
      isOpenFilter: false,
      conditions: []
    }
  },
  watch: {
    'model.attrs.tenantId'() {
      this.model.attrs.businessGroupKey = ''
      this.model.attrs.businessTypeList = []
      this.model.attrs.filters = []
      this.getBusinessTypes()
    },
    'model.attrs.businessTypeList'(val) {
      this.model.attrs.filters = []
      if (val.length) {
        this.getFilterConditions()
      } else {
        this.resetBusinessGroupKey()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getBusinessTypes()
      this.getFilterConditions()
    },
    // 获取业务线
    getBusinessTypes() {
      if (!this.model.attrs.tenantId) return
      this.store.executeApi({
        apiKeys: [
          'im.getBusinessType'
        ],
        dataMap: {
          tenantId: this.model.attrs.tenantId,
          componentType: this.isTenantRequire ? 'ImOrderList' : 'ImCouponList'
        }
      }).then(({ data }) => {
        if( data && data.length > 0) {
          const result = data[0]
          const res = JSON.parse(result.value) || {}
          this.businessList = res.data || []
          this.handleBusinessChange(this.model.attrs.businessGroupKey)
        }
      })
    },
    // 获取查询条件列表
    getFilterConditions() {
      if (!this.model.attrs.businessTypeList.length || !this.model.attrs.businessGroupKey) return
      this.store.executeApi({
        apiKeys: [
          'im.getFilterConditions'
        ],
        dataMap: {
          tenantId: this.model.attrs.tenantId,
          componentType: this.isTenantRequire ? 'ImOrderList' : 'ImCouponList',
          businessGroupKey: this.model.attrs.businessGroupKey,
          businessTypeList: this.model.attrs.businessTypeList
        }
      }).then(({ data }) => {
        if( data && data.length > 0) {
          const result = data[0]
          const res = JSON.parse(result.value) || {}
          this.conditions = res.data
        }
      }).catch(e => {
      })
    },
    // 处理业务线改变
    handleBusinessChange(groupKey, isDisabled) {
      if (this.model.attrs.businessTypeList.length && !isDisabled) {
        this.model.attrs.businessGroupKey = groupKey
        this.getFilterConditions()
        this.businessList.forEach(item => {
          if (item.groupKey === groupKey) {
            this.$set(item, 'disabled', false)
          } else {
            this.$set(item, 'disabled', true)
          }
        })
      }
    },
    // 清空业务线
    resetBusinessGroupKey() {
      this.businessList.forEach(item => item.disabled = false)
      this.model.attrs.businessGroupKey = ''
    },
    addFilter() {
      if (this.model.attrs.businessTypeList.length) {
        this.isOpenFilter = true
      } else {
        this.$message.warning('请先选择业务线')
      }
    },
    saveFilters(filters) {
      this.model.attrs.filters = filters
      this.isOpenFilter = false
    }
  }
}
</script>

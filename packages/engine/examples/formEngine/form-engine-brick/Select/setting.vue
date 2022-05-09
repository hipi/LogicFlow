<template>
  <div>
    <clipboard-ID :gid="model.gid"></clipboard-ID>
    <widget-label :model="model"></widget-label>
    <place-holder :model="model"></place-holder>
    <widget-key :model="model"></widget-key>
    <div class="item-title">
      选项设置
    </div>
    <div class="item-option-raido">
      <el-radio v-model="model.attrs.optionType" :label="1">静态（选项手动配置）</el-radio>
      <el-radio v-model="model.attrs.optionType" :label="2">动态（选项通过资源引擎获取）</el-radio>
    </div>
    <options-setting v-if="model.attrs.optionType === 1" :model="model"></options-setting>
    <div class="dynamic-option" v-if="model.attrs.optionType === 2">
      <div class="option-source">
        <div class="_label">数据来源</div>
        <el-select
          v-model="selectApi"
          placeholder="请选择数据来源"
          remote
          filterable
          :remote-method="remoteMethod"
          :loading="loading"
          @focus="remoteMethod()"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="option-key" v-if="selectApi">
        <div class="_label">展示字段</div>
        <el-select
          v-model="model.attrs.infoLabelKey"
          placeholder="请选择展示字段"
          size="small"
        >
          <el-option
            v-for="item in infoBindList"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="option-key" v-if="selectApi">
        <div class="_label">提交字段</div>
        <el-select
          v-model="infoCommitKeys"
          placeholder="请选择提交字段"
          multiple
          size="small"
        >
          <el-option
            v-for="item in infoBindList"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="item-content-ctrl" v-if="selectApi">
        是否支持远程搜索 <el-switch v-model="model.attrs.isRemoteFilter" size="small"></el-switch>
      </div>
      <div class="option-key" v-if="model.attrs.isRemoteFilter">
        <div class="_label">搜索字段</div>
        <el-select
          v-model="model.attrs.infoFilterKey"
          placeholder="请选择搜索字段"
          size="small"
        >
          <el-option
            v-for="item in infoFilterList"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
    </div>
    <default-value :model="model" :multiple="model.attrs.multiple"></default-value>
    <rule-setting :model="model"></rule-setting>
    <widget-advance :model="model"></widget-advance>
  </div>
</template>

<script>
import ClipboardID from '../Components/SettingPanel/clipboardID.vue';
import PlaceHolder from '../Components/SettingPanel/placeHolder.vue';
import WidgetLabel from '../Components/SettingPanel/widgetLabel.vue';
import widgetKey from '../Components/SettingPanel/widgetKey.vue';
import OptionsSetting from '../Components/SettingPanel/optionsSetting.vue';
import DefaultValue from '../Components/SettingPanel/defaultValue.vue';
import RuleSetting from '../Components/SettingPanel/ruleSetting.vue';
import WidgetAdvance from '../Components/SettingPanel/widgetAdvance.vue';

export default {
  props: {
    model: Object,
    store: Object
  },
  data () {
    return {
      options: [],
      loading: false,
      selectApi: '',
      infoBindList: [],
      infoFilterList: [],
      infoLabelKey: '',
      infoFilterKey: '',
      infoCommitKeys: this.model.attrs.infoCommitKeys
    }
  },
  components: {
    widgetKey,
    ClipboardID,
    PlaceHolder,
    WidgetLabel,
    WidgetAdvance,
    OptionsSetting,
    RuleSetting,
    DefaultValue
  },
  watch: {
    'model.attrs.optionType'(val) {
      if (val === 1) {
        this.model.initInfoKeys = []
        this.model.initInfoList = []
        this.model.commitInfoKeys = [`${this.model.gid}`]
        this.model.attrs.isRemoteFilter = false
      } else {
        this.selectApi = ''
        this.model.attrs.infoLabelKey = ''
        this.model.attrs.infoCommitKeys = []
        this.model.attrs.infoFilterKey = ''
      }
    },
    selectApi(val) {
      if (val) {
        this.setInitInfo()
        this.getInfoKeys()
      }
    },
    infoCommitKeys(val) {
      this.model.attrs.infoCommitKeys = val
      this.model.commitInfoKeys = val
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const selectApi = this.model.initInfoKeys[0]
      if (selectApi) {
        this.selectApi = selectApi
        this.remoteMethod(selectApi, 'init')
      }
    },
    remoteMethod(query, type) {
      this.loading = true;
      this.store.queryInfo({
        queryKey: query,
        page: 1,
        size: 50
      }).then((res) => {
        if (res.errno === 0) {
          const { list } =  res.data;
          this.options = list.map((item) => ({
            value: item.fieldKey,
            label: item.nameShow,
            id: item.id,
            type: item.type
          }))
          // 如果是初始化，需要设置initInfo
          if (type === 'init') this.setInitInfo()
        } else {
          this.$message.error(res.errmsg);
        }
        this.loading = false
      });
    },
    getInfoKeys() {
      this.store.getListProperties({
        sourceInfo: this.selectApi
      }).then((res) => {
        if (res.errno === 0) {
          const bindList = res.data.bind_field_list || []
          const filterList = res.data.filter_field_list || []
          this.infoBindList = bindList
          this.infoFilterList = filterList
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    setInitInfo() {
      const selectItem = this.options.find(option => option.value === this.selectApi)
      if (selectItem) {
        this.model.initInfoKeys = [this.selectApi]
        this.model.initInfoList = [{
          key: selectItem.value,
          name: selectItem.label,
          type: 8,
          sourceType: 1
        }]
      }
    }
  }
}
</script>

<style scoped>
.item-option-raido {
  margin-bottom: 5px;
}
.item-option-raido .el-radio {
  margin-bottom: 5px;
  color: #606266;
  font-weight: 400;
}
.dynamic-option {
  color: #606266;
  margin-bottom: 15px;
}
.dynamic-option ._label{
  margin-bottom: 3px;
}
.dynamic-option .el-select{
  width: 100%;
}
.option-source,.option-key {
  margin-bottom: 5px;
}
</style>

<template>
  <div class="api-input">
    <el-input
      id="contentRef"
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="content"
    >
    </el-input>
    <div class="item-option-raido">
      <el-radio v-model="optionType" :label="1">系统字段（通过资源引擎获取）</el-radio>
      <el-radio v-model="optionType" :label="2">自定义字段（通过接入方获取）</el-radio>
    </div>
    <div class="api-input-item" v-if="optionType === 1">
      <el-select
        v-model="selectApi"
        placeholder="请选择"
        class="api-input-select"
        remote
        filterable
        :remote-method="remoteMethod"
        :loading="loading"
        @focus="remoteMethod()"
        size="mini"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="api-input-button" type="primary" size="mini" @click="insertApi">插入字段</el-button>
    </div>
    <div class="api-detail" v-if="selectApi">
      <div class="api-detail-item">
        <span class="api-detail-label">名称: </span>
        <span class="api-detail-content">{{selectApiItem.label}}</span>
      </div>
      <div class="api-detail-item">
        <span class="api-detail-label">英文名称: </span>
        <span class="api-detail-content">{{selectApiItem.value}}</span>
      </div>
      <div class="api-detail-item">
        <span class="api-detail-label">字段类型: </span>
        <span class="api-detail-content">{{selectApiItem.type | dataType}}</span>
      </div>
    </div>
    <div class="custom" v-if="optionType === 2">
      <el-input size="small" placeholder="字段名称" v-model="customName"></el-input>
      <el-input size="small" placeholder="字段key" v-model="customKey"></el-input>
      <el-button type="primary" size="small" @click="insertCustom">插入字段</el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    value: '',
    initInfoList: {
      type: Array
    },
    store: {
      required: true
    }
  },
  data() {
    return {
      content: '',
      selectApi: '',
      options: [],
      selectInfoValue: '',
      loading: false,
      optionType: 1,
      customName: '',
      customKey: ''
    }
  },
  filters: {
    dataType(val) {
      switch(val) {
        case 0:
          return 'Object';
        case 1:
          return 'String';
        case 2:
          return 'Integer';
        case 3:
          return 'Long';
        case 4:
          return 'Double';
        case 5:
          return 'Short';
        case 6:
          return 'Boolean';
        case 7:
          return 'Date';
        case 8:
          return 'List';
        case 9:
          return 'List';
        default:
          return 'default';
      }
    }
  },
  watch: {
    content(val) {
      this.$emit('input', val);
    },
    value: {
      handler(val) {
        this.content = val;
      },
      immediate: true
    },
    optionType(val) {
      if (val === 1) {
        this.selectApi = ''
      } else {
        this.customName = ''
        this.customKey = ''
      }
    }
  },
  computed: {
    selectApiItem () {
      const item = this.options.filter(option => option.value === this.selectApi)
      if (item.length > 0) {
        return item[0]
      }
      return {}
    }
  },
  methods: {
    changeInput() {
      this.$emit('input', this.value);
    },
    selectApiChange(val) {
      console.log(val)
    },
    remoteMethod(query) {
      this.loading = true;
      // todo: 节流
      this.store.queryInfo({
        queryKey: query,
        page: 1,
        size: 10
      }).then((res) => {
        if (res.errno === 0) {
          const { list, total } =  res.data;
          this.options = list.map((item) => ({
            value: item.fieldKey,
            label: item.nameShow,
            id: item.id,
            type: item.type
          }))
        } else {
          this.$message.error(res.errmsg);
        }
        this.loading = false
      });
    },
    insertApi() {
      if (this.selectApi) {
        const r = this.options.filter(item => item.value === this.selectApi)
        if (r.length > 0) {
          const { label, value, type, id } = r[0]
          const elem = document.getElementById('contentRef')
          this.insertAtCursor(elem, `#${label}#`)
          this.selectApi = ''
          this.initInfoList.push({
            key: value,
            name: label,
            type,
            sourceType: 1
          })
        }
      }
    },
    insertCustom() {
      if (!this.customName || !this.customKey) {
        return this.$message.error('请填写字段名称和字段key')
      }
      const elem = document.getElementById('contentRef')
      this.insertAtCursor(elem, `#${this.customName}#`)
      this.initInfoList.push({
        key: this.customKey,
        name: this.customName,
        type: 1,
        sourceType: 0
      })
      this.customName = ''
      this.customKey = ''
    },
    insertAtCursor(elem, value) {
      const field = elem
      let newValue = ''
      if (document.selection) {
        field.focus()
        const sel = document.selection.createRange()
        sel.text = newValue = value
        sel.select()
      } else if (field.selectionStart || field.selectionStart === 0) {
        const startPos = field.selectionStart
        const endPos = field.selectionEnd
        const restoreTop = field.scrollTop
        newValue = field.value.substring(0, startPos) +
          value +
          field.value.substring(endPos, field.value.length)
        if (restoreTop > 0) {
          field.scrollTop = restoreTop
        }
        this.content = newValue
        field.focus()

        setTimeout(function () {
          field.selectionStart = startPos + value.length
          field.selectionEnd = startPos + value.length
        }, 0)
      } else {
        this.content += value
        field.focus()
      }
    }
  }
}
</script>

<style scoped>
.api-input .el-select{
  width: 100%;
}
.api-input .el-textarea{
  margin-bottom: 10px;
}
.api-input .custom .el-input{
  margin-bottom: 5px;
}
.item-option-raido .el-radio {
  margin-bottom: 5px;
  color: #606266;
  font-weight: 400;
}
.api-input .api-input-item {
  margin-top: 5px;
}
</style>
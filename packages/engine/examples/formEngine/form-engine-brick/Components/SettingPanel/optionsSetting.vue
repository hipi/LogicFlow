<template>
  <div class="item-content">
    <div class="item-li">
      <span class="item-li-row1 item-li-row1-label">实际值</span>
      <span class="item-li-row2">-</span>
      <span class="item-li-row3 item-li-row1-label">展示值</span>
      <span class="item-li-row4"></span>
      <span class="item-li-row5"></span>
    </div>
    <div class="item-li-wrap">
      <div id="js_item-li-dnd">
        <div class="item-li" v-for="(item, index) in model.attrs.options" :key="index" row-key="item">
          <el-input size="small" class="item-li-row1" v-model="item.value"/>
          <span class="item-li-row2">></span>
          <el-input size="small" :maxlength="40" class="item-li-row3" v-model="item.label"/>
          <span v-show="model.attrs.options.length > 1" class="item-li-row4 item-li-drag"></span>
          <span v-show="model.attrs.options.length > 1" class="item-li-row5 item-li-delete" @click="_deleteItem(index)"></span>
        </div>
      </div>
      <div class="item-li item-li-add">
        <el-button plain size="small" @click="_addItem">添加新选项</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import Sortable from 'sortablejs';

export default {
  props: {
    model: Object
  },
  data() {
    return {
    }
  },
  mounted() {
    const dndEl = this.$el.querySelector('#js_item-li-dnd')
    const _this = this
    Sortable.create(dndEl, {
      onEnd({ newIndex, oldIndex }) {
        // 拖动时调换数据位置
        const currRow = _this.model.attrs.options.splice(oldIndex, 1)[0]
        _this.model.attrs.options.splice(newIndex, 0, currRow)
        // 但拖动后显示错误，元素上绑定row-key也错误，这里使用nextIick重新渲染
        const newArray = _this.model.attrs.options.slice(0)
        _this.model.attrs.options = []
        _this.$nextTick(() => {
          _this.model.attrs.options = newArray
        })
      },
    })
  },
  methods: {
    _addItem() {
      this.model.attrs.options.push({
        id: this.model.attrs.options.length,
        value: this.model.attrs.options.length + 1 + '',
        label: ''
      })
    },
    _deleteItem(index) {
      this.model.attrs.options.splice(index, 1)
    }
  },
}
</script>

<style scoped>
.item-li-row1 {
  width: 80px;
}
</style>

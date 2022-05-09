<template>
  <div class="im-popup-wrap">
    <div class="im-popup-mask"></div>
    <div class="im-popup-content">
      <div class="im-popup-head">
        <span class="_title">{{title}}</span>
        <span class="_close" @click="handleClose">x</span>
      </div>
      <div class="im-popup-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
    }
  },
  methods: {
    findParentById(id) {
      let node = this.$el
      while (node.parentNode) {
        if (node.getAttribute('id') === id) {
          return node
        }
        node = node.parentNode
      }
    },
    handleClose() {
      let node = this.$el
      const containerEl = this.findParentById('js_form-editor-wrap')
      containerEl.style.overflow = 'auto'
      node.remove()
    }
  }
}
</script>

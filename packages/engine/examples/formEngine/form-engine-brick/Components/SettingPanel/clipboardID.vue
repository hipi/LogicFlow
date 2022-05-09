<template>
  <div>
    <div class="item-title">组件ID(唯一)</div>
    <div class="item-content">
      <div class="item-input">
        <span class="copy-text">{{gid}}</span>
        <span @click="handleClipboard(gid, $event)" class="copy-text-btn">复制</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    gid: String
  },
  data() {
    return {
    }
  },
  methods: {
    handleClipboard(text, event) {
      const clipboard = new Clipboard(event.target, {
        text: () => text
      })
      clipboard.on('success', () => {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1000
        })
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        this.$message({
          message: '复制失败',
          type: 'error',
          duration: 1000
        })
        clipboard.destroy()
      })
      clipboard.onClick(event)
    }
  }
}
</script>

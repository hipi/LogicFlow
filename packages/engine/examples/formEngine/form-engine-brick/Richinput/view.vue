<template>
  <div class="pc-brick">
    <div class="brick-label">{{model.attrs.label}}</div>
    <div v-html="model.attrs.defaultValue"></div>
  </div>
</template>

<script>
export default {
  props: {
    model: Object
  },
  data() {
    return {}
  }
}
</script>

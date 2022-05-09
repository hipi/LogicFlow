<template>
  <div>
    <clipboard-ID :gid="model.gid"></clipboard-ID>
    <widget-label :model="model"></widget-label>
    <div>设置默认值</div>
    <el-input v-model="model.attrs.defaultValue"></el-input>
  </div>
</template>

<script>
import ClipboardID from '../Components/SettingPanel/clipboardID.vue';
import PlaceHolder from '../Components/SettingPanel/placeHolder.vue';
import WidgetLabel from '../Components/SettingPanel/widgetLabel.vue';
import widgetKey from '../Components/SettingPanel/widgetKey.vue';
import ruleSetting from '../Components/SettingPanel/ruleSetting.vue';

export default {
  props: {
    model: Object,
    store: Object
  },
  data () {
    return {
    }
  },
  components: {
    widgetKey,
    ClipboardID,
    PlaceHolder,
    WidgetLabel,
    ruleSetting
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

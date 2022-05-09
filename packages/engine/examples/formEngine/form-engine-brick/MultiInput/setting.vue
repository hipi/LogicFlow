<template>
  <div>
    <clipboard-ID :gid="model.gid"></clipboard-ID>
    <widget-label :model="model"></widget-label>
    <place-holder :model="model"></place-holder>
    <widget-key :model="model"></widget-key>
    <rule-setting :model="model"></rule-setting>
  </div>
</template>

<script>
import ClipboardID from '../Components/SettingPanel/clipboardID';
import PlaceHolder from '../Components/SettingPanel/placeHolder';
import WidgetLabel from '../Components/SettingPanel/widgetLabel';
import widgetKey from '../Components/SettingPanel/widgetKey';
import RuleSetting from '../Components/SettingPanel/ruleSetting';

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
    RuleSetting
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

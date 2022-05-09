<template>
  <div>
    <clipboard-ID :gid="model.gid"></clipboard-ID>
    <widget-label :model="model"></widget-label>
    <widget-key :model="model"></widget-key>
    <div class="item-title">选项设置</div>
    <options-setting :model="model"></options-setting>
    <default-value :model="model" :multiple="true"></default-value>
    <rule-setting :model="model"></rule-setting>
    <widget-advance :model="model"></widget-advance>
  </div>
</template>

<script>
import ClipboardID from '../Components/SettingPanel/clipboardID.vue';
import WidgetLabel from '../Components/SettingPanel/widgetLabel.vue';
import WidgetKey from '../Components/SettingPanel/widgetKey.vue';
import WidgetAdvance from '../Components/SettingPanel/widgetAdvance.vue';
import OptionsSetting from '../Components/SettingPanel/optionsSetting.vue';
import DefaultValue from '../Components/SettingPanel/defaultValue.vue';
import RuleSetting from '../Components/SettingPanel/ruleSetting.vue';

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
    WidgetKey,
    ClipboardID,
    WidgetLabel,
    WidgetAdvance,
    OptionsSetting,
    RuleSetting,
    DefaultValue
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

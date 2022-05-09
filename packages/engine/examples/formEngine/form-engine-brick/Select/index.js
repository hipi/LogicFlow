import { loadVue } from '../utils/loadFile.js';
import { createVueElement } from '../render/vue-render.js';
import { PcSelectModel } from "./model.js";
// import Setting from './setting.vue';
// import View from './view.vue';
const resolvePath = (p) => {
  const baseUrl = './form-engine-brick/Select/'
  return `${baseUrl}${p}`
}
const Setting = await loadVue(resolvePath('./setting.vue'))
const View = await loadVue(resolvePath('./view.vue'))


const PcSelect = {
  type: 'Select',
  widget: {
    text: '下拉框',
    icon: 'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_xiala@2x.png'
  },
  create(dsl, store) {
    const model = vue.observable(new PcSelectModel(dsl, store.state.initInfoList, store.state.commitInfoList));
    return {
      model,
      setting: createVueElement({ model, store }, Setting),
      view: createVueElement({ model, store }, View)
    }
  }
}

export default PcSelect;

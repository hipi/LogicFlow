import { loadVue } from '../utils/loadFile.js';
import { createVueElement } from '../render/vue-render.js';
import { PcDateModel } from "./model.js";

const resolvePath = (p) => {
  const baseUrl = './form-engine-brick/Date/'
  return `${baseUrl}${p}`
}
const Setting = await loadVue(resolvePath('./setting.vue'))
const View = await loadVue(resolvePath('./view.vue'))


const PcDate = {
  type: 'PcDate',
  widget: {
    text: '日期选择器',
    icon: 'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_riqi@2x.png'
  },
  create(dsl, store) {
    const model = vue.observable(new PcDateModel(dsl, store.state.initInfoList, store.state.commitInfoList));
    return {
      model,
      setting: createVueElement({ model, store }, Setting),
      view: createVueElement({ model, store }, View)
    }
  }
}

export default PcDate;

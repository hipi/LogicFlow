import { loadVue } from '../utils/loadFile.js';
import { createVueElement } from '../render/vue-render.js';
import { PcRichinputModel } from "./model.js";

const resolvePath = (p) => {
  const baseUrl = './form-engine-brick/Richinput/'
  return `${baseUrl}${p}`
}
const Setting = await loadVue(resolvePath('./setting.vue'))
const View = await loadVue(resolvePath('./view.vue'))


const PcRichinput = {
  type: 'Richinput',
  widget: {
    text: '文本输入框',
    icon: 'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_shuru@2x.png'
  },
  create(dsl, store) {
    const model = vue.observable(new PcRichinputModel(dsl, store.state.initInfoList, store.state.commitInfoList));
    return {
      model,
      setting: createVueElement({ model, store }, Setting),
      view: createVueElement({ model, store }, View)
    }
  }
}

export default PcRichinput;

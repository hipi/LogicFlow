import { loadVue } from '../utils/loadFile.js';
import { createVueElement } from '../render/vue-render.js';
import { PcCheckboxModel } from "./model.js";

const resolvePath = (p) => {
  const baseUrl = './form-engine-brick/Checkbox/'
  return `${baseUrl}${p}`
}
const Setting = await loadVue(resolvePath('./setting.vue'))
const View = await loadVue(resolvePath('./view.vue'))

const PcCheckbox = {
  type: 'Checkbox',
  widget: {
    text: '多选框',
    icon: 'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_duoxuan@2x.png'
  },
  create(dsl, store) {
    const model = vue.observable(new PcCheckboxModel(dsl, store.state.initInfoList, store.state.commitInfoList));
    return {
      model,
      setting: createVueElement({ model, store }, Setting),
      view: createVueElement({ model, store }, View)
    }
  }
}

export default PcCheckbox;

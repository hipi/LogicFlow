import vue from 'vue';
import { createVueElement } from '../render/vue-render';
import { PcMultiInputModel } from "./model";
import Setting from './setting.vue';
import View from './view.vue';

const PcMultiInput = {
  type: 'PcMultiInput',
  widget: {
    text: '多行输入框',
    icon: 'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_duohang@2x.png'
  },
  create(dsl, store) {
    const model = vue.observable(new PcMultiInputModel(dsl, store.state.initInfoList, store.state.commitInfoList));
    return {
      model,
      setting: createVueElement({ model, store }, Setting),
      view: createVueElement({ model, store }, View)
    }
  }
}

export default PcMultiInput;

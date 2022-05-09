import { html, render } from '../../../../static/lit.js';
// import vue from 'vue';
// import FormSettingElement from './FormSetting.vue';
// import { repeat } from 'lit/directives/repeat.js';
// import styles from './formSetting.module.css';
// import { getFormSetting } from '../../../../bricks/FormSetting'
// import { getFormSetting } from '@facile/bricks/FormSetting'
// const vue = window.Vue;
import { loadVue } from '../../../utils/loadFile.js';
const resolvePath = (p) => {
  const baseUrl = './form-engine-editor/components/settingPanel/formSetting/'
  return `${baseUrl}${p}`
}
const FormSettingElement = await loadVue(resolvePath('./FormSetting.vue'))

export class FormSetting extends HTMLElement {
  static get observedAttributes() {
    return ['store'];
  }
  connectedCallback() {
    this.loadForm().then(() => {
      this.RenderDom();
    });
  }
  RenderDom() {
    // const el = getFormSetting({
    //   store: this.store
    // });
    render(this.formEl, this);
  }
  async loadForm() {
    // TODO: 基于不同的表单类型获取表单设置
    // const { getFormSetting } = await import('@facile/bricks/FormSetting');
    // console.log(this.store);
    // this.formEl = getFormSetting({
    //   store: this.store
    // });
    if (!vue) {
      throw new Error('缺少Vue对象，请提供window.Vue')
    }
    this.formEl = document.createElement('div');
    const el = document.createElement('div');
    this.formEl.appendChild(el);
    const vm = new vue({
      el: el,
      render: h => h(FormSettingElement, {
        props: {
          store: this.store
        }
      })
    })
    return vm
  }
}

customElements.get('facile-form-setting') || customElements.define('facile-form-setting', FormSetting);

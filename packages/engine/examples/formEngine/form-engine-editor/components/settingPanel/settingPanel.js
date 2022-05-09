import { html, css, render } from '../../../static/lit.js';
import { EDITOR_EVENT, FORM_STATU } from "../../constant/index.js";
import litStyles from './style.lit.js';
// import styles from './style.module.css';
// import { FormSetting } from './formSetting/index.js';
// import './formSetting';

export class SettingPanelElement extends HTMLElement {
  activeTabIndex = 0;
  static get observedAttributes() {
    return ['store', 'setting'];
  }
  /**
   * https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
   */
  connectedCallback() {
    this.RenderDom();
    this.store.eventCenter.on(EDITOR_EVENT.SETTING_ACTIVE_BRICK, () => {
      this.activeTabIndex = 0;
      this.RenderDom();
    });
    // 组合组件内部组件
    this.store.eventCenter.on(EDITOR_EVENT.CANVAS_COMB_BRICK_SELECT, (setting) => {
      this.setting = setting;
      this.renderSetting();
    });
    import('./formSetting/index.js');
    this.formElement = document.createElement('facile-form-setting');
    this.formElement.store = this.store;
  }
  RenderDom() {
    const style = document.createElement('style');
    style.innerHTML =  css`${litStyles}`.cssText;
    this.appendChild(style);
    this.settingWrap = document.createElement('div');
    this.settingWrap.className = 'facile_panel';
    const children = html`
      <div class="settingTips">
        <div class="settingTabs">
          <div class="${this.getCls(0)}" @click="${() => this.changeTab(0)}">组件属性</div>
          <div
            class="${this.getCls(1)}"
            style="display: ${this.store.state.formType === 3 ? 'none' : ''}"
            @click="${() => this.changeTab(1)}">表单设置</div>
        </div>
      </div>
      ${
        this.settingWrap
      }
    `;
    
    render(children, this);
    if (this.activeTabIndex === 0) {
      this.setting = this.store.getActiveSetting();
      this.renderSetting();
    } else {
      this.renderForm();
    }
  }
  changeTab(tab) {
    this.activeTabIndex = tab;
    this.RenderDom();
  }
  getCls(tab) {
    const cls = [];
    cls.push('facile_tips');
    if (this.activeTabIndex === tab) {
      cls.push('actived');
    }
    if (tab === 1) {
      cls.push('split-line');
    }
    return cls.join(' ');
  }
  renderSetting() {
    this.settingWrap.innerHTML = '';
    if (this.store.state.formStatu !== FORM_STATU.DRAFT || this.store.options.mode !== 'edit') {
      this.settingWrap.className = 'facile_panel facile_setting-view'
    }
    if (this.setting) {
      this.settingWrap.appendChild(this.setting.el);
    } else {
      const noContentEl = document.createElement('div');
      noContentEl.className = 'setting-nocontent';
      noContentEl.innerHTML = '← 请先点击表单中的组件'
      this.settingWrap.appendChild(noContentEl);
    }
  }
  async renderForm() {
    this.settingWrap.innerHTML = '';
    this.settingWrap.appendChild(this.formElement);
  }
}

customElements.get('facile-setting-panel') || customElements.define('facile-setting-panel', SettingPanelElement);


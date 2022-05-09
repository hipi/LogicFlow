import { html, render, css } from '../../../../static/lit.js';
import { EDITOR_EVENT, FORM_STATU } from '../../../constant/index.js';
// import Sortable from 'sortablejs';
import litStyles from './style.lit.js';
// import styles from './style.module.css' assert { type: 'css' };

export class BrickList extends HTMLElement {
  items = [];
  renderCount = 0;
  static get observedAttributes() {
    return ['store', 'setting'];
  }
  connectedCallback() {
    this.store.eventCenter.on(EDITOR_EVENT.CANVAS_BRICK_CHANGE, () => {
      this.getBricks();
    });
    this.getBricks();
    this.createSortble();
  }
  renderItems() {
    const style = document.createElement('style');
    style.innerHTML =  css`${litStyles}`.cssText;
    this.appendChild(style);
    const children = html`
      <div class="facile_brick_list" id="js_form-editor-dnd">
        ${this.getList()}
      </div>
    `;
    render(children, this);
  }
  deleteItem (index) {
    this.store.deleteCanvasBrick(index);
  }
  createSortble() {
    const { mode } = this.store.options;
    if (mode === 'edit') {
      Sortable.eventCanceled = true
      this.sortInstance = Sortable.create(this.querySelector('#js_form-editor-dnd'), {
        dataIdAttr: 'data-id',
        onEnd: ({ newIndex, oldIndex}) => {
          this.store.changeBrickIndex(newIndex, oldIndex)
        }
      });
    }
  }
  getBricks() {
    const items = [...this.store.getCanvasBricks()];
    this.activeIndex = this.store.state.activeBrickIndex;
    // fixme: 没有找到合适的lit配合拖动排序的处理方式
    // 如果当前组件已有的items和新的items 顺序不一样，则强制所有的list元素更新
    if (this.items.map(item => item.model.gid).join() !== items.map(item => item.model.gid).join()) {
      this.renderCount++;
    }
    this.items = items;
    this.errorItemGid = '';
    this.renderItems();
  }
  getList() {
    return html`
      ${this.items.map(
        (item, index) =>
        html`
          <div class="${this.getListItemCls(item, index, this.errorItemGid)}"
            data-id=${item.model.gid}
            key=${index+ '_' + this.items.length}
            @click="${(event) => this.selectItem(index, event)}">
            ${
              this.getDeleteIcon(index)
            }
            ${item.el}
          </div>
        `
      )}
    `
  }
  getListItemCls (item, index, errorItemGid) {
    const cls = [
      'list-item'
    ];
    // 如果当做组件是选中组件，给出高亮样式
    if (index === this.activeIndex) {
      cls.push('actived-item');
    }
    // 如果当做组件是异常组件，给出高亮异常样式
    if (item.model.gid === errorItemGid) {
      cls.push('error-item');
    }
    return cls.join(' ');
  }
  getDeleteIcon (index) {
    const { options: { mode }, state } = this.store;
    if (index === this.activeIndex && mode === 'edit' && state.formStatu === FORM_STATU.DRAFT) {
      return html`<span class="list-item-delete" @click="${() => this.deleteItem(index)}"></span>`
    }
  }
  selectItem (index, e) {
    const { mode } = this.store.options;
    if (mode !== 'preview') {
      // 点击删除icon时，阻止事件冒泡
      if (e.target.className !== 'list-item-delete') {
        this.store.selectCanvasBrick(index);
      }      
    }
  }
}

customElements.get('pc-brick-list') || customElements.define('pc-brick-list', BrickList);

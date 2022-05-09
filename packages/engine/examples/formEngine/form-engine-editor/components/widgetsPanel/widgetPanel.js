import { LitElement, html, css } from '../../../static/lit.js';
import styles from './style.lit.js';

export class WidgetPanel extends LitElement {
  static styles = css`${styles}`;
  render() {
    return html`
      <div class="tips" @click=${this._addBrick}>组件列表</div>
      <div class="category-name">常用</div>
      <ul class="widgets">
        ${
          this.brickList?.map((widget, i) => {
            return html`
              <li class="widget-item" key=${i} @click="${() => this._addBrick(widget)}">
                <img src=${widget.icon} class="widget-icon">
                <span>${widget.text}</span>
              </li>
            `
          })
        }
      </ul>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    const widgets = this.store.getWidgets();
    this.brickList = widgets;
  }
  _addBrick (item) {
    this.store.addCanvasBrick(item.type);
  }
}

customElements.get('widget-panel') || customElements.define('widget-panel', WidgetPanel);

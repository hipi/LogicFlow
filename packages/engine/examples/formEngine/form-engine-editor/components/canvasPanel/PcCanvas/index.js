import { html, render } from '../../../../static/lit.js';
console.log('html', html)
// import { EDITOR_EVENT, FORM_STATU } from "../../../index.js";
import styles from './style.module.css' assert { type: 'css' };
import './BrickList.js';

export class PcCanvas extends HTMLElement {
  static get observedAttributes() {
    return ['store', 'setting'];
  }
  connectedCallback() {
    this.className= "facile_pc";
    const children = html`
      <div class="facile_canvas" style="height: ${this.height ? this.height + 'px': '100%'}">
        <pc-brick-list .store=${this.store}></pc-brick-list>
      </div>
    `;
    
    render(children, this);
  }
  
}

customElements.get('pc-canvas') || customElements.define('pc-canvas', PcCanvas);

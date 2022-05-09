import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export class IconArrow extends LitElement {
  styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
    }
    .left {
      transform: rotate(90deg);
    }
    .right {
      transform: rotate(270deg);
    }
    .up {
      transform: rotate(180deg);
    }
  `;
  width = 32;
  height = 32;
  direction = 'down';
  render() {
    this.style.setProperty('width', this.width + 'px')
    this.style.setProperty('height', this.height + 'px')
    this.style.setProperty('line-height', this.height + 'px')
    return html`
      <svg
        t="1631430850193"
        class="arrow-icon ${this.direction}"
        viewBox="0 0 1024 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="3730"
        width="${this.width}"
        height="${this.width}"
      >
        <path
          d="M948.560332 281.179984c-13.765515-13.833053-36.127825-13.833053-49.89334 0L511.991302 668.591431 125.313565 281.179984c-13.763468-13.798261-36.093033-13.798261-49.856501 0-13.799284 13.798261-13.799284 36.161594 0 49.993624l410.857439 411.674037c7.067976 7.085372 16.402575 10.521634 25.675776 10.331299 9.274224 0.191358 18.608823-3.245927 25.677822-10.331299l410.891208-411.708829c6.863315-6.89913 10.331299-15.940041 10.331299-24.979928S955.423647 288.078091 948.560332 281.179984z"
          fill="currentColor">
        </path>
      </svg>
    `;
  }
}

customElements.get('icon-arrow') || customElements.define('icon-arrow', IconArrow);

/**
 * 创建画布面板
 */
import { FORM_TYPE } from '../../constant/index.js';

/**
 * 加载当前表单的设计画布, 由于画布是采用自定义html元素的方式
 * 所以只需要
 */
async function canvasLoader(type) {
  await import(/* webpackChunkName: "PcCanvas" */ './PcCanvas/index.js');
  return document.createElement('pc-canvas');
}

export async function createCanvasPanel({ store, height }) {
  const componentsPanelElement = await canvasLoader(store.state.formType);
  componentsPanelElement.store = store;
  componentsPanelElement.height = height;
  if (height) {
    componentsPanelElement.style.height = `${height}px`;
  }
  return componentsPanelElement;
}

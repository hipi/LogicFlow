/**
 * 创建组件面板
 */
//  import styles from './style.module.css';
import './widgetPanel.js';
// import { IStore } from '../../store';
 
export function createWidgetPanel({ store }) {
  
  const componentsPanelElement = document.createElement('widget-panel');
  componentsPanelElement.className = 'panel';
  componentsPanelElement.store = store;

  return componentsPanelElement;
}

 
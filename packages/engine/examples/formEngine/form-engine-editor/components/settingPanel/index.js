/**
 * 创建组件面板
 */
//  import styles from './style.module.css';
import './settingPanel.js';
// import { IStore } from '../../store';
 
export function createSettingPanel({ store }) {
  
  // const componentsPanelElement = document.createElement('setting-panel');
  const componentsPanelElement = document.createElement('facile-setting-panel');
  componentsPanelElement.className = 'panel';
  componentsPanelElement.store = store;

  return componentsPanelElement;
}

 
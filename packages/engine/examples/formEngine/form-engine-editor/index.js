// import styles from './style.module.css' assert { type: 'css' };
import { createWidgetPanel } from './components/widgetsPanel/index.js';
import { createCanvasPanel } from './components/canvasPanel/index.js';
import { createSettingPanel } from './components/settingPanel/index.js';
import { Store } from './store/index.js';
import { EventEmitter } from './store/EventEmitter.js';
// import { WidgetPanel } from './components/widgetsPanel/widgetPanel';
import loadBricks from './services/brickLoader.js';
import { setHeaders } from './services/http.js';
import { getFormBrick, getFormDetail, saveForm, setBaseUrl } from './services/services.js';
import { EDITOR_EVENT } from './constant/index.js';
import { ERROR_RESPONSE_DATA } from './constant/ErrorNo.js';
import { getError } from './services/utils.js';

class FormEditor {
  // formDetail: any;
  constructor (options) {
    this.options = Object.assign({
      mode: 'edit',
      tenantId: 'didi'
    }, options);

    setHeaders({
      validateType: this.options.validateType,
      'x-flow-tenant-id': this.options.tenantId
    });
    
    if (this.options.baseUrl) {
      setBaseUrl(this.options.baseUrl);
    }
    this.eventCenter = new EventEmitter();
    this.store = new Store({
      eventCenter: this.eventCenter,
      options: this.options
    });
  }
  /**
   * 自定义brick
   */
  registerBrick () {
    console.log(33)
  }
  async init () {
    console.log('init---------')
    try {
      const formDetail = {
        data: {
          // commitInfoList: [],
          // createTime: "2022-02-23 16:38:29",
          // creator: "optimus-prime",
          // formKey: "space_xq_uqesvP2V",
          // formModel: null,
          // id: 282,
          // initInfoList: [],
          // name: "v1.4订单列表",
          // spaceKey: "space_xq",
          // spaceName: null,
          status: 1,
          type: this.options.formType,
        }
      }
      const bricks = await getFormBrick(formDetail.data.type);
      if (!bricks || !bricks.data) {
        throw getError(ERROR_RESPONSE_DATA.GET_BRICK_ERROR);
      }
      const brickElement = await loadBricks(bricks.data.map(brick => brick.type));
      this.store.initBricks(brickElement);
      this.store.initForm(formDetail.data);
      this.eventCenter.emit(EDITOR_EVENT.FORM_ONLOAD, formDetail);
    } catch (e) {
      this.eventCenter.emit(EDITOR_EVENT.ERROR, e);
      // todo: 埋点上报错误
      throw e;
    }
  }
  async render() {
    await this.init();
    const editorEle = document.createElement('div');
    editorEle.className = 'editor';
    if (this.options.editorHeight) {
      editorEle.style.height = this.options.editorHeight + 'px'
    }
    this.bricksPanel = createWidgetPanel({
      store: this.store
    });
    this.canvas = await createCanvasPanel({
      store: this.store,
      height: this.options.canvasHeight
    });
    const settingPanel = createSettingPanel({
      store: this.store
    });
    editorEle.appendChild(this.bricksPanel);
    editorEle.appendChild(this.canvas);
    editorEle.appendChild(settingPanel);
    this.options.container.appendChild(editorEle);
  }
  /**
   * 只渲染中间的画布内容，用于集成系统PC端表单预览。
   */
  async renderCanvas() {
    await this.init();
    const editorEle = document.createElement('div');
    editorEle.className = styles.canvas;
    this.canvas = await createCanvasPanel({
      store: this.store,
      height: this.options.canvasHeight
    });
    editorEle.appendChild(this.canvas);
    this.options.container.appendChild(editorEle);
  }
  async appendSubForm(form) {
    this.store.appendSubForm(form)
  }
  async save(callback) {
    try {
      for (let i = 0; i < this.store.state.model.length; i++) {
        const m = this.store.state.model[i];
        // 如果保存的时候DSL校验出错，这返回false
        if (!this.store.validDsl(m)) return;
      }
      const getFormDsl = this.store.getFormDsl();
      // if (getFormDsl) {
      //   const res = await saveForm(getFormDsl)
      //   callback && callback(res);
      //   return res;
      // }
      callback(getFormDsl)
    } catch (e) {
      this.eventCenter.emit(EDITOR_EVENT.ERROR, e);
      // todo: 埋点上报错误
      throw e;
    }
  }
}

export default FormEditor

import { EDITOR_EVENT, FORM_STATU, FORM_STATU_NAME, FORM_TYPE } from '../constant/index.js';
import { executeApi, queryInfo, getListProperties } from '../services/services.js';
import { getDefaultShow, isModelCondition } from '../utils/logics.js';
import { EventEmitter } from './EventEmitter.js';


class State {
  model = []; // 页面配置的model
  view = [];
  setting = [];
  commitInfoList = [];
  initInfoList = [];
  activeBrickIndex = -1;
  isConfigLogic = false;
  // todo: logics控制组件的显隐和默认值
  logics = {
    rules: [],
    defaultShow: []
  };
  bricks = new Map(); // 组件列表
}

export class Store {
  constructor ({ eventCenter, options }) {
    this.state = new State();
    this.options = options;
    this.eventCenter = eventCenter || new EventEmitter();
    // this.eventCenter = new EventEmitter();
  }
  initBricks (bricks) {
    bricks.map((brick) => {
      this.state.bricks.set(brick.type, brick);
    });
  }
  initForm (formDsl) {
    this.state.formDsl = formDsl;
    this.state.formStatu = formDsl.status;
    this.state.formType = formDsl.type;
    if (formDsl.commitInfoList) {
      this.state.commitInfoList = JSON.parse(JSON.stringify(formDsl.commitInfoList));
    }
    if (formDsl.initInfoList) {
      this.state.initInfoList = JSON.parse(JSON.stringify(formDsl.initInfoList));
    }
    if (formDsl.formModel) {
      const formModel = JSON.parse(formDsl.formModel);
      
      (formModel.items || []).map((item) => {
        const instance = this.createBrickInstance(item.type, item)
        if (!instance) return
        this.state.model.push(instance.model);
        this.state.view.push({
          model: instance.model,
          type: item.type,
          el: instance.view
        });
        this.state.setting.push({
          type: item.type,
          el: instance.setting
        });
      });

      this.state.logics = formModel.logics;

      if (
        formModel.items
        && formModel.items.length > 0
        && this.options.mode !== 'preview'
      ) {
        this.state.activeBrickIndex = 0;
      }
    }
  }
  appendSubForm(form) {
    if (form.items) {
      form.items.forEach((item) => {
        const instance = this.createBrickInstance(item.type, item)
        console.log('instance', instance)
        if (!instance) return
        this.state.model.push(instance.model);
        this.state.view.push({
          model: instance.model,
          type: item.type,
          el: instance.view
        });
        this.state.setting.push({
          type: item.type,
          el: instance.setting
        });
      });
      this.eventCenter.emit(EDITOR_EVENT.CANVAS_BRICK_CHANGE); 
    }
  }
  /**
   * 获取组件面板所有需要显示的组件
   */
  getWidgets () {
    const widgets = [];
    this.state.bricks.forEach((brick, key) => {
      const { icon, text } = brick.widget;
      widgets.push({
        icon,
        text,
        type: key
      });
    });
    return widgets;
  }
  /**
   * 获取画布所有显示的组件
   * @returns 
   */
  getCanvasBricks () {
    return this.state.view;
  }
  getActiveSetting () {
    return this.state.setting[this.state.activeBrickIndex]
  }
  getActiveModel () {
    return this.state.model[this.state.activeBrickIndex]
  }
  getFormDsl() {
    const items = [];
    const commitInfoList = [];
    const initInfoList = [];
    for (let i = 0; i < this.state.model.length; i++) {
      const m = this.state.model[i];
      const dsl = m.getDsl();
      items.push(dsl);
      commitInfoList.push(...m.getCommitInfos()); // todo: 去重
      initInfoList.push(...m.getInitInfoList()); // todo: 去重
    }
    const formModel = {
      logics: this.state.logics,
      theme: {},
      items,
    }
    return {
      ...this.state.formDsl,
      formModel: JSON.stringify(formModel),
      initInfoList,
      commitInfoList
    };
  }
  /**
   * 创建组件实例
   */
  createBrickInstance (type,  model) {
    console.log('this.state.bricks', this.state.bricks)
    const brick = this.state.bricks.get(type);
    console.log('brick', brick)
    const instance = brick ? brick.create(model, this) : null;
    return instance;
  }
  /**
   * 组件添加的时候，执行组件的校验逻辑
   */
  vaildAddRule(model) {
    let { isValid, msg } = model.isAllowAdd(this);
    if (this.state.formStatu !== FORM_STATU.DRAFT) {
      isValid = false
      msg = `此表单状态为${FORM_STATU_NAME[this.state.formStatu]}, 不允许编辑。`
    }
    if (this.options.mode !== 'edit') {
      isValid = false
      msg = '当前表单为不可编辑模式, 不允许编辑。'
    }
    if (!isValid) {
      this.eventCenter.emit(EDITOR_EVENT.ERROR, {
        type: 'error',
        msg
      })
      return false;
    }
    return true;
  }
  /**
   * 保存的时候，校验组件DSL规则
   */
  validDsl(model) {
    const { gid, msg, isValid } = model.validateDsl(this);
    if (!isValid) {
      this.eventCenter.emit(EDITOR_EVENT.ERROR, {
        type: 'error',
        msg,
        gid
      });
      return false;
    }
    return true;
  }
  /**
   * 添加一个brick到画布
   */
  addCanvasBrick (type) {
    const instance = this.createBrickInstance(type);

    if (!this.vaildAddRule(instance.model)) return;

    this.state.activeBrickIndex += 1;
    const index = this.state.activeBrickIndex;
    this.state.model.splice(index, 0, instance.model);
    this.state.view.splice(index, 0, {
      model: instance.model,
      type,
      el: instance.view
    });
    this.state.setting.splice(index, 0, {
      type,
      el: instance.setting
    });
    const items = this.getCanvasBricks();
    const formDsl = this.getFormDsl();
    this.eventCenter.emit(EDITOR_EVENT.CANVAS_BRICK_CHANGE, { items, formDsl });
    this.eventCenter.emit(EDITOR_EVENT.SETTING_ACTIVE_BRICK);
    // 所有的组件提供一个brickAdded钩子，用于在组件被添加到画布后进行处理。
    // 例如组合组件被添加到画布后自动设置组件的逻辑。
    instance.model.brickAdded(this);
  }
  /**
   * 调整画布中某个brick的顺序
   */
  changeBrickIndex (newIndex, oldIndex) {
    const { model, view, setting } = this.state;
    model.splice(newIndex, 0, model.splice(oldIndex, 1)[0]);
    view.splice(newIndex, 0, view.splice(oldIndex, 1)[0]);
    setting.splice(newIndex, 0, setting.splice(oldIndex, 1)[0]);
    this.state.activeBrickIndex = newIndex;
    const items = this.getCanvasBricks();
    const formDsl = this.getFormDsl();
    // this.eventCenter.emit(EDITOR_EVENT.CANVAS_BRICK_CHANGE, { items, formDsl });
    this.eventCenter.emit(EDITOR_EVENT.SETTING_ACTIVE_BRICK);
  }
  /**
   * 选中画布中的brick
   */
  selectCanvasBrick (index) {
    this.state.activeBrickIndex = index;
    const items = this.getCanvasBricks();
    const formDsl = this.getFormDsl();
    this.eventCenter.emit(EDITOR_EVENT.CANVAS_BRICK_CHANGE, { items, formDsl });
    this.eventCenter.emit(EDITOR_EVENT.SETTING_ACTIVE_BRICK);
  }
  /**
   * 删除画布中的brick
   */
  deleteCanvasBrick (index) {
    if (this.state.formStatu !== FORM_STATU.DRAFT) {
      this.eventCenter.emit(EDITOR_EVENT.ERROR, {
        type: 'error',
        msg: `此表单状态为${FORM_STATU_NAME[this.state.formStatu]}, 不允许删除。`
      })
      return;
    }
    this.state.activeBrickIndex = index;
    // const currModel = this.state.model[index];
    // currModel.deleteBrick && currModel.deleteBrick();
    this.state.setting.splice(index, 1);
    this.state.view.splice(index, 1);
    const deleteModel = this.state.model.splice(index, 1);
    if (!this.state.view.length) {
      this.state.activeBrickIndex = -1;
    }
    // 删除画布上的元素同时会删除其对应的逻辑
    this.deleteModelAndLogicRule(deleteModel[0]);
    const items = this.getCanvasBricks();
    const formDsl = this.getFormDsl();
    this.eventCenter.emit(EDITOR_EVENT.CANVAS_BRICK_CHANGE, { items, formDsl });
    this.eventCenter.emit(EDITOR_EVENT.SETTING_ACTIVE_BRICK);
  }
  
  /**
   * 添加表单逻辑规则
   */
  updateLogic (logics) {
    this.state.logics = logics;
    const items = this.getCanvasBricks();
    const formDsl = this.getFormDsl();
    this.eventCenter.emit(EDITOR_EVENT.CANVAS_BRICK_CHANGE, { items, formDsl });
  }
  deleteLogicRule (index) {
    this.state.logics.rules.splice(index, 1);
  }
  /**
   * 删除某个组件所涉及的所有逻辑
   */
  deleteModelAndLogicRule (model) {
    const newRules = [];
    if (!this.state.logics.rules) return
    this.state.logics.rules.forEach((rule) => {
      let isDelete = isModelCondition(rule, model)
      if (!isDelete) {
        newRules.push(rule);
      }
    });
    this.state.logics.rules = newRules;
    this.state.logics.defaultShow = getDefaultShow(newRules, this.state.model);
  }
  
  executeApi (data) {
    return executeApi(data)
  }
  queryInfo (data) {
    return queryInfo(data)
  }

  getListProperties (data) {
    return getListProperties(data)
  }
  // get(state: string) {
  //   return this.state[state]
  // }
}


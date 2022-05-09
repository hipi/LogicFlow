import getUniqueId from "./utils/ID.js";

export const DATA_TYPE = {
  Object: 0,
  String: 1,
  Integer: 2,
  Long: 3,
  Double: 4,
  Short: 5,
  Boolean: 6,
  Date: 7,
  List: 8,
  Table: 9,
}


export class BrickModel {
  constructor (dsl, globalInitInfoList, commitInfoList) {
    if (!dsl) {
      const gid = `ImBrick_${getUniqueId()}`;
      dsl = {
        gid,
        attrs: {},
        type: 'ImBrick',
        status: 'default',
        rules: [],
        theme: {},
        commitInfoKeys: [],
        initInfoKeys: []
      };
    }
    this.gid = dsl.gid;
    this.name = dsl.name;
    this.attrs = dsl.attrs;
    this.status = dsl.status;
    this.rules = dsl.rules;
    this.theme = dsl.theme;
    this.type = dsl.type;
    this.commitInfoKeys = dsl.commitInfoKeys;
    this.initInfoKeys = dsl.initInfoKeys;
    if (globalInitInfoList) {
      this.globalInitInfoList = globalInitInfoList;
    }
    if (commitInfoList) {
      this.commitInfoList = commitInfoList;
    }
    this.initInfoList = [];
  }
  /**
   * 在添加到画布直接，触发校验规则
   */
  isAllowAdd(store) {
    return {
      isValid: true
    };
  }
  /**
   * 在组件被添加到画布后触发的钩子
   */
  brickAdded(store) {
  }
  /**
   * 获取自定义属性
   */
  getAttrs () {
    return JSON.parse(JSON.stringify(this.attrs));
  }
  /**
   * 获取当前组件的dsl
   */
  getDsl () {
    return {
      gid: this.gid,
      name: this.name,
      type: this.type,
      attrs: this.getAttrs(),
      status: this.status,
      rules: this.rules,
      commitInfoKeys: this.commitInfoKeys,
      initInfoKeys: this.initInfoKeys,
      theme: this.theme
    };
  }
  /**
   * 保存的时候校验组件配置完善
   */
  validateDsl (store) { 
    return {
      isValid: true
    };
  }
  /**
   * 当组件从画布删除的时候触发
   */
  beforeDelete () {
    return {
      isValid: true
    };
  }
  /**
   * 获取定义组件在执行侧，提交的时候数据格式
   */
  getCommitInfos() {
    return [];
  }
  /**
   * 获取运行时，需要从源数据中拿到的实时数据
   */
  getInitInfoList() {
    return [];
  }
  /**
   * 删除组件时额外的操作
   */
   deleteBrick(store) {}
}

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
  Richinput: 11,
}

export const EDITOR_EVENT = {
  BRICK_ADD: 'brick:add', 
  FORM_SAVE: 'form:save',
  CANVAS_BRICK_CHANGE: 'canvas:brick-change',
  CANVAS_COMB_BRICK_SELECT: 'canvas:comb-brick-select',
  CANVAS_INIT: 'canvas:init',
  SETTING_ACTIVE_BRICK: 'setting:active-brick',
  FORM_ONLOAD: 'form:onload',
  ERROR: 'error'
}

export const FORM_STATU = {
  VIEW: 0, // 前端定义，纯查看状态
  DRAFT: 1,
  APPROVE: 2,
  ADOPT: 3,
  ONLINE: 4,
}

export const FORM_STATU_NAME = {
  [FORM_STATU.VIEW]: '查看',
  [FORM_STATU.DRAFT]: '草稿',
  [FORM_STATU.APPROVE]: '审批中',
  [FORM_STATU.ADOPT]: '待上线',
  [FORM_STATU.ONLINE]: '已上线'
}

/**
 * 表单引擎对应表单类型
 */
export const FORM_TYPE = {
  PC: 1, // 人工
  ZIZHU: 2, // 自助
  IM: 3, // 机器人
  CRM: 4, // 电销
  GALAXY: 5, // 标注
  QMS: 6
}

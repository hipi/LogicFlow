import { FORM_TYPE } from "../constant/index.js";

export const robotFormBrick =[
  {
    id: '1',
    type: 'ImSelect',
    name: '机器人应答',
  },
  {
    id: '2',
    type: 'ImAnswer',
    name: '机器人应答',
  },
  {
    id: '3',
    type: 'ImConfirm',
    name: '信息确认',
  },
  {
    id: '4',
    type: 'ImFeedback',
    name: '赞踩',
  },
  {
    id: '5',
    type: 'ImLink',
    name: '链接跳转',
  },
  {
    id: '6',
    type: 'ImPopup',
    name: '浮层',
  },
  {
    id: '7',
    type: 'ImOrderList',
    name: '订单列表',
  },
  {
    id: '8',
    type: 'ImOrderDetail',
    name: '订单详情',
  },
  {
    id: '9',
    type: 'ImBill',
    name: '账单',
  },
  {
    id: '10',
    type: 'ImCouponList',
    name: '优惠券列表',
  },
  {
    id: '11',
    type: 'ImCoupon',
    name: '优惠券',
  },
  {
    id: '12',
    type: 'ImProgress',
    name: '处理进度',
  },
  {
    id: '13',
    type: 'ImPay',
    name: '支付',
  },
  {
    id: '14',
    type: 'ImBikeCardSection',
    name: '骑行卡',
  }
  // {
  //   id: '15',
  //   type: 'ImPhoneCheck',
  //   name: '手机号校验',
  // },
  // {
  //   id: '16',
  //   type: 'ImVerifyCode',
  //   name: '验证码',
  // }
];


export const pcFormBrick = [
  {
    id: '1',
    type: 'PcDesc',
    name: '纯文本',
  },
  {
    id: '2',
    type: 'PcInput',
    name: '输入框',
  },
  {
    id: '3',
    type: 'PcMultiInput',
    name: '多行输入框',
  },
  {
    id: '4',
    type: 'PcSelect',
    name: '下拉框',
  },
  {
    id: '5',
    type: 'PcRadio',
    name: '单选框',
  },
  {
    id: '6',
    type: 'PcCheckbox',
    name: '多选框',
  },
  {
    id: '7',
    type: 'PcDate',
    name: '日期选择器',
  },
  {
    id: '8',
    type: 'PcDateTime',
    name: '时间选择器',
  },
  {
    id: '9',
    type: 'PcButton',
    name: '按钮',
  },
  {
    id: '10',
    type: 'Custom',
    name: '自定义组件',
  },
  {
    id: '11',
    type: 'PcRichinput',
    name: '富文本内容',
  },
];

// 电销业务组件
export const crmFormBrick = [
  {
    id: '1',
    type: 'CrmHeader',
    name: '表头',
  },
  {
    id: '2',
    type: 'CrmIntention',
    name: '线索意向',
  },
  {
    id: '3',
    type: 'CrmCall',
    name: '预约外呼',
  }
];

// 标注业务组件
export const galaxyFormBrick = [
  {
    id: '1',
    type: 'GalaxyQuestion',
    name: '标注问题',
  },
  {
    id: '2',
    type: 'GalaxySolution',
    name: '标注QID方案',
  }
];

export const getBrick = (formType) => {
  // switch (formType) {
  //   case FORM_TYPE.PC:
  //     return pcFormBrick;
  //   case FORM_TYPE.IM:
  //     return robotFormBrick;
  //   case FORM_TYPE.CRM:
  //     return [...crmFormBrick, ...pcFormBrick];
  //   case FORM_TYPE.GALAXY:
  //     return [...galaxyFormBrick, ...pcFormBrick];
  // }
  return [
    {
      id: '2',
      type: 'Input',
      name: '输入框',
    },
    {
      id: '3',
      type: 'Checkbox',
      name: '多选框',
    },
    {
      id: '4',
      type: 'Select',
      name: '下拉选择',
    },
    {
      id: '4',
      type: 'Date',
      name: '日期时间',
    },
    {
      id: '5',
      type: 'Richinput',
      name: '富文本内容',
    },
  ]
}
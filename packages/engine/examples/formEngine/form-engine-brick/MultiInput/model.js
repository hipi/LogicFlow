import { BrickModel } from "../model";
import getUniqueId from "../utils/ID";

export class PcMultiInputModel extends BrickModel {
  constructor(dsl, globalInitInfoList, commitInfoList) {
    super(dsl, globalInitInfoList, commitInfoList);
    if (!dsl) {
      this.type = 'PcMultiInput'
      this.gid = `PcMultiInput_${getUniqueId()}`
      this.commitInfoKeys = [`${this.gid}`]
      this.name = '多行输入框' // 可提交组件需要告知当前组件的名称，用于擎天柱等系统进行可视化配置。“条件库”
      this.rules = [{
        required: true,
        message: '必填项不能为空！'
      }]
      this.attrs = {
        placeholder: '请输入内容',
        defaultValue: '', // 默认值
        label: '多行输入框' // 标题
      }
    }
  }
}


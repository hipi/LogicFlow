import { BrickModel } from "../model.js";
import getUniqueId from "../utils/ID.js";


export class PcInputModel extends BrickModel {
  constructor(dsl, globalInitInfoList, commitInfoList) {
    super(dsl, globalInitInfoList, commitInfoList);
    if (!dsl) {
      this.type = 'Input'
      this.gid = `Input_${getUniqueId()}`
      this.name = '单行输入框'
      this.initInfoKeys = []
      this.commitInfoKeys = [`${this.gid}`]
      this.rules = [{
        required: true,
        message: '必填项不能为空！'
      }]
      this.attrs = {
        placeholder: '请输入内容',
        defaultValue: '', // 默认值
        label: '输入框' // 标题
      }
    }
  }
}


import { BrickModel } from "../model.js";
import getUniqueId from "../utils/ID.js";

export class PcDateModel extends BrickModel {
  constructor(dsl, globalInitInfoList, commitInfoList) {
    super(dsl, globalInitInfoList, commitInfoList);
    if (!dsl) {
      this.type = 'PcDate'
      this.name = '日期选择器'
      this.gid = `PcDate_${getUniqueId()}`
      this.commitInfoKeys = [`${this.gid}`]
      this.rules = [{
        required: true,
        message: '请选择日期'
      }]
      this.attrs = {
        defaultValue: '',
        label: '日期选择',
        placeholder: '选择日期'
      }
    }
  }
}


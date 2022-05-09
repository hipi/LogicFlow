import { BrickModel } from "../model.js";
import getUniqueId from "../utils/ID.js";

export class PcCheckboxModel extends BrickModel {
  constructor(dsl, globalInitInfoList, commitInfoList) {
    super(dsl, globalInitInfoList, commitInfoList);
    if (!dsl) {
      this.type = 'Checkbox'
      this.gid = `Checkbox_${getUniqueId()}`
      this.commitInfoKeys = [`${this.gid}`]
      this.name = '多选框'
      this.rules = [{
        required: true,
        message: '请选择选项'
      }]
      this.attrs = {
        defaultValue: [],
        label: '多选框',
        options: [
          {
            value: '1',
            label: '备选项'
          },
          {
            value: '2',
            label: '备选项'
          }
        ],
        isCommitLabel: false,   // 是否需要提交展示字段
        infoLabelKey: ''        // 需要提交的展示字段
      }
    }
  }
}


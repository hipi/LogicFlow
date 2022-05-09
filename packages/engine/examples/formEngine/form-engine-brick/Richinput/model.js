import { BrickModel } from "../model.js";
import getUniqueId from "../utils/ID.js";


export class PcRichinputModel extends BrickModel {
  constructor(dsl, globalInitInfoList, commitInfoList) {
    super(dsl, globalInitInfoList, commitInfoList);
    if (!dsl) {
      this.type = 'Richinput'
      this.gid = `Richinput_${getUniqueId()}`
      this.name = '富文本内容'
      this.initInfoKeys = []
      this.commitInfoKeys = [`${this.gid}`]
      this.rules = []
      this.attrs = {
        defaultValue: '11', // 默认值
        label: '富文本内容' // 标题
      }
    }
  }
}


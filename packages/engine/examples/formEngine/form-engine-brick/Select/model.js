import { BrickModel } from "../model.js";
import getUniqueId from "../utils/ID.js";

export class PcSelectModel extends BrickModel {
  constructor(dsl, globalInitInfoList, commitInfoList) {
    super(dsl, globalInitInfoList, commitInfoList);
    if (!dsl) {
      this.type = 'Select'
      this.gid = `Select_${getUniqueId()}`
      this.initInfoKeys = []
      this.commitInfoKeys = [`${this.gid}`]
      this.name = '下拉框'
      this.rules = [{
        required: true,
        message: '请选择选项'
      }]
      this.attrs = {
        placeholder: '请选择',
        defaultValue: '',
        label: '下拉框',
        optionType: 1, // 选项配置，1为静态，2位动态
        options: [{
          value: '1',
          label: '选项1'
        }, {
          value: '2',
          label: '选项2'
        }],
        isCommitLabel: false,   // 是否需要提交展示字段
        infoLabelKey: '',       // 执行侧需要展示的字段
        infoCommitKeys: [],     // 执行侧需要提交的字段
        infoFilterKey: '',      // 远程搜索时模糊查询字段
        isRemoteFilter: false,  // 是否支持远程搜索
        multiple: false         // 多选
      }
    } else {
      if (globalInitInfoList.length > 0) {
        globalInitInfoList.forEach(info => {
          if (this.initInfoKeys.indexOf(info.key) !== -1) {
            this.initInfoList.push({
              ...info
            })
          }
        });
      }
    }
  }

  /**
   * 获取组件对应的info， 为了避免重复info或者添加了又被删掉的
   * 所以在提交的时候判断一下所有的info
  */
  getInitInfoList () {
    const initInfoList = []
    this.initInfoList.forEach((info) => {
      initInfoList.push(info)
    })
    return initInfoList
  }
}


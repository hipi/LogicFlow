function isBrickInModel(brickId, model) {
  if (brickId === model.gid) {
    return true;
  }
  if (model.attrs.isComb) {
    const children = model.attrs.children;
    for (let j = 0; j < children.length; j++) {
      // 如果是组合组件，则要计算规则是不是此组合组件的子组件
      if (brickId === children[j].gid) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 判断逻辑组件中的一条规则是否和某个组件model相关
 */
export const isModelCondition = (rule, model) => {
  for (let i = 0; i < rule.conditions.length; i++) {
    const condition = rule.conditions[i];
    // 如果是组合组件，则要计算规则是不是此组合组件的子组件
    const isConditonInModel = isBrickInModel(condition.conditionFeildId, model);
    if (isConditonInModel) {
      return true;
    }
  }
  for (let i = 0; i < rule.result.show.length; i++) {
    const showBrickId = rule.result.show[i];
    const isConditonInModel = isBrickInModel(showBrickId, model);
    if (isConditonInModel) {
      return true;
    }
  }
  return false;
}

/**
 * 通过配置的规则和当前所有的组件，计算默认显示的组件
 */
export const getDefaultShow = (rules = [], models) => {
  const hideFieldMap = {};
  const defaultShow = [];
  rules.forEach((rule) => {
    if (rule.result.show && rule.result.show.length > 0) {
      rule.result.show.forEach(hideField => {
        hideFieldMap[hideField] = true;
      });
    }
  });
  const options = getOptions(models, []);
  options.forEach((option) => {
    if (!hideFieldMap[option.value]) {
      defaultShow.push(option.value);
    }
  });
  return defaultShow;
}

/**
 * 将models转换为逻辑选择中的选项
 */
export const getOptions = (models, options = [], labelPrefix = '') => {
  models.forEach((model) => {
    if (model.attrs.isComb && model.attrs.children && model.attrs.children.length > 0) {
      options = getOptions(model.attrs.children, options, model.name + '_')
    } else {
      const obj = {
        label: labelPrefix + (model.attrs.label || model.name),
        value: model.gid,
        type: model.type,
        options: []
      }
      // 针对带选项的组件，逻辑控制时可以直接选择选项
      const optionTypes = ['PcRadio', 'PcCheckbox', 'PcSelect'];
      if (optionTypes.indexOf(model.type) !== -1) {
        obj.options = model.attrs.options || []
      }
      options.push(obj);
    }
  });
  return options;
}


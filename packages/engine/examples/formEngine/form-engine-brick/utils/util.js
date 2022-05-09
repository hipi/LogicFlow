import vueRender from "../render/vue-render";

/**
 * #城市_(订单维度)_123# => ${orderCity}
 */
export function hashToBraces(str, info) {
  return str.replaceAll(`#${info.name}#`, `\$\{${info.key}\}`) // 不要用正则，正则还要去处理括号
}

/**
 * 创建正则，匹配指定字符串。
 * 例如: 匹配字符串中的是否存在${city}的正则
 * @param matchStr city
 * @returns /\\$\\{\city\}\\/g
 */
export function createReg(matchStr) {
  return new RegExp(`\\$\\{${matchStr}\\}`, 'g')
}

/**
 * ${city} => #城市_(订单维度)_123#
 */
export function bracesToHash(str, info) {
  const reg = createReg(info.key)
  return str.replace(reg, `#${info.name}#`)
}

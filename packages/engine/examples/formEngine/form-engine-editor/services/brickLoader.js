/**
 * 动态加载当前表单设计器需要的组件
 * 目前先写成动态引入的形式，后面改成cdn加载
 */
// import { Input } from 'element-ui';

export default async function loadBricks(types) {
  let bricks = [];
  await Promise.all(types.map(t => loadBrick(t))).then((res) => {
    bricks = res.filter((brick) => brick !== undefined)
  });
  return bricks;
}

async function loadBrick(type) {
  let result;
  switch(type) {
    // IM业务组件
    case 'Input':
      result = await import(/* webpackChunkName: "ElInput" */ '../../form-engine-brick/Input/index.js');
      return load(result);
    case 'Checkbox':
        result = await import(/* webpackChunkName: "Checkbox" */ '../../form-engine-brick/Checkbox/index.js');
        return load(result);
    case 'Select':
      result = await import(/* webpackChunkName: "Select" */ '../../form-engine-brick/Select/index.js');
      return load(result);
    case 'Date':
      result = await import(/* webpackChunkName: "Select" */ '../../form-engine-brick/Date/index.js');
      return load(result);
    case 'Richinput':
      result = await import(/* webpackChunkName: "Select" */ '../../form-engine-brick/Richinput/index.js');
      return load(result);
    default:
      // todo: cdn加载
      console.error(`无法加载组件${type}`);
      break;
  }
}

function load (r) {
  let result;
  const Brick = r.default;
  if ({}.toString.call(Brick) === '[object Function]') {
    result = new Brick();
  } else {
    result = Brick;
  }
  return result;
}

// import { getAllComponents } from './register'
// import { VNode } from 'vue'
// import vue from 'vue';

export default function vueRender(config) {
  if (!vue) {
    throw new Error('缺少Vue对象，请提供window.Vue')
  }
  const vm = new vue({
    el: config.el,
    render: h => h(config.component, {
      props: config.props,
      on: config.on,
    })
  })
  return vm
}

export function createVueElement(props, component) {
  const el = document.createElement('div');
  // warning: 由于vue是replace渲染形式，为了保证el节点持续可以，需要新来个child节点
  const child = document.createElement('div');
  el.appendChild(child);
  vueRender({
    el: child,
    props,
    component
  });
  return el;
}

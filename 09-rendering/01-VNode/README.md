# VNode

Технически задача очень простая. Главное понимать, что такое **vnode** и render-функция. Всё решение сводится к
рендерингу параметра компонента через render-функцию.

```javascript
export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (vnodes) => (Array.isArray(vnodes) ? vnodes : [vnodes]).every((mustBeVNode) => isVNode(mustBeVNode)),
    },
  },

  render() {
    return this.vnode;
  },
};
```

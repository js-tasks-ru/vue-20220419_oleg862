# TemplateRenderer

Если бы в задаче требовалось только отрендерить шаблон, можно было бы ограничиться вызовом render-функции,
сгенерированной при компиляции шаблона, в render-функции компонента.

```javascript
export default {
  // ...
  render(...args) {
    // Рендерим шаблон в render-функцию
    const renderFunction = compile(this.template);
    // Не забываем пробросить контекст и аргументы
    return renderFunction.call(this, ...args);
  },
};
```

Компилировать шаблон при каждом рендеринге - не эффективно. Можно воспользоваться вычисляемым свойством.

```javascript
export default {
  // ...
  computed: {
    renderFunction() {
      return compile(this.template);
    },
  },

  render(...args) {
    return this.renderFunction.call(this, ...args);
  },
};
```

Но требуется, чтобы в этой функции работали не зарегистрированные компоненты из параметра `components`. Все возможности
работы с шаблоном будут, если он будет использоваться, как шаблон полноценного компонента. Для этого можно генерировать
новый компонент. Это можно также сделать в вычисляемом свойстве, чтобы не генерировать компонент лишний раз при каждом
рендеринге.

```javascript
export default {
  // ...
  computed: {
    // ...
    componentFromTemplate() {
      return defineComponent({
        name: 'TemplateRendererInternal',
        components: this.components,
        render: this.renderFunction,
      });
    },
  },

  // ...
};
```

Этот компонент можно срендерить в render-функции с помощью функции `h`.

```javascript
export default {
  // ...

  render() {
    return h(this.componentFromTemplate);
  },
};
```

Осталось передать данные из `bindings`. Это можно сделать, например, через входные параметры.

## Решение

```javascript
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    // Рендерим шаблон в render-функцию
    renderFunction() {
      return compile(this.template);
    },

    // Генерируем компонент с этой рендер функцией и зарегистрированными компонентами
    componentFromTemplate() {
      return defineComponent({
        name: 'TemplateRendererInternal',
        components: this.components,
        props: ['bindings'],
        render: this.renderFunction,
      });
    },
  },

  render() {
    // Рендерим сгенерированный компонент, передавая в него данные
    return h(this.componentFromTemplate, { bindings: this.bindings });
  },
};
```

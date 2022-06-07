# UiPaginationView

Для вывода элементов текущей страницы требуется в начале получить массив с элементами только текущей страницы. Эта часть
не сложная, можно сделать в вычисляемом свойстве.

```javascript
computed: {
  pageItems() {
    const start = (this.page - 1) * this.perPage;
    const end = this.page * this.perPage;
    return this.items.slice(start, end);
  },
},
```

Выводить каждый элемент будет пользователь компонента. Для этого требуется предоставить ему слот для каждого элемента
страницы и передать этот элемент данных через параметры слота.

```html
<slot v-for="item in pageItems" :item="item" />
```

## Решение

```html
<template>
  <div class="pagination-container">
    <slot v-for="item in pageItems" :item="item" />
  </div>
</template>

<script>
  export default {
    name: 'UiPaginationView',

    props: {
      page: {
        type: Number,
        required: true,
        validator: (value) => value > 0,
      },
      perPage: {
        type: Number,
        required: true,
        validator: (value) => value > 0,
      },
      items: {
        type: Array,
        required: true,
      },
    },

    computed: {
      pageItems() {
        const start = (this.page - 1) * this.perPage;
        const end = this.page * this.perPage;
        return this.items.slice(start, end);
      },
    },
  };
</script>
```

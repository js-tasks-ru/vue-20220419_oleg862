# PromiseWrapper

В части работы со Scoped Slots эта задача не сложнее предыдущей, сложнее только наличием уже трёх разных слотов. Однако
трудности могут возникнуть в JS части - в работе с Promise.

Требуется как-то узнать состояние переданного промиса и реагировать на его изменение. Для этого требуется добавить
промису обработчики `then` и `catch`. Это можно посчитать мутацией объекта во входном параметре, но это внутренняя часть
в JS, сами данные при этом нигде в приложении не меняются, не может возникнуть неожиданных побочных эффектов. Также в
компонент требуется добавить свойство для хранения состояния промиса, а также его результата и ошибки.

```javascript
this.promise
  .then((result) => {
    this.result = result;
    this.state = PROMISE_STATES.fulfilled;
  })
  .catch((error) => {
    this.error = error;
    this.state = PROMISE_STATES.rejected;
  });
```

Делать это требуется при инициализации компонента, а для поддержки обновления промиса - и по его отслеживанию. Всё
вместе можно сделать с `watch immediate: true`.

## Решение

```html
<template>
  <slot v-if="isFulfilled" name="fulfilled" :result="result" />
  <slot v-else-if="isRejected" name="rejected" :error="error" />
  <slot v-else name="pending" />
</template>

<script>
  const PromiseStates = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
  };

  export default {
    name: 'PromiseWrapper',

    props: {
      promise: {
        type: Promise,
        required: true,
      },
    },

    data() {
      return {
        state: PromiseStates.PENDING,
        result: undefined,
        error: undefined,
      };
    },

    computed: {
      isFulfilled() {
        return this.state === PromiseStates.FULFILLED;
      },

      isRejected() {
        return this.state === PromiseStates.REJECTED;
      },
    },

    watch: {
      promise: {
        immediate: true,
        handler() {
          this.state = PromiseStates.PENDING;
          this.result = undefined;
          this.error = undefined;
          this.promise
            .then((result) => {
              this.result = result;
              this.state = PromiseStates.FULFILLED;
            })
            .catch((error) => {
              this.error = error;
              this.state = PromiseStates.REJECTED;
            });
        },
      },
    },
  };
</script>
```

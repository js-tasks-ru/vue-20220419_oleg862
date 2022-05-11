<template>
  <div class="toasts">
    <the-toaster-item
      v-for="item in list"
      :id="item.id"
      :key="item.id"
      :cls="item.cls"
      :message="item.message"
      :icon="item.icon"
      :timeout="item.timeout"
      @remove="removeItem"
    />
  </div>
</template>

<script>
import TheToasterItem from './TheToasterItem.vue';

export default {
  name: 'TheToaster',

  components: { TheToasterItem },

  data() {
    return {
      list: [],
      nextId: 1,
    };
  },

  methods: {
    success(message) {
      this.addItem({
        cls: 'toast_success',
        icon: 'check-circle',
        message,
      });
    },

    error(message) {
      this.addItem({
        cls: 'toast_error',
        icon: 'alert-circle',
        message,
      });
    },

    addItem(config) {
      this.list.push({
        id: this.nextId++,
        ...config,
      });
    },

    removeItem(id) {
      const index = this.list.findIndex((item) => item.id === id);
      if (index !== -1) this.list.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>

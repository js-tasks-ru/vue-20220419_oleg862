<template>
  <div class="toasts">
    <ui-toaster-item
      v-for="item in list"
      :key="item.id"
      :type="item.type"
      :message="item.message"
      :timeout="item.timeout"
      @remove="removeItem(item.id)"
    />
  </div>
</template>

<script>
import UiToasterItem from './UiToasterItem.vue';

export default {
  name: 'TheToaster',

  components: { UiToasterItem },

  data() {
    return {
      list: [],
      nextId: 1,
    };
  },

  methods: {
    success(message) {
      this.addItem({
        type: 'success',
        message,
      });
    },

    error(message) {
      this.addItem({
        type: 'error',
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

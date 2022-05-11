<template>
  <div class="toast" :class="cls">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToasterItem',

  components: { UiIcon },

  props: {
    cls: String,
    message: String,
    icon: String,
    id: Number,
    timeout: {
      type: Number,
      default: 5000,
    },
  },

  emits: ['remove'],

  data() {
    return {
      timeoutId: null,
    };
  },

  mounted() {
    this.timeoutId = setTimeout(() => this.onremove(), this.timeout);
  },

  methods: {
    onremove() {
      this.timeoutId = clearTimeout(this.timeoutId);
      this.$emit('remove', this.id);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>

<template>
  <div class="toast" :class="cls">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToasterItem',

  components: { UiIcon },

  props: {
    type: String,
    message: String,
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

  computed: {
    cls() {
      return `toast_${this.type}`;
    },

    icon() {
      const icons = {
        success: 'check-circle',
        error: 'alert-circle',
      };
      return icons[this.type] || '';
    },
  },

  mounted() {
    this.timeoutId = setTimeout(() => this.onremove(), this.timeout);
  },

  methods: {
    onremove() {
      this.timeoutId = clearTimeout(this.timeoutId);
      this.$emit('remove');
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

<template>
  <ui-input :model-value="customValue" :type="type" @input="customValue = $event.target.valueAsNumber">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },
  props: {
    type: {
      type: String,
      default: 'date',
    },

    modelValue: Number,
  },

  emits: ['update:modelValue'],

  computed: {
    customValue: {
      get() {
        if (!this.modelValue) {
          return '';
        }
        const date = new Date(this.modelValue);
        const utcYear = date.getUTCFullYear();
        const utcMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const utcDay = date.getUTCDate().toString().padStart(2, '0');
        const utcHh = date.getUTCHours().toString().padStart(2, '0');
        const utcMm = date.getUTCMinutes().toString().padStart(2, '0');

        if (this.type === 'date') {
          return `${utcYear}-${utcMonth}-${utcDay}`;
        }

        if (this.type === 'time') {
          return `${utcHh}:${utcMm}`;
        }

        if (this.type === 'datetime-local') {
          return `${utcYear}-${utcMonth}-${utcDay}T${utcHh}:${utcMm}`;
        }

        return this.modelValue.toString();
      },

      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

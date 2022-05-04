import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      requred: true,
      default: 0,
    },
  },

  emits: ['update:count'],

  methods: {
    click() {
      this.$emit('update:count', this.count + 1);
    },
  },

  template: `<button type="button" @click="click">{{ count }}</button>`,
});

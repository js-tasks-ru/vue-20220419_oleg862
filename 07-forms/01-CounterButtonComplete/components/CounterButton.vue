<template>
  <button @click="onClick">{{ internalCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      internalCount: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.internalCount = newValue;
      },
    },
  },

  methods: {
    onClick() {
      this.$emit('update:count', ++this.internalCount);
    },
  },
};
</script>

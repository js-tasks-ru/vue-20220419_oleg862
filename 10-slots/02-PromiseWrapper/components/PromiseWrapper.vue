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

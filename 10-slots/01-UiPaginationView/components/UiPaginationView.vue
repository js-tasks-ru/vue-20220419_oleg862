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

<style></style>

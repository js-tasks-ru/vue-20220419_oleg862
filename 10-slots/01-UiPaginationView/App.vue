<template>
  <div class="sample container">
    <div class="pagination-buttons">
      <ui-button v-for="i in pagesCount" :key="i" :variant="page === i ? 'primary' : 'secondary'" @click="page = i">
        {{ i }}
      </ui-button>
    </div>

    <ui-pagination-view v-slot="{ item }" :items="meetups" :page="page" :per-page="perPage">
      <meetup-card :meetup="item" class="list-item" />
    </ui-pagination-view>
  </div>
</template>

<script>
import UiPaginationView from './components/UiPaginationView.vue';
import UiButton from './components/UiButton.vue';
import MeetupCard from './components/MeetupCard.vue';
import meetups from './meetups.json';

export default {
  name: 'App',

  components: { MeetupCard, UiButton, UiPaginationView },

  data() {
    return {
      page: 1,
      perPage: 2,
      meetups,
    };
  },

  computed: {
    pagesCount() {
      return Math.ceil(this.meetups.length / this.perPage);
    },
  },
};
</script>

<style scoped>
.pagination-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.list-item {
  margin: 0 0 32px 0;
}
</style>

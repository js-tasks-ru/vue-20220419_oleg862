<template>
  <div class="sample container">
    <select v-model="meetupId">
      <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
    </select>

    <promise-wrapper v-if="fetchMeetupPromise" :promise="fetchMeetupPromise">
      <template #pending>
        <ui-alert>Loading...</ui-alert>
      </template>

      <template #rejected="{ error }">
        <ui-alert>{{ error.message }}</ui-alert>
      </template>

      <template #fulfilled="{ result }">
        <meetup-card :meetup="result" />
      </template>
    </promise-wrapper>
  </div>
</template>

<script>
import MeetupCard from './components/MeetupCard.vue';
import PromiseWrapper from './components/PromiseWrapper.vue';
import UiAlert from './components/UiAlert.vue';
import { fetchMeetupById } from './meetupService.js';

export default {
  name: 'App',

  components: { UiAlert, PromiseWrapper, MeetupCard },

  data() {
    return {
      meetupId: undefined,
      fetchMeetupPromise: undefined,
    };
  },

  watch: {
    meetupId() {
      if (this.meetupId) {
        this.fetchMeetupPromise = fetchMeetupById(this.meetupId);
      }
    },
  },
};
</script>

<style></style>

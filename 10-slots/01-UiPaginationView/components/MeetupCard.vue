<template>
  <ui-card :cover="meetup.image" class="meetup-card">
    <template #header>
      {{ meetup.title }}
    </template>

    <template #default>
      <ui-badge v-if="meetup.organizing" type="success" class="meetup-card__badge">Организую</ui-badge>
      <ui-badge v-if="meetup.attending" type="primary" class="meetup-card__badge">Участвую</ui-badge>
      <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
    </template>
  </ui-card>
</template>

<script>
import UiBadge from './UiBadge.vue';
import UiCard from './UiCard.vue';
import MeetupInfo from './MeetupInfo.vue';

export default {
  name: 'MeetupCard',

  components: {
    MeetupInfo,
    UiBadge,
    UiCard,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.meetup-card {
  position: relative;
}

.meetup-card__badge {
  position: absolute;
  top: 0;
  right: 0;
}

/* meetup-info */
.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info__item {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info__item:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

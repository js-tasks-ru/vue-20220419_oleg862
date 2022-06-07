<template>
  <ul class="meetup-info">
    <li>
      <ui-icon icon="user" class="meetup-info__icon" />
      {{ organizer }}
    </li>
    <li>
      <ui-icon icon="map" class="meetup-info__icon" />
      {{ place }}
    </li>
    <li>
      <ui-icon icon="cal-lg" class="meetup-info__icon" />
      <time :datetime="ISODate">{{ formattedDate }}</time>
    </li>
  </ul>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'MeetupInfo',

  components: { UiIcon },

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },

  computed: {
    formattedDate() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    ISODate() {
      return new Date(this.date).toISOString().substr(0, 10);
    },
  },
};
</script>

<style scoped>
.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      require: true,
    },
    place: {
      type: String,
      require: true,
    },
    date: {
      type: Number,
      require: true,
    },
  },

  methods: {
    dateAttr() {
      return new Date(this.date).toJSON().split('T')[0];
    },

    dateText() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
        day: 'numeric',
        year: 'numeric',
        month: 'short',
      });
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="dateAttr()">{{ dateText() }}</time>
      </li>
    </ul>`,
});

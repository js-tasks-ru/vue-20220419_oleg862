import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      error: null,
      loading: false,
    };
  },

  watch: {
    meetupId(value) {
      this.fetchMeetup(this.meetupId);
    },
  },

  mounted() {
    this.fetchMeetup(this.meetupId);
  },

  methods: {
    async fetchMeetup(id) {
      this.meetup = null;
      this.error = null;
      if (!id) return;

      this.loading = true;

      await fetchMeetupById(id)
        .then((response) => (this.meetup = response))
        .catch((e) => (this.error = e.message));

      this.loading = false;
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view :meetup="meetup" v-if="meetup"></meetup-view>

      <ui-container v-else-if="loading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="error">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});

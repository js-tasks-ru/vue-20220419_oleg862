import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const MeetupTitle = defineComponent({
  name: 'MeetupTitle',

  data() {
    return {
      meetupId: 0,
      meetupTitle: null,
    };
  },

  watch: {
    async meetupId(value) {
      const { title } = await fetchMeetupById(value);
      this.meetupTitle = title;
    },
  },
});

const app = createApp(MeetupTitle);

app.mount('#app');

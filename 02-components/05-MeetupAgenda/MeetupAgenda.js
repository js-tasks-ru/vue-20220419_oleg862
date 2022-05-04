import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      require: true,
    },
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="item in agenda">
        <meetup-agenda-item :agenda-item="item" />
      </li>
    </ul>`,
});

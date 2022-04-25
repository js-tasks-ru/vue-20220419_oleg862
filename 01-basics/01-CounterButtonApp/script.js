import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const CounterButtonApp = defineComponent({
  name: 'CounterButtonApp',

  data() {
    return {
      counter: 0,
    };
  },
});

const app = createApp(CounterButtonApp);

app.mount('#app');

import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const VueCalculator = defineComponent({
  name: 'VueCalculator',

  data() {
    return {
      operands: {
        a: 0,
        b: 0,
      },
      operator: 'sum',
    };
  },

  computed: {
    result() {
      try {
        switch (this.operator) {
          case 'sum':
            return this.operands.a + this.operands.b;
            break;
          case 'subtract':
            return this.operands.a - this.operands.b;
            break;
          case 'multiply':
            return this.operands.a * this.operands.b;
            break;
          case 'divide':
            return this.operands.a / this.operands.b;
            break;

          default:
            throw 'Unknown operator';
        }
      } catch (e) {
        return e.message;
      }
    },
  },
});

const app = createApp(VueCalculator);

app.mount('#app');

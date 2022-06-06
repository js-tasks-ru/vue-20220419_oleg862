<script>
import { h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    childRenderer() {
      return defineComponent({
        name: 'ChildRenderer',
        components: this.components,
        template: this.template,
        props: {
          bindings: null,
        },
      });
    },
  },

  render() {
    return h(this.childRenderer, { bindings: this.bindings });
  },
};
</script>

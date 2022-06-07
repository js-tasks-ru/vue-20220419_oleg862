<script>
import { compile, defineComponent, h } from 'vue';

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
    renderFunction() {
      return compile(this.template);
    },

    componentFromTemplate() {
      return defineComponent({
        name: 'TemplateRendererInternal',
        components: this.components,
        props: ['bindings'],
        render: this.renderFunction,
      });
    },
  },

  render() {
    return h(this.componentFromTemplate, { bindings: this.bindings });
  },
};
</script>

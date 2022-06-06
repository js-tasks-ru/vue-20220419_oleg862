<template>
  <div class="sample container">
    <h2>template</h2>
    <textarea v-model="template" style="width: 100%" rows="5" />

    <h2>bindings</h2>
    <p>bindings.foo = <input v-model="foo" /></p>
    <p>bindings.bar = <input v-model="bar" /></p>

    <h2>Результат</h2>
    <template-renderer :template="template" :bindings="bindings" :components="components" />
  </div>
</template>

<script>
import { computed } from 'vue';
import TemplateRenderer from './components/TemplateRenderer.vue';
import UiAlert from './components/UiAlert.vue';

const initialTemplate = `<div>
  <p>foo = {{ bindings.foo }}</p>
  <ui-alert>UiAlert Works!</ui-alert>
  bar = <input v-model="bindings.bar.value" />
</div>`;

export default {
  name: 'App',

  components: { TemplateRenderer },

  data() {
    return {
      template: initialTemplate,
      foo: 'Foo Value',
      bar: 'Bar Value',
    };
  },

  computed: {
    bindings() {
      return {
        foo: this.foo,
        bar: computed({
          get: () => this.bar,
          set: (value) => {
            this.bar = value;
          },
        }),
      };
    },
    components() {
      return { UiAlert };
    },
  },
};
</script>

<style></style>

const { mount } = require('@vue/test-utils');
const { default: TemplateRenderer } = require(global.getSolutionPath('components/TemplateRenderer'));
const { reactive, nextTick, defineComponent, markRaw } = require('vue');

describe('rendering/TemplateRenderer', () => {
  describe('TemplateRenderer', () => {
    it('TemplateRenderer должен рендерить переданный в template HTML', async () => {
      const template = `<div>Test</div>`;
      const wrapper = mount(TemplateRenderer, { props: { template } });
      expect(wrapper.html()).toBe(template);
    });

    it('TemplateRenderer должен рендерить переданный в template Vue шаблон с текстовой интерполяцией и привязкой', async () => {
      const template = `<div :data-attr="1 + 1">{{ 'Test' }}</div>`;
      const wrapper = mount(TemplateRenderer, { props: { template } });
      expect(wrapper.html()).toBe(`<div data-attr="2">Test</div>`);
    });

    it('TemplateRenderer должен рендерить переданный в template HTML после обновления шаблона', async () => {
      const oldTemplate = `<span>Old Test</span>`;
      const template = `<div>Test</div>`;
      const wrapper = mount(TemplateRenderer, { props: { template: oldTemplate } });
      await wrapper.setProps({ template });
      expect(wrapper.html()).toBe(template);
    });

    it('TemplateRenderer должен рендерить переданный в template Vue шаблон переданным параметром bindings', async () => {
      const bindings = {
        foo: 'FOO',
        bar: 42,
      };
      const template = `<div :data-attr="bindings.foo">{{ bindings.bar }}</div>`;
      const wrapper = mount(TemplateRenderer, { props: { template, bindings } });
      expect(wrapper.html()).toBe(`<div data-attr="FOO">42</div>`);
    });

    it('TemplateRenderer должен поддерживать обновления bindings', async () => {
      const bindings = {
        foo: 'FOO',
        bar: 42,
      };
      const template = `<div :data-attr="bindings.foo">{{ bindings.bar }}</div>`;
      const wrapper = mount(TemplateRenderer, { props: { template, bindings } });
      await wrapper.setProps({
        bindings: {
          ...bindings,
          bar: 0,
        },
      });
      expect(wrapper.html()).toBe(`<div data-attr="FOO">0</div>`);
    });

    it('TemplateRenderer должен поддерживать мутации bindings', async () => {
      const bindings = reactive({
        foo: 'FOO',
        bar: 42,
      });
      const template = `<div :data-attr="bindings.foo">{{ bindings.bar }}</div>`;
      const wrapper = mount(TemplateRenderer, { props: { template, bindings } });
      bindings.bar = 0;
      await nextTick();
      expect(wrapper.html()).toBe(`<div data-attr="FOO">0</div>`);
    });

    it('TemplateRenderer должен рендерить компоненты из параметра components', async () => {
      const components = markRaw({
        SomeTestDiv: defineComponent({ name: 'TestDiv', template: '<div>TestDiv</div>' }),
      });
      const template = `<some-test-div />`;
      const wrapper = mount(TemplateRenderer, { props: { template, components } });
      expect(wrapper.html()).toBe(`<div>TestDiv</div>`);
    });
  });
});

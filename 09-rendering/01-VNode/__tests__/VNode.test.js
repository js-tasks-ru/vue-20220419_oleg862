const { mount } = require('@vue/test-utils');
const { default: VNode } = require(global.getSolutionPath('components/VNode'));
const { h } = require('vue');

describe('rendering/VNode', () => {
  describe('VNode', () => {
    it('VNode должен рендерить переданный vnode в параметре vnode', async () => {
      const vnode = h('span', { class: 'foo' }, 'bar');
      const wrapper = mount(VNode, { props: { vnode } });
      expect(wrapper.html()).toBe(`<span class="foo">bar</span>`);
    });

    it('VNode должен рендерить переданный массив vnode в параметре vnode', async () => {
      const vnode = [h('span', { class: 'foo1' }, 'bar1'), h('span', { class: 'foo2' }, 'bar2')];

      const wrapper = mount(VNode, { props: { vnode } });
      expect(wrapper.html().replace(/\n/g, '')).toBe(`<span class="foo1">bar1</span><span class="foo2">bar2</span>`);
    });
  });
});

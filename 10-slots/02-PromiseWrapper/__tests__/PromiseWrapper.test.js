import { flushPromises, mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
const PromiseWrapper = require(global.getSolutionPath('components/PromiseWrapper.vue')).default;

describe('slots/PromiseWrapper', () => {
  describe('PromiseWrapper', () => {
    let wrapper;
    let promiseMock;

    const createPromiseMock = () => {
      let doResolve;
      let doReject;
      const promise = new Promise((resolve, reject) => {
        doResolve = resolve;
        doReject = reject;
      });
      return { doResolve, doReject, promise };
    };

    beforeEach(() => {
      promiseMock = createPromiseMock();

      wrapper = mount(PromiseWrapper, {
        props: { promise: promiseMock.promise },
        slots: {
          pending: () => h('div', 'TestPending'),
          fulfilled: ({ result }) => h('div', result.text),
          rejected: ({ error }) => h('div', error.message),
        },
      });
    });

    afterEach(() => {
      promiseMock = undefined;
    });

    it('PromiseWrapper должен рендерить #pending слот, когда promise находится в состоянии pending', async () => {
      expect(wrapper.html()).toBe('<div>TestPending</div>');
    });

    it('PromiseWrapper должен рендерить #fulfilled слот с результатом промиса в параметре result, когда promise успешно завершился', async () => {
      promiseMock.doResolve({ text: 'ResolvedPromise' });
      await flushPromises();
      expect(wrapper.html()).toBe(`<div>ResolvedPromise</div>`);
    });

    it('PromiseWrapper должен рендерить #rejected слот с исключением промиса в параметре error, когда promise отклонён', async () => {
      promiseMock.doReject(new Error('RejectedPromise'));
      await flushPromises();
      expect(wrapper.html()).toBe(`<div>RejectedPromise</div>`);
    });

    it('PromiseWrapper должен рендерить #pending слот после обновления промиса в параметре promise на новый незавершённый', async () => {
      promiseMock.doResolve({});
      await flushPromises();
      promiseMock = createPromiseMock();
      await wrapper.setProps({ promise: promiseMock.promise });
      expect(wrapper.html()).toBe('<div>TestPending</div>');
    });

    it('PromiseWrapper должен рендерить #pending слот после обновления промиса в параметре promise на новый незавершённый', async () => {
      promiseMock.doResolve({});
      await flushPromises();
      await wrapper.setProps({});
      promiseMock = createPromiseMock();
      await wrapper.setProps({ promise: promiseMock.promise });
      promiseMock.doResolve({ text: 'NewPromise' });
      await flushPromises();
      expect(wrapper.html()).toBe('<div>NewPromise</div>');
    });
  });
});

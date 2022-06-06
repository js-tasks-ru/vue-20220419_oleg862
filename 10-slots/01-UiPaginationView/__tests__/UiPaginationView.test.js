import { mount } from '@vue/test-utils';
import { h } from 'vue';
const UiPaginationView = require(global.getSolutionPath('components/UiPaginationView.vue')).default;

describe('slots/UiPaginationView', () => {
  describe('UiPaginationView', () => {
    const ITEM_TAG = 'section';
    const ITEMS = [
      { key: 1, value: 'A' },
      { key: 2, value: 'B' },
      { key: 3, value: 'C' },
      { key: 4, value: 'D' },
      { key: 5, value: 'E' },
    ];
    let wrapper;

    function testPageContentWithLetterPerPage(expectedItems) {
      const items = wrapper.findAll(ITEM_TAG);
      expect(items).toHaveLength(expectedItems.length);
      expect(items.every((item, index) => item.text().includes(expectedItems[index]))).toBeTruthy();
    }

    beforeEach(() => {
      wrapper = mount(UiPaginationView, {
        propsData: {
          page: 1,
          perPage: 3,
          items: ITEMS,
        },
        slots: {
          default({ item }) {
            return h(ITEM_TAG, { key: item.key }, item.value);
          },
        },
      });
    });

    it('UiPaginationView должен выводить элементы текущей страницы', async () => {
      testPageContentWithLetterPerPage(['A', 'B', 'C']);
    });

    it('UiPaginationView должен выводить новые элементы после перехода на вторую страницу', async () => {
      await wrapper.setProps({
        page: 2,
      });
      testPageContentWithLetterPerPage(['D', 'E']);
    });

    it('UiPaginationView должен выводить элементы после смены количества элементов на странице и номер страницы', async () => {
      await wrapper.setProps({
        page: 2,
        perPage: 2,
      });
      testPageContentWithLetterPerPage(['C', 'D']);
    });

    it('UiPaginationView должен выводить элементы после обновления исходного массива данных', async () => {
      await wrapper.setProps({
        items: [
          { key: 1, value: 'a' },
          { key: 2, value: 'b' },
          { key: 3, value: 'c' },
          { key: 4, value: 'd' },
          { key: 5, value: 'e' },
          { key: 6, value: 'f' },
        ],
      });
      testPageContentWithLetterPerPage(['a', 'b', 'c']);
    });
  });
});

import { mount } from '@vue/test-utils'
import Component from '@/components/ItemsPerPageDropdown.vue'
import mock from '$/mock/itemsPerPage.mock.json'

describe('Pagination.vue', () => {
  describe('Rendering tests', () => {
    it('should render Component with default props when no props is sent', () => {
      const wrapper = mount(Component)
      expect(wrapper.contains('.v-datatable-light-items-per-page')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-items-per-page option')).toHaveLength(3)
    })

    it('should render Component with just one option on the select when `listItemsPerPage` is sent with just one item', () => {
      const wrapper = mount(Component, { propsData: mock.singleOptionList })
      expect(wrapper.contains('.v-datatable-light-items-per-page')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-items-per-page option')).toHaveLength(1)
    })

    it('should render Component with the the option with 20 values selected when `itemsPerPage` props is 20', () => {
      const wrapper = mount(Component, { propsData: mock['20Selected'] })
      expect(wrapper.contains('.v-datatable-light-items-per-page')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-items-per-page option')).toHaveLength(3)

      const selectedOption = wrapper.findAll('.v-datatable-light-items-per-page option').at(1)

      expect(selectedOption.text()).toBe('20')
      expect(selectedOption.element.selected).toBe(true)
    })

    it('should render Component with css classes when `css` props is sent', () => {
      const wrapper = mount(Component, { propsData: mock.cssStructure })
      expect(wrapper.contains('.main-select')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-items-per-page option')).toHaveLength(3)
    })
  })
  describe('Emmit tests', () => {
    it('should emmit onUpdate events returning the option value when select an option', () => {
      const wrapper = mount(Component)
      expect(wrapper.findAll('option')).toHaveLength(3)
      wrapper.findAll('option').at(1).setSelected()
      wrapper.findAll('option').at(0).setSelected()
      const emitted = wrapper.emitted()

      const expectedResult = [
        [wrapper.findAll('option').at(1).text()],
        [wrapper.findAll('option').at(0).text()]
      ]

      expect(emitted[['on-update']]).toEqual(expectedResult)
    })
  })
})

import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'
import mock from '$/mock/pagination.mock.json'

describe('Pagination.vue', () => {
  describe('Rendering tests', () => {
    it('should renders ul with 9 li elements when `totalItem` is atleast 5 times more than `itemPerPage` attribute', () => {
      const wrapper = mount(Pagination, { propsData: mock.simple })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(9)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)
    })

    it('should renders ul with 8 li elements when `totalItem` is atleast 4 times more than `itemPerPage` attribute', () => {
      const wrapper = mount(Pagination, { propsData: mock['40totalItems'] })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(8)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)
    })

    it('should renders ul with 7 li elements when `totalItem` is atleast 3 times more than `itemPerPage` attribute', () => {
      const wrapper = mount(Pagination, { propsData: mock['30totalItems'] })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(7)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)
    })

    it('should renders ul with 6 li elements when `totalItem` is atleast 2 times more than `itemPerPage` attribute', () => {
      const wrapper = mount(Pagination, { propsData: mock['20totalItems'] })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(6)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')
    })

    it('should renders ul with 6 li elements when `totalItem` one higher than `itemPerPage` limit', () => {
      const wrapper = mount(Pagination, { propsData: mock['11totalItems'] })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(6)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe(undefined)
    })

    it('should renders ul with 5 li elements when `totalItem` is equal to `itemPerPage` attribute', () => {
      const wrapper = mount(Pagination, { propsData: mock['10totalItems'] })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(5)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')
    })

    it('should renders ul with 5 li elements when `totalItem` is lower than `itemPerPage` attribute', () => {
      const wrapper = mount(Pagination, { propsData: mock['9totalItems'] })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(5)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(nextPage).toHaveLength(1)
      expect(nextPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previousPage).toHaveLength(1)
      expect(previousPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(lastPage).toHaveLength(1)
      expect(lastPage.at(0).findAll('.page-btn').at(0).attributes('disabled')).toBe('disabled')
    })

    it('should not render move-last-page element when `moveLastPage` is true', () => {
      const wrapper = mount(Pagination, { propsData: mock.moveLastPageDisable })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(8)
      expect(wrapper.contains('.v-datatable-light-pagination .move-last-page')).toBe(false)
    })

    it('should not render move-first-page element when `moveFirstPage` is true', () => {
      const wrapper = mount(Pagination, { propsData: mock.moveFirstPageDisable })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(8)
      expect(wrapper.contains('.v-datatable-light-pagination .move-first-page')).toBe(false)
    })

    it('should not render move-next-page element when `moveNextPage` is true', () => {
      const wrapper = mount(Pagination, { propsData: mock.moveNextPageDisable })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(8)
      expect(wrapper.contains('.v-datatable-light-pagination .move-next-page')).toBe(false)
    })

    it('should not render move-previous-page element when `movePreviousPage` is true', () => {
      const wrapper = mount(Pagination, { propsData: mock.movePreviousPageDisable })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(8)
      expect(wrapper.contains('.v-datatable-light-pagination .move-previous-page')).toBe(false)
    })

    it('should renders different classes for elements when `css` attribute is sent', () => {
      const wrapper = mount(Pagination, { propsData: mock.cssStructure })

      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item-test')).toHaveLength(9)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page-test')
      expect(firstPage).toHaveLength(1)
      expect(firstPage.at(0).contains('.page-btn-test')).toBe(true)

      const nextPage = wrapper.findAll('.v-datatable-light-pagination .move-next-page-test')
      expect(nextPage.at(0).contains('.page-btn-test')).toBe(true)

      const previousPage = wrapper.findAll('.v-datatable-light-pagination .move-previous-page-test')
      expect(previousPage.at(0).contains('.page-btn-test')).toBe(true)

      const lastPage = wrapper.findAll('.v-datatable-light-pagination .move-last-page-test')
      expect(lastPage.at(0).contains('.page-btn-test')).toBe(true)
    })
  })
  describe('Emmit tests', () => {
    it('should emmit onUpdate and return the page 1 when click on move-first-page', () => {
      const wrapper = mount(Pagination, { propsData: mock['60totalItemPage3'] })
      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(9)

      const firstPage = wrapper.findAll('.v-datatable-light-pagination .move-first-page')
      expect(firstPage).toHaveLength(1)

      const pageBtn = firstPage.at(0).findAll('.page-btn')
      expect(pageBtn).toHaveLength(1)

      pageBtn.trigger('click')
      const emmited = wrapper.emitted()
      expect(emmited['on-update']).toEqual([[1]])
    })

    it('should should emmit onUpdate and return the page 2 when click on move-previous-page', () => {
      const wrapper = mount(Pagination, { propsData: mock['60totalItemPage3'] })
      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(9)

      const previous = wrapper.findAll('.v-datatable-light-pagination .move-previous-page')
      expect(previous).toHaveLength(1)

      const pageBtn = previous.at(0).findAll('.page-btn')
      expect(pageBtn).toHaveLength(1)

      pageBtn.trigger('click')
      const emmited = wrapper.emitted()
      expect(emmited['on-update']).toEqual([[2]])
    })

    it('should should emmit onUpdate and return the page 4 when click on move-next-page', () => {
      const wrapper = mount(Pagination, { propsData: mock['60totalItemPage3'] })
      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(9)

      const next = wrapper.findAll('.v-datatable-light-pagination .move-next-page')
      expect(next).toHaveLength(1)

      const pageBtn = next.at(0).findAll('.page-btn')
      expect(pageBtn).toHaveLength(1)

      pageBtn.trigger('click')
      const emmited = wrapper.emitted()
      expect(emmited['on-update']).toEqual([[4]])
    })

    it('should should emmit onUpdate and return the page 5 when click on move-last-page', () => {
      const wrapper = mount(Pagination, { propsData: mock['60totalItemPage3'] })
      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(9)

      const last = wrapper.findAll('.v-datatable-light-pagination .move-last-page')
      expect(last).toHaveLength(1)

      const pageBtn = last.at(0).findAll('.page-btn')
      expect(pageBtn).toHaveLength(1)

      pageBtn.trigger('click')
      const emmited = wrapper.emitted()
      expect(emmited['on-update']).toEqual([[5]])
    })

    it('should emmit updateCurrentPage returning the new current page when props change and the current page does not exist more', () => {
      const wrapper = mount(Pagination, { propsData: mock.pageExist })
      expect(wrapper.contains('.v-datatable-light-pagination')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light-pagination .pagination-item')).toHaveLength(9)
      expect(wrapper.vm.currPage).toBe(3)
      wrapper.setProps({ itemsPerPage: 30 })

      const emmited = wrapper.emitted()
      expect(emmited['update-current-page']).toEqual([[2]])
    })
  })
})

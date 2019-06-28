import { mount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
import mock from '$/mock/datatable.mock.json'

describe('DataTable.vue', () => {
  describe('Rendering tests', () => {
    it('should renders table when minimun props are passed', () => {
      const wrapper = mount(DataTable, { propsData: mock.minimum })

      expect(wrapper.contains('.v-datatable-light')).toBe(true)
      expect(wrapper.contains('.v-datatable-light thead')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light thead tr')).toHaveLength(1)
      expect(wrapper.findAll('.v-datatable-light thead tr th')).toHaveLength(2)
      expect(wrapper.contains('.v-datatable-light tbody')).toBe(true)
      expect(wrapper.findAll('.v-datatable-light tbody tr')).toHaveLength(1)
      expect(wrapper.findAll('.v-datatable-light tbody tr td')).toHaveLength(2)
      expect(wrapper.contains('.v-datatable-light tfoot')).toBe(false)
    })

    it('should renders the arrows to sort when just one headerField sent sortable as true ', () => {
      const wrapper = mount(DataTable, { propsData: mock.sortable })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)

      const arrowWrapper = ths.at(1).find('.arrows-wrapper')
      expect(arrowWrapper.exists()).toBe(true)

      expect(arrowWrapper.contains('.arrow-up')).toBe(true)
      expect(arrowWrapper.contains('.arrow-down')).toBe(true)

      expect(ths.at(0).contains('.arrows-wrapper')).toBe(false)
    })

    it('should renders the label on th instead of name when a headerField contains a label ', () => {
      const wrapper = mount(DataTable, { propsData: mock.minimum })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      expect(ths.at(0).find('.th-wrapper').text()).toEqual(mock.minimum.headerFields[0].label)
    })

    it('should call the format function before render th content when a headerField contains a format function ', () => {
      let { headerFields, data } = mock.minimum
      const format = value => `${value}-formated`
      headerFields = headerFields.map((item, index) => index === 1 ? { ...item, format } : item)

      const wrapper = mount(DataTable, { propsData: { headerFields, data } })
      const tds = wrapper.findAll('.v-datatable-light tbody tr td')

      expect(tds).toHaveLength(2)
      expect(tds.at(1).find('.tbody-td').text()).toEqual(format(data[0].name))
    })

    it('should call the format function before render th content when a headerField contains a format function ', () => {
      let { headerFields, data } = mock.minimum
      const format = value => `${value}-formated`
      headerFields = headerFields.map((item, index) => index === 1 ? { ...item, format } : item)

      const wrapper = mount(DataTable, { propsData: { headerFields, data } })
      const tds = wrapper.findAll('.v-datatable-light tbody tr td')

      expect(tds).toHaveLength(2)
      expect(tds.at(1).find('.tbody-td').text()).toEqual(format(data[0].name))
    })

    it('should render a slot in the column in every row of tbody when the headerField contains customElement attribute ', () => {
      const customElement = '<input class="my-custom-element">'
      const wrapper = mount(
        DataTable,
        {
          propsData: mock.customElement,
          slots: { name: customElement }
        }
      )
      const tds = wrapper.findAll('.v-datatable-light tbody tr td')
      expect(tds).toHaveLength(2)
      expect(tds.at(1).find('.my-custom-element').html()).toEqual(customElement)
    })
    it('should render a slot in the column in every row of tbody when the headerField contains customHeader attribute ', () => {
      const customHeader = '<div class="my-custom-header">Foo</div>'
      const wrapper = mount(
        DataTable,
        {
          propsData: mock.customHeader,
          slots: { 'name:header': customHeader }
        }
      )
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      expect(ths.at(1).contains('.my-custom-header')).toBe(true)
    })

    it('should render a checkbox in the column in every row of tbody when the headerField contains __slot:checkbox string ', () => {
      const wrapper = mount(DataTable, {
        propsData: mock.checkboxes
      })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(4)
      expect(ths.at(3).contains('.th-wrapper-checkboxes .checkbox-header')).toBe(true)

      const tds = wrapper.findAll('.v-datatable-light tbody tr td')
      expect(tds).toHaveLength(4)
      expect(tds.at(3).contains('.checkbox')).toBe(true)
    })

    it('should render the slot actions in the column in every row of tbody when the headerField contains __slot:actions string ', () => {
      const wrapper = mount(DataTable, {
        propsData: mock.actions,
        slots: { actions: '<input type="button" class="action-button"/>' }
      })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(4)
      expect(ths.at(3).find('.thead-th').text()).toBe('')

      const tds = wrapper.findAll('.v-datatable-light tbody tr td')
      expect(tds).toHaveLength(4)
      expect(tds.at(3).contains('.action-button')).toBe(true)
    })

    it('should render the slot actions with the specified ID in the column in every row of tbody when the headerField contains __slot:actions:ActionID string ', () => {
      const wrapper = mount(DataTable, {
        propsData: mock.actionsID,
        slots: {
          actions: '<input type="button" class="action-button"/>',
          ActionID: '<a href="#" class="my-link">Link</a>'
        }
      })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(5)
      expect(ths.at(3).find('.thead-th').text()).toBe('')
      expect(ths.at(4).find('.thead-th').text()).toBe('')

      const tds = wrapper.findAll('.v-datatable-light tbody tr td')
      expect(tds).toHaveLength(5)
      expect(tds.at(3).contains('.my-link')).toBe(true)
      expect(tds.at(4).contains('.action-button')).toBe(true)
    })

    it('should render the slot spinner when the isLoading attribute is true ', () => {
      const spinner = '<div class="main-spinner"></div>'
      const wrapper = mount(DataTable, {
        propsData: mock.isLoading,
        slots: { spinner }
      })

      const td = wrapper.findAll('.v-datatable-light tbody .tbody-tr-spinner .tbody-td-spinner')
      expect(td).toHaveLength(1)
      expect(td.contains('.main-spinner')).toBe(true)
      expect(td.at(0).find('.main-spinner').html()).toBe(spinner)
    })

    it('should render the slot spinner when the isLoading attribute is true ', () => {
      const spinner = '<div class="main-spinner"></div>'
      const wrapper = mount(DataTable, {
        propsData: mock.isLoading,
        slots: { spinner }
      })

      const td = wrapper.findAll('.v-datatable-light tbody .tbody-tr-spinner .tbody-td-spinner')
      expect(td).toHaveLength(1)
      expect(td.contains('.main-spinner')).toBe(true)
      expect(td.at(0).find('.main-spinner').html()).toBe(spinner)
    })

    it('should render no sort arrow on the thead for a sortable column when the sortField attribute is has its name and sort attribute empty', () => {
      const sortField = { ...mock.sortField, sort: undefined }
      const wrapper = mount(DataTable, {
        propsData: sortField
      })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      const arrowWrapper = ths.at(1).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowWrapper).toHaveLength(1)
      expect(arrowWrapper.contains('arrow-up')).toBe(false)
      expect(arrowWrapper.contains('arrow-down')).toBe(false)
    })

    it('should only render the arrow-down element on the thead for a sortable column when the sortField attribute is has its name and sort attribute is "asc"', () => {
      const wrapper = mount(DataTable, {
        propsData: mock.sortField
      })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      const arrowWrapper = ths.at(1).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowWrapper).toHaveLength(1)
      expect(arrowWrapper.contains('.arrow-down')).toBe(true)
      expect(arrowWrapper.contains('.arrow-up')).toBe(false)
    })

    it('should only render the arrow-up element on the thead for a sortable column when the sortField attribute is has its name and sort attribute is "desc"', () => {
      const sortField = { ...mock.sortField, sort: 'desc' }
      const wrapper = mount(DataTable, {
        propsData: sortField
      })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      const arrowWrapper = ths.at(1).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowWrapper).toHaveLength(1)
      expect(arrowWrapper.contains('.arrow-down')).toBe(false)
      expect(arrowWrapper.contains('.arrow-up')).toBe(true)
    })

    it('should only render one line and column with not found message in the tbody when empty array data attribute was sent', () => {
      const wrapper = mount(DataTable, {
        propsData: mock.notFoundMsg
      })

      const tds = wrapper.findAll('.v-datatable-light tbody .not-found-tr .not-found-td')
      expect(tds).toHaveLength(1)
      expect(tds.at(0).text()).toBe(mock.notFoundMsg.notFoundMsg)
    })

    it('should renders DataTable with css class names when css attribute sent', () => {
      const wrapper = mount(DataTable, { propsData: mock.cssStructure })
      const mockedData = { ...mock.cssStructure, data: [], notFoundMsg: 'not found' }
      const wrapperNoData = mount(DataTable, { propsData: mockedData })

      expect(wrapper.contains('.v-datatable-light.table-test')).toBe(true)
      expect(wrapper.contains('.table-test .thead-test')).toBe(true)
      expect(wrapper.findAll('.table-test .thead-test .thead-tr-test')).toHaveLength(1)

      const theadTh = wrapper.findAll('.table-test .thead-test .thead-tr-test .thead-th-test')
      expect(theadTh).toHaveLength(3)
      expect(theadTh.at(0).contains('.th-wrapper-test')).toBe(true)

      const arrowsWrapper = '.th-wrapper-test .arrows-wrapper-test'
      expect(theadTh.at(1).contains(arrowsWrapper)).toBe(true)
      expect(theadTh.at(1).contains(`${arrowsWrapper} .arrow-up-test`)).toBe(true)
      expect(theadTh.at(1).contains(`${arrowsWrapper} .arrow-down-test`)).toBe(true)
      expect(theadTh.at(2).contains('.th-wrapper-checkboxes-test .checkbox-header-test')).toBe(true)

      expect(wrapper.contains('.table-test .tbody-test')).toBe(true)
      expect(wrapper.findAll('.table-test .tbody-test .tbody-tr-test')).toHaveLength(1)
      expect(wrapper.findAll('.table-test .tbody-test .tbody-tr-test .tbody-td-test')).toHaveLength(3)

      expect(wrapper.contains('.table-test .tfoot-test')).toBe(false)
      expect(wrapperNoData.contains('.table-test .tbody-test .not-found-tr-test .not-found-td-test')).toBe(true)
    })

    it('should render tbody and thead styles to fix thead and create scroll bar in the tbody when tableHeight attribute was sent', () => {
      const wrapper = mount(DataTable, {
        propsData: mock.tableHeight
      })

      const thead = wrapper.findAll('.v-datatable-light thead')
      expect(thead).toHaveLength(1)
      expect.anything(thead.at(0).attributes('style'))

      const tbody = wrapper.findAll('.v-datatable-light tbody')
      expect(tbody).toHaveLength(1)
      expect.anything(tbody.at(0).attributes('style'))
    })

    it("should render the default width column for thead's th and tbody's td when tableHeight attribute was sent and no headerFields item sent the width attribute", () => {
      const wrapper = mount(DataTable, {
        propsData: mock.tableHeightWidth
      })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      expect(ths.at(0).attributes('style')).toBe('width: 150px;')

      const tds = wrapper.findAll('.v-datatable-light tbody tr td')
      expect(tds).toHaveLength(2)
      expect(tds.at(0).attributes('style')).toBe('width: 150px;')
    })

    it("should render the width column sent on headerFields for thead's th and tbody's td when tableHeight attribute was sent and headerFields's item sent the width attribute", () => {
      const wrapper = mount(DataTable, {
        propsData: mock.tableHeightWidth
      })

      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      expect(ths.at(1).attributes('style')).toBe('width: 100px;')

      const tds = wrapper.findAll('.v-datatable-light tbody tr td')
      expect(tds).toHaveLength(2)
      expect(tds.at(1).attributes('style')).toBe('width: 100px;')
    })
  })

  describe('Internal iteractions tests', () => {
    it('should change sortedDir data when th wrapper is clicked', () => {
      const wrapper = mount(DataTable, { propsData: mock.sortable })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)

      const thWrapper = ths.at(1).find('.th-wrapper')
      expect(thWrapper.exists('.th-wrapper')).toBe(true)
      thWrapper.trigger('click')
      expect(wrapper.vm.sortedDir).toBe('desc')
      thWrapper.trigger('click')
      expect(wrapper.vm.sortedDir).toBe('asc')
    })

    it('should set itemsChecked to the data size or 0 when checkbox header is clicked', () => {
      const wrapper = mount(DataTable, { propsData: mock.checkboxes })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(4)

      const checkboxHeader = ths.at(3).find('.th-wrapper-checkboxes .checkbox-header')
      expect(checkboxHeader.exists()).toBe(true)
      checkboxHeader.trigger('click')
      expect(wrapper.vm.itemsChecked).toHaveLength(mock.checkboxes.data.length)
      checkboxHeader.trigger('click')
      expect(wrapper.vm.itemsChecked).toHaveLength(0)
    })

    it("should add item to itemsChecked array when item's checkbox is clicked", () => {
      const wrapper = mount(DataTable, { propsData: mock.checkboxesSelect })
      const trs = wrapper.findAll('.v-datatable-light tbody tr')
      expect(trs).toHaveLength(2)

      const tds1 = trs.at(0).findAll('td')
      expect(tds1).toHaveLength(4)

      const checkbox = tds1.at(3).findAll('input')
      expect(checkbox).toHaveLength(1)
      checkbox.at(0).trigger('click')

      expect(wrapper.vm.itemsChecked).toHaveLength(1)

      const tds2 = trs.at(1).findAll('td')
      expect(tds2).toHaveLength(4)

      const checkbox2 = tds2.at(3).findAll('input')
      expect(checkbox2).toHaveLength(1)
      checkbox2.at(0).trigger('click')

      expect(wrapper.vm.itemsChecked).toHaveLength(2)
    })

    it("should checkItem function use trackBy prop to keep track of items checked when item's checkbox is clicked", () => {
      const wrapper = mount(DataTable, { propsData: mock.checkboxesTrackBy })
      const trs = wrapper.findAll('.v-datatable-light tbody tr')
      expect(trs).toHaveLength(2)

      const tds1 = trs.at(0).findAll('td')
      expect(tds1).toHaveLength(4)

      const checkbox = tds1.at(3).findAll('input')
      expect(checkbox).toHaveLength(1)
      checkbox.at(0).trigger('click')

      expect(wrapper.vm.itemsChecked).toHaveLength(1)
      expect(Object.keys(wrapper.vm.itemsChecked[0])[0]).toBe(Object.keys(mock.checkboxesTrackBy.data[0])[0])
    })
  })

  describe('Emmited Events tests', () => {
    it('should emmit onUpdate event when user change order direction or order', () => {
      const wrapper = mount(DataTable, { propsData: mock.sortable })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(2)
      const thWrapper = ths.at(1).find('.th-wrapper')
      expect(thWrapper.exists('.th-wrapper')).toBe(true)
      thWrapper.trigger('click')

      const emitted = wrapper.emitted()
      expect(emitted['on-update']).toBeTruthy()
      expect(emitted['on-update']).toEqual([[{ sortField: 'name', sort: 'desc' }]])
    })

    it("should emmit onCheckAll event when user click on theader's checkbox", () => {
      const wrapper = mount(DataTable, { propsData: mock.checkboxesSelect })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(4)

      const checkboxHeader = ths.at(3).find('.th-wrapper-checkboxes .checkbox-header')
      expect(checkboxHeader.exists()).toBe(true)
      checkboxHeader.trigger('click')

      const emitted = wrapper.emitted()
      expect(emitted['on-check-all']).toBeTruthy()
      expect(emitted['on-check-all']).toEqual([[mock.checkboxesSelect.data]])
    })

    it("should emmit onCheckedItem and onUncheckedItem events when user click on tbody's checkbox to check and uncheck", () => {
      const wrapper = mount(DataTable, { propsData: mock.checkboxesSelect })
      const trs = wrapper.findAll('.v-datatable-light tbody tr')
      expect(trs).toHaveLength(2)

      const tds1 = trs.at(0).findAll('td')
      expect(tds1).toHaveLength(4)

      const checkbox = tds1.at(3).findAll('input')
      expect(checkbox).toHaveLength(1)
      checkbox.at(0).trigger('click')
      checkbox.at(0).trigger('click')

      const emitted = wrapper.emitted()
      expect(emitted['on-checked-item']).toBeTruthy()
      expect(emitted['on-checked-item']).toEqual([[mock.checkboxesSelect.data[0]]])
      expect(emitted['on-unchecked-item']).toBeTruthy()
      expect(emitted['on-unchecked-item']).toEqual([[mock.checkboxesSelect.data[0]]])
    })

    it('should exist just sorted arrow on firstName column when onlyShowOrderedArrow is true and sortedField is firstColumn', () => {
      const wrapper = mount(DataTable, { propsData: mock.onlyShowOrderedArrow })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(4)

      // returns nothing because it is not sortable
      const arrow1 = ths.at(0).findAll('.th-wrapper .arrows-wrapper')
      expect(arrow1).toHaveLength(0)

      const arrow2Wrapper = ths.at(1).findAll('.th-wrapper .arrows-wrapper')
      expect(arrow2Wrapper).toHaveLength(1)
      const arrowUp2 = arrow2Wrapper.at(0).findAll('.arrow-up')
      const arrowDown2 = arrow2Wrapper.at(0).findAll('.arrow-down')
      expect(arrowUp2).toHaveLength(1)
      expect(arrowDown2).toHaveLength(0)

      const arrowsWrapper3 = ths.at(2).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowsWrapper3).toHaveLength(1)

      const arrowUp3 = arrowsWrapper3.at(0).findAll('.arrow-up')
      const arrowDown3 = arrowsWrapper3.at(0).findAll('.arrow-down')
      expect(arrowUp3).toHaveLength(0)
      expect(arrowDown3).toHaveLength(0)

      const arrowsWrapper4 = ths.at(3).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowsWrapper4).toHaveLength(1)

      const arrowUp4 = arrowsWrapper4.at(0).findAll('.arrow-up')
      const arrowDown4 = arrowsWrapper4.at(0).findAll('.arrow-down')
      expect(arrowUp4).toHaveLength(0)
      expect(arrowDown4).toHaveLength(0)
    })

    it('should exist just sorted arrow on lastName column when onlyShowOrderedArrow is true and sortedField is lastColumn', () => {
      const wrapper = mount(DataTable, { propsData: mock.onlyShowOrderedArrowLastName })
      const ths = wrapper.findAll('.v-datatable-light thead tr th')
      expect(ths).toHaveLength(4)

      // returns nothing because it is not sortable
      const arrow1 = ths.at(0).findAll('.th-wrapper .arrows-wrapper')
      expect(arrow1).toHaveLength(0)

      const arrow2Wrapper = ths.at(1).findAll('.th-wrapper .arrows-wrapper')
      expect(arrow2Wrapper).toHaveLength(1)
      const arrowUp2 = arrow2Wrapper.at(0).findAll('.arrow-up')
      const arrowDown2 = arrow2Wrapper.at(0).findAll('.arrow-down')
      expect(arrowUp2).toHaveLength(0)
      expect(arrowDown2).toHaveLength(0)

      const arrowsWrapper3 = ths.at(2).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowsWrapper3).toHaveLength(1)

      const arrowUp3 = arrowsWrapper3.at(0).findAll('.arrow-up')
      const arrowDown3 = arrowsWrapper3.at(0).findAll('.arrow-down')
      expect(arrowUp3).toHaveLength(0)
      expect(arrowDown3).toHaveLength(1)

      const arrowsWrapper4 = ths.at(3).findAll('.th-wrapper .arrows-wrapper')
      expect(arrowsWrapper4).toHaveLength(1)

      const arrowUp4 = arrowsWrapper4.at(0).findAll('.arrow-up')
      const arrowDown4 = arrowsWrapper4.at(0).findAll('.arrow-down')
      expect(arrowUp4).toHaveLength(0)
      expect(arrowDown4).toHaveLength(0)
    })
  })
})

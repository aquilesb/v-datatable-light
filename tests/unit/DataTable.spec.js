import { mount, shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
import mock from '$/mock/datatable.mock.json'

describe('DataTable.vue', () => {
  it('should renders table when minimun props are passed', () => {
    const { headerFields, data } = mock.minimum
    const wrapper = mount(DataTable, { propsData: { headerFields, data } })

    expect(wrapper.contains('.v-datatable-light')).toBe(true)
    expect(wrapper.contains('.v-datatable-light thead')).toBe(true)
    expect(wrapper.findAll('.v-datatable-light thead tr')).toHaveLength(1)
    expect(wrapper.findAll('.v-datatable-light thead tr th')).toHaveLength(2)
    expect(wrapper.contains('.v-datatable-light tbody')).toBe(true)
    expect(wrapper.findAll('.v-datatable-light tbody tr')).toHaveLength(1)
    expect(wrapper.findAll('.v-datatable-light tbody tr td')).toHaveLength(2)
    expect(wrapper.contains('.v-datatable-light tfoot')).toBe(false)
  })

  it('should renders the arrows to sort when just one headerField send sortable as true ', () => {
    const { headerFields, data } = mock.sortable
    const wrapper = mount(DataTable, { propsData: { headerFields, data } })

    const ths = wrapper.findAll('.v-datatable-light thead tr th')
    expect(ths).toHaveLength(2)

    const arrowWrapper = ths.at(1).find('.arrows-wrapper')
    expect(arrowWrapper.exists()).toBe(true)

    expect(arrowWrapper.contains('.arrow-up')).toBe(true)
    expect(arrowWrapper.contains('.arrow-down')).toBe(true)

    expect(ths.at(0).contains('.arrows-wrapper')).toBe(false)
  })

  it('should renders the label on th instead of name when a headerField contains a label ', () => {
    const { headerFields, data } = mock.minimum
    const wrapper = mount(DataTable, { propsData: { headerFields, data } })

    const ths = wrapper.findAll('.v-datatable-light thead tr th')
    expect(ths).toHaveLength(2)
    expect(ths.at(0).find('.th-wrapper').text()).toEqual(headerFields[0].label)
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

  it('should render a slot on the column in every row of tbody when the headerField contains customElement attribute ', () => {
    const { headerFields, data } = mock.customElement
    const customElement = '<input class="my-custom-element">'
    const wrapper = shallowMount(
      DataTable,
      {
        propsData: { headerFields, data },
        slots: { name: customElement }
      }
    )
    const tds = wrapper.findAll('.v-datatable-light tbody tr td')
    expect(tds).toHaveLength(2)
    expect(tds.at(1).find('.my-custom-element').html()).toEqual(customElement)
  })
})

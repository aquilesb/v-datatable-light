<template>
  <table :class="['v-datatable-light', css.table]">
    <thead :class="css.thead" :style="theadStyle">
      <tr :class="css.theadTr">
        <th
          v-for="item in headers"
          :key="item.label"
          :class="headerItemClass(item, css.theadTh)"
          :style="getColumnWidth(item)"
          >
          <div v-if="!isFieldSpecial(item.name) && !item.customHeader" :class="css.thWrapper" @click="orderBy(item.name)">
            {{ item.label }}
            <div v-if="item.sortable" :class="arrowsWrapper(item.name, css.arrowsWrapper)">
              <div v-if="showOrderArrow(item, 'desc')" :class="css.arrowUp" />
              <div v-if="showOrderArrow(item, 'asc')" :class="css.arrowDown" />
            </div>
          </div>
          <div v-if="!isFieldSpecial(item.name) && item.customHeader" :class="css.thWrapper" @click="orderBy(item.name)">
            <slot
              v-if="item.customHeader"
              :header-data="item"
              :name="customHeaderName(item)"
            />
            <div v-if="item.sortable" :class="arrowsWrapper(item.name, css.arrowsWrapper)">
              <div v-if="showOrderArrow(item, 'desc')" :class="css.arrowUp" />
              <div v-if="showOrderArrow(item, 'asc')" :class="css.arrowDown" />
            </div>
          </div>
          <div
            v-if="isFieldSpecial(item.name) && extractArgs(item.name) === 'checkboxes'"
            :class="css.thWrapperCheckboxes"
          >
            <input
              type="checkbox"
              :class="css.checkboxHeader"
              :checked="checkedAll"
              @click="checkAll"
            >
          </div>
        </th>
      </tr>
    </thead>
    <tbody :class="css.tbody" :style="tbodyStyle">
      <template v-if="isLoading">
        <tr :class="css.tbodyTrSpinner">
          <td :colspan="headers.length" :class="css.tbodyTdSpinner">
            <slot name="spinner"/>
          </td>
        </tr>
      </template>
      <template v-else-if="data.length">
        <tr v-for="(item, index) in data" :key="index" :class="css.tbodyTr">
          <td
            v-for="key in headers"
            :key="`${index}-${key.name}`"
            :class="css.tbodyTd"
            :style="getColumnWidth(key)">
            <slot
              v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'actions'"
              :name="extractActionID(key.name)"
              :row-data="item"
              :row-index="index"
            />
            <input
              v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'checkboxes'"
              type="checkbox"
              :class="css.checkbox"
              :row-data="item"
              :row-index="index"
              :checked="checkedAll || isCheckedItem(item)"
              @click="checkItem(item, $event)"
            >
            <slot
              v-if="key.customElement"
              :row-data="item"
              :row-index="index"
              :name="customElementName(key)"
            />
            <template v-else-if="key.format">{{ key.format(item[key.name]) }}</template>
            <template v-else>{{ item[key.name] }}</template>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr :class="css.notFoundTr">
          <td :colspan="headers.length" :class="css.notFoundTd">{{ notFoundMessage }}</td>
        </tr>
      </template>
    </tbody>
    <tfoot v-if="hasSlots" :class="css.tfoot">
      <tr :class="css.tfootTr">
        <th :colspan="headers.length" :class="css.tfootTd">
          <div :class="css.footer">
            <slot name="ItemsPerPage"/>
            <slot name="pagination"/>
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>
<script>
export default {
  name: 'DataTable',
  props: {
    headerFields: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    sortField: {
      type: String,
      default: null
    },
    sort: {
      type: String,
      default: null
    },
    notFoundMsg: {
      type: String,
      default: null
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    css: {
      type: Object,
      default: () => ({
        table: '',
        thead: 'thead',
        theadTr: 'thead-tr',
        theadTh: 'thead-th',
        tbody: 'tbody',
        tbodyTr: 'tbody-tr',
        tbodyTrSpinner: 'tbody-tr-spinner',
        tbodyTd: 'tbody-td',
        tbodyTdSpinner: 'tbody-td-spinner',
        tfoot: 'tfoot',
        tfootTd: 'tfoot-td',
        tfootTr: 'tfoot-tr',
        footer: 'footer',
        thWrapper: 'th-wrapper',
        thWrapperCheckboxes: 'th-wrapper-checkboxes',
        arrowsWrapper: 'arrows-wrapper',
        arrowUp: 'arrow-up',
        arrowDown: 'arrow-down',
        checkboxHeader: 'checkbox-header',
        checkbox: 'checkbox',
        notFoundTr: 'not-found-tr',
        notFoundTd: 'not-found-td'
      })
    },
    tableHeight: {
      type: String,
      default: null
    },
    defaultColumnWidth: {
      type: String,
      default: '150px'
    },
    onlyShowOrderedArrow: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      sortedField: this.sortField,
      sortedDir: this.sort,
      notFoundMessage: this.notFoundMsg,
      loading: this.isLoading,
      checkedAll: false,
      itemsChecked: []
    }
  },

  computed: {
    hasSlots: function () {
      return (
        this.$slots.pagination !== undefined ||
        this.$slots.ItemsPerPage !== undefined
      )
    },

    headers: function () {
      if (
        this.headerFields &&
        this.headerFields.constructor === Array &&
        this.headerFields.length
      ) {
        return Object.keys(this.headerFields).map(key => {
          const field = this.headerFields[key]
          if (typeof field === 'string') {
            return { label: field, name: field }
          }
          return field
        })
      }
      return []
    },
    tbodyStyle: function () {
      if (this.tableHeight) {
        return {
          height: this.tableHeight,
          display: 'block',
          overflowX: 'auto'
        }
      }
      return null
    },
    theadStyle: function () {
      return this.tableHeight ? { display: 'block' } : null
    }
  },

  methods: {
    arrowsWrapper: function (field, className) {
      if (this.sortedField === field && this.sortedDir) {
        return `${className} centralized`
      }
      return className
    },

    updateData: function () {
      const params = {
        sortField: this.sortedField,
        sort: this.sortedDir
      }

      this.$emit('on-update', params)
    },

    orderBy: function (field) {
      if (this.isFieldSortable(field)) {
        if (this.sortedField === field) {
          this.sortedDir = this.sortedDir === 'asc' ? 'desc' : 'asc'
        } else {
          this.sortedDir = 'desc'
          this.sortedField = field
        }
        this.updateData()
      }
    },

    checkAll: function () {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll) {
        this.itemsChecked = this.data
      } else {
        this.itemsChecked = []
      }
      this.$emit('on-check-all', this.itemsChecked)
    },

    checkItem: function (item) {
      const found = this.itemsChecked.find(
        itemChecked => itemChecked[this.trackBy] === item[this.trackBy]
      )
      if (found) {
        this.itemsChecked = this.itemsChecked.filter(
          itemChecked => itemChecked[this.trackBy] !== item[this.trackBy]
        )
        this.$emit('on-unchecked-item', item)
      } else {
        this.itemsChecked = [...this.itemsChecked, item]
        this.$emit('on-checked-item', item)
      }
    },

    isCheckedItem: function (item) {
      return !!this.itemsChecked.find(
        itemChecked => itemChecked[this.trackBy] === item[this.trackBy]
      )
    },

    isFieldSortable: function (field) {
      const foundHeader = this.headerFields.find(item => item.name === field)
      return foundHeader && foundHeader.sortable
    },

    headerItemClass: function (item, className = '') {
      return item && item.sortable ? className : `${className} no-sortable`
    },

    isFieldSpecial: field => field.indexOf('__') > -1,

    extractArgs: string => string.split(':')[1],

    extractActionID: string => {
      const list = string.split(':')
      return list.length === 3 ? list[2] : 'actions'
    },

    getColumnWidth: function (item) {
      if (this.tableHeight) {
        if (item.name === '__slot:checkboxes') {
          return { width: '50px' }
        }
        return { width: item.width || this.defaultColumnWidth }
      }
    },

    customElementName: ({ customElement, name }) => typeof customElement === 'string' ? customElement : name,

    customHeaderName: ({ customHeader, name }) => typeof customHeader === 'string' ? customHeader : `${name}:header`,

    showOrderArrow: function (item, sortDir) {
      if (this.onlyShowOrderedArrow) {
        return this.sortedField === item.name && this.sortedDir !== sortDir
      }
      return (this.sortedField !== item.name) || (this.sortedField === item.name && this.sortedDir === sortDir)
    }
  }
}
</script>

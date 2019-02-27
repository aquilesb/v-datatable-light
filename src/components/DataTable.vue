<template>
  <table class="table table-bordered table-hover table-striped table-center">
    <thead>
      <tr>
        <th
          v-for="item in headers"
          :key="item.label"
          :class="headerItemClass(item)"
        >
          <div
            v-if="!isFieldSpecial(item.name)"
            class="th-wrapper"
            @click="orderBy(item.name)"
          >
            {{ item.label }}
            <div
              v-if="item.sortable"
              :class="arrowsWrapper(item.name)"
            >
              <div
                v-if="(sortedField !== item.name) || (sortedField === item.name && sortedDir === 'desc')"
                class="arrow up"
              />
              <div
                v-if="(sortedField !== item.name) || (sortedField === item.name && sortedDir === 'asc')"
                class="arrow down"
              />
            </div>
          </div>
          <div
            v-if="isFieldSpecial(item.name) && extractArgs(item.name) === 'checkboxes'"
            class="th-wrapper checkboxes"
          >
            <input
              type="checkbox"
              :checked="checkedAll"
              @click="checkAll"
            >
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="isLoading">
        <tr>
          <td :colspan="headers.length">
            <slot name="spinner" />
          </td>
        </tr>
      </template>
      <template v-else-if="data.length">
        <tr
          v-for="(item, index) in data"
          :key="index"
        >
          <td
            v-for="key in headers"
            :key="`${index}-${key.name}`"
          >
            <template v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'actions'">
              <slot
                :name="extractArgs(key.name)"
                :row-data="item"
                :row-index="index"
              />
            </template>
            <template v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'checkboxes'">
              <input
                type="checkbox"
                :row-data="item"
                :row-index="index"
                :checked="checkedAll || isCheckedItem(item)"
                @click="checkItem(item, $event)"
              >
            </template>
            <template v-else-if="key.format">
              {{ key.format(item[key.name]) }}
            </template>
            <template v-else>
              {{ item[key.name] }}
            </template>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="headers.length">
            {{ notFoundMessage }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot v-if="hasSlots">
      <tr>
        <th :colspan="headers.length">
          <div class="footer">
            <slot name="ItemsPerPage" />
            <slot name="pagination" />
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>
<style lang="scss" scoped>
.header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
  &:hover {
    color: #ed9b19;
  }
  &.no-sortable{
    cursor: default;
    &:hover {
      color: #337ab7;
    }
  }
  .th-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    font-weight: bold;
    &.checkboxes {
      justify-content: center;
    }
    .arrows-wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-between;
      &.centralized {
        justify-content: center;
      }
    }
  }
}
.arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  &.up {
    &:hover {
      border-bottom: 8px solid #ed9b19;
    }
    border-bottom: 8px solid #337ab7;
  }
  &.down {
    &:hover {
      border-top: 8px solid #ed9b19;
    }
    border-top: 8px solid #337ab7;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
</style>

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
			default: false,
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
			default: null,
		},
		trackBy: {
			type: String,
			default: 'id'
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
			return this.$slots.pagination !== undefined || this.$slots.ItemsPerPage !== undefined
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
		}
	},

	methods: {
		arrowsWrapper: function (field) {
			if (this.sortedField === field && this.sortedDir) {
				return 'arrows-wrapper centralized'
			}
			return 'arrows-wrapper'
		},

		updateData: function () {
			const params = {
				sortField: this.sortedField,
				sort: this.sortedDir
			}

			this.$emit('onUpdate', params)
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
			this.$emit('onCheckAll', this.itemsChecked)
		},

		checkItem: function (item) {
			const found = this.itemsChecked.find(itemChecked => itemChecked[this.trackBy] === item[this.trackBy])
			if (found) {
				this.itemsChecked = this.itemsChecked.filter(itemChecked => itemChecked[this.trackBy] !== item[this.trackBy])
				this.$emit('onUncheckedItem', item)
			} else {
				this.itemsChecked = [this.itemsChecked, item]
				this.$emit('onCheckedItem', item)
			}
		},

		isCheckedItem: function (item) {
			return !!this.itemsChecked.find(itemChecked => itemChecked[this.trackBy] === item[this.trackBy])
		},

    isFieldSortable: function (field) {
      const foundHeader = this.headerFields.find(item => item.name === field)
      return foundHeader && foundHeader.sortable
    },

    headerItemClass: function (item) {
      return item && item.sortable ? 'header-item' : 'header-item no-sortable'
    },

		isFieldSpecial: field => field.indexOf('__') > -1,

		extractName: string => string.split(':')[0].trim(),

		extractArgs: string => string.split(':')[1]
	}
}
</script>

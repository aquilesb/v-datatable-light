<template>
  <select
    id="v-data-table-items-per-page"
    @change="onUpdate"
  >
    <option
      v-for="item in listItemsPerPage"
      :key="item"
      :value="item"
      :selected="itemsPerPage === item"
    >
      {{ item }}
    </option>
  </select>
</template>
<style>
  #v-data-table-items-per-page {
    background-color: transparent;
    min-height: 30px;
    border: 1px solid #337ab7;
    border-radius: 5px;
    color: #337ab7;
  }
  #v-data-table-items-per-page :hover {
    cursor: pointer;
  }
</style>
<script>
export default {
	name: 'DataTableItemsDropdown',
	props: {
		listItemsPerPage: {
			type: Array,
			default: () => [10, 30, 50]
		},
		itemsPerPage: {
			type: Number,
			default: 10
		}
	},
	methods: {
		onUpdate: function (event) {
			this.$emit('onUpdate', parseInt(event.target.value, 10))
		}
	}

}
</script>

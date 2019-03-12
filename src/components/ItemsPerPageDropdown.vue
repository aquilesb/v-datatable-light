<template>
  <select
    class="v-datatable-light-items-per-page"
    :class="css.select"
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
    },
    css: {
      type: Object,
      default: () => ({
        select: ''
      })
    }
	},
	methods: {
		onUpdate: function (event) {
			this.$emit('onUpdate', parseInt(event.target.value, 10))
		}
	}

}
</script>

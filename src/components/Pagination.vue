<template>
  <ul id="v-data-table-pagination">
    <li
      v-if="moveFirstPage"
      class="pagination-item move-first-page"
    >
      <button
        :disabled="isActionDisabled('firstPage')"
        class="page-btn"
        @click="changePage(1)"
      >
        &lt;&lt;
      </button>
    </li>
    <li
      v-if="movePreviousPage"
      class="pagination-item move-previous-page"
    >
      <button
        :disabled="isActionDisabled('previousPage')"
        class="page-btn"
        @click="changePage(currPage - 1)"
      >
        &lt;
      </button>
    </li>
    <li
      v-for="pageNr in qntPages"
      :key="pageNr"
      :class="pageClass(pageNr)"
    >
      <template v-if="pageNr !== currPage">
        <button
          class="page-btn"
          @click="changePage(pageNr)"
        >
          {{ pageNr }}
        </button>
      </template>
      <template v-else>
        {{ pageNr }}
      </template>
    </li>
    <li
      v-if="moveNextPage"
      class="pagination-item move-next-page"
    >
      <button
        :disabled="isActionDisabled('nextPage')"
        class="page-btn"
        @click="changePage(currPage + 1)"
      >
        &gt;
      </button>
    </li>
    <li
      v-if="moveLastPage"
      class="pagination-item move-last-page"
    >
      <button
        :disabled="isActionDisabled('lastPage')"
        class="page-btn"
        @click="changePage(lastPage)"
      >
        &gt;&gt;
      </button>
    </li>
  </ul>
</template>
<style>
  #v-data-table-pagination {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 30px;
  }

  #v-data-table-pagination .pagination-item {
    width: 30px;
    margin-right: 5px;
    font-size: 16px;
    transition: color 0.15s ease-in-out;
  }

  #v-data-table-pagination .pagination-item.selected {
    color: #ed9b19;
  }

  #v-data-table-pagination .pagination-item .page-btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: #337ab7;
    transition: color 0.15s ease-in-out;
  }

  #v-data-table-pagination .pagination-item .page-btn:hover {
    color: #ed9b19;
  }

  #v-data-table-pagination .pagination-item .page-btn:disabled{
    cursor: not-allowed;
    box-shadow: none;
    opacity: .65;
  }
</style>
<script>
export default {
	name: 'DataTablePagination',
	props: {
		totalItems: {
			type: Number,
			required: true
		},
		itemsPerPage: {
			type: Number,
			default: 10
		},
		page: {
			type: Number,
			default: 1
		},
		moveLastPage: {
      type: Boolean,
      default: true
    },
		moveFirstPage:  {
      type: Boolean,
      default: true
    },
		moveNextPage:  {
      type: Boolean,
      default: true
    },
		movePreviousPage:  {
      type: Boolean,
      default: true
    }
	},
	data: function () {
		return {
			perPage: this.itemsPerPage,
			currPage: this.page
		}
	},
	computed: {
		qntPages: function () {
			const nrPages = this.lastPage
			if (nrPages > 4) {
				if (this.currPage <= 3) {
					return Array.apply(null, { length: 5 }).map((_, index) => index + 1)
				} else if (this.currPage + 2 >= nrPages) {
					return Array.apply(null, { length: nrPages }).map((_, index) => index + 1).slice(nrPages - 5, nrPages)
				} else {
					return Array.apply(null, { length: nrPages }).map((_, index) => index + 1).slice(this.currPage - 3, this.currPage + 2)
				}
			} else {
				return Array.apply(null, { length: nrPages }).map((_, index) => index + 1)
			}
		},
		lastPage: function () {
			return Math.ceil(this.totalItems / this.perPage)
		}
	},
	watch: {
		page: function (newPage) {
			this.currPage = newPage
		},
		itemsPerPage: function (newItemsPerPage) {
			this.perPage = newItemsPerPage
			this.checkCurrentPageExist()
		}
	},
	methods: {
		pageClass: function (currentPage) {
			return this.currPage === currentPage ? 'pagination-item selected' : 'pagination-item'
		},
		changePage: function (pageToMove) {
			if (pageToMove <= this.lastPage && pageToMove >= 1 && pageToMove !== this.currPage) {
				this.$emit('onUpdate', pageToMove)
			}
		},
		isActionDisabled: function (action) {
			switch (action) {
			case 'firstPage':
				return this.currPage === 1
			case 'previousPage':
				return this.currPage === 1
			case 'lastPage':
				return this.currPage === this.lastPage
			case 'nextPage':
				return this.currPage === this.lastPage
			}
		},
		checkCurrentPageExist: function () {
			if (this.qntPages.indexOf(this.currPage) === -1) {
				const nextPage = this.qntPages.length ? this.qntPages.length : 0
				this.$emit('updateCurrentPage', nextPage)
			}
		}
	}
}
</script>

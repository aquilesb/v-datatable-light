<template>
  <div id="app">
    <h3 class="title">v-Datatable example</h3>
    <DataTable
      :header-fields="headerFields"
      :sort-field="sortField"
      :sort="sort"
      :data="data || []"
      :is-loading="isLoading"
      :css="datatableCss"
      not-found-msg="Items not found"
      @onUpdate="dtUpdateSort"
      track-by="firstName"
      tableHeight="400px"
    >
      <input
        slot="actions"
        slot-scope="props"
        type="button"
        class="btn btn-info"
        value="Edit"
        @click="dtEditClick(props)"
      >
      <Pagination
        slot="pagination"
        :page="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        :css="paginationCss"
        @onUpdate="changePage"
        @updateCurrentPage="updateCurrentPage"
      />
      <div class="items-per-page" slot="ItemsPerPage">
        <label>Items per page</label>
        <ItemsPerPageDropdown
          :list-items-per-page="listItemsPerPage"
          :items-per-page="itemsPerPage"
          :css="itemsPerPageCss"
          @onUpdate="updateItemsPerPage"
        />
      </div>
      <Spinner slot="spinner"/>
    </DataTable>
  </div>
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .title {
  margin-bottom: 30px;
}

#app .items-per-page {
  height: 100%;
  display: flex;
  align-items: center;
  color: #337ab7;
}

#app .items-per-page label {
  margin: 0 15px;
}

/* Datatable CSS */
.v-datatable-light {
  width: 1167px;
}
.v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

.v-datatable-light .header-item:hover {
  color: #ed9b19;
}

.v-datatable-light .header-item.no-sortable{
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}

.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}

.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}

.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

.v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
}

.v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}

.v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}

.v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}

.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
/* End Datatable CSS */

/* Pagination CSS */
 .v-datatable-light-pagination {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 30px;
  }

  .v-datatable-light-pagination .pagination-item {
    width: 30px;
    margin-right: 5px;
    font-size: 16px;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item.selected {
    color: #ed9b19;
  }

  .v-datatable-light-pagination .pagination-item .page-btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: #337ab7;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:hover {
    color: #ed9b19;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:disabled{
    cursor: not-allowed;
    box-shadow: none;
    opacity: .65;
  }
  /* END PAGINATION CSS */
  
  /* ITEMS PER PAGE DROPDOWN CSS */
  .item-per-page-dropdown {
    background-color: transparent;
    min-height: 30px;
    border: 1px solid #337ab7;
    border-radius: 5px;
    color: #337ab7;
  }
  .item-per-page-dropdown:hover {
    cursor: pointer;
  }
  /* END ITEMS PER PAGE DROPDOWN CSS */
</style>

<script>
import Spinner from 'vue-simple-spinner'
import DataTable from '../src/components/DataTable.vue'
import ItemsPerPageDropdown from '../src/components/ItemsPerPageDropdown.vue'
import Pagination from '../src/components/Pagination.vue'
import orderBy from 'lodash.orderby'

const addZero = value => ("0" + value).slice(-2);

const formatDate = value => {
  if (value) {
    const dt = new Date(value);
    return `${addZero(dt.getDate())}/${addZero(
      dt.getMonth() + 1
    )}/${dt.getFullYear()}`;
  }
  return "";
};

const initialData = [
  {
    firstName: "Lucca",
    lastName: "Lin",
    hometown: "Melbourne",
    dob: "13/02/1975",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Zahid",
    lastName: "Werner",
    hometown: "Sydney",
    dob: "18/09/1979",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Gabriel",
    lastName: "Griffiths",
    hometown: "Chicago",
    dob: "25/11/1984",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Talha",
    lastName: "Tucker",
    hometown: "Berlim",
    dob: "27/01/1999",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Aariz",
    lastName: "Piper",
    hometown: "Auckland",
    dob: "11/07/1964",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Macsen",
    lastName: "Schultz",
    hometown: "Rio de Janeiro",
    dob: "01/10/1987",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Sebastian",
    lastName: "Cervantes",
    hometown: "Brisbane",
    dob: "13/11/1994",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Tayyab",
    lastName: "Lister",
    hometown: "Perth",
    dob: "14/12/1997",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Anum",
    lastName: "Warren",
    hometown: "Manaus",
    dob: "17/02/1951",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Areeba",
    lastName: "Stein",
    hometown: "Rome",
    dob: "18/03/1954",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Alesha",
    lastName: "Sharp",
    hometown: "New York City",
    dob: "18/04/1966",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Aadil",
    lastName: "Fitzgerald",
    hometown: "Vancouver",
    dob: "18/05/1967",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Amaya",
    lastName: "Dillon",
    hometown: "Montreal",
    dob: "11/06/1986",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Hammad",
    lastName: "Ruiz",
    hometown: "Buenos Aires",
    dob: "12/07/1997",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Sapphire",
    lastName: "Pacheco",
    hometown: "Mexico City",
    dob: "12/07/1996",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Amanah",
    lastName: "Velez",
    hometown: "London",
    dob: "13/08/1992",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Mirza",
    lastName: "Ratliff",
    hometown: "Manchester",
    dob: "03/09/1981",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Emre",
    lastName: "Amos",
    hometown: "Sapiranga",
    dob: "05/10/1983",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Yunus",
    lastName: "Vu",
    hometown: "Madrid",
    dob: "05/10/1984",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Duncan",
    lastName: "Cotton",
    hometown: "Barcelona",
    dob: "06/10/1985",
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    firstName: "Elvis",
    lastName: "Ray",
    hometown: "Lisbon",
    dob: "08/11/1980",
    created: new Date().getTime(),
    updated: new Date().getTime()
  }
];

export default {
  name: "app",
  components: {
    DataTable,
    ItemsPerPageDropdown,
    Pagination,
    Spinner
  },
  data: function() {
    return {
      headerFields: [
        '__slot:checkboxes',
        {
          name: "firstName",
          label: "First Name",
          width: '200px',
          sortable: true
        },
        {
          name: "lastName",
          label: "Last Name",
          sortable: true
        },
        {
          name: "hometown",
          label: "Hometown",
          sortable: true
        },
        {
          name: "dob",
          label: "Date of Birth",
          sortable: true
        },
        {
          name: "created",
          label: "Created",
          sortable: true,
          format: formatDate
        },
        {
          name: "updated",
          label: "Updated",
          sortable: false,
          format: formatDate
        },
        "__slot:actions"
      ],
      data: initialData.slice(0, 10),
      datatableCss: {
        table: 'table table-bordered table-hover table-striped table-center',
        th: 'header-item',
        thWrapper: 'th-wrapper',
        thWrapperCheckboxes: 'th-wrapper checkboxes',
        arrowsWrapper: 'arrows-wrapper',
        arrowUp: 'arrow up',
        arrowDown: 'arrow down',
        footer: 'footer'
      },
      paginationCss: {
        paginationItem: 'pagination-item',
        moveFirstPage: 'move-first-page',
        movePreviousPage: 'move-previous-page',
        moveNextPage: 'move-next-page',
        moveLastPage: 'move-last-page',
        pageBtn: 'page-btn',
      },
      itemsPerPageCss: {
        select: 'item-per-page-dropdown'
      },
      isLoading: false,
      sort: "asc",
      sortField: "firstName",
      listItemsPerPage: [5, 10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 16
    };
  },
  methods: {
    dtEditClick: props => alert("Click props:" + JSON.stringify(props)),

    dtUpdateSort: function({ sortField, sort }) {
      const sortedData = orderBy(initialData, [sortField],[sort]);
      const start = (this.currentPage -1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      this.data = sortedData.slice(start, end)
      console.log('load data based on new sort', this.currentPage)
    },

    updateItemsPerPage: function(itemsPerPage) {
      this.itemsPerPage = itemsPerPage
      if (itemsPerPage >= initialData.length) {
        this.data = initialData
      } else {
        this.data = initialData.slice(0, itemsPerPage)
      }
      console.log('load data with new items per page number', itemsPerPage)
    },

    changePage: function(currentPage) {
      this.currentPage = currentPage
      const start = (currentPage -1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      this.data = initialData.slice(start, end)
      console.log('load data for the new page', currentPage)
    },

    updateCurrentPage: function(currentPage) {
      this.currentPage = currentPage
      console.log('update current page without need to load data', currentPage)
    }
  }
};
</script>
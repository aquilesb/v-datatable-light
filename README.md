
# v-datatable
[![GitHub open issues](https://img.shields.io/github/issues/aquilesb/v-datatable.svg)](https://github.com/aquilesb/v-datatable/issues)
[![Npm version](https://img.shields.io/npm/v/v-datatable-light.svg)](https://www.npmjs.com/package/v-datatable-light)
![GitHub](https://img.shields.io/github/license/aquilesb/v-datatable.svg)

## Usage
```HTML
<DataTable
  :header-fields="headerFields"
  :data="data"
/>
```
```javascript
import { DataTable } from 'v-datatable-light'

export default {
  components: {
    DataTable
  }
}
```
## DataTable Props
| Field        | Type    | Required | default | Description                                                                                                    |
|--------------|---------|----------|---------|----------------------------------------------------------------------------------------------------------------|
| headerFields | array   | true     | null    | Definition of each column of the table. In each item of this array you will define how this column will behave |
| data         | array   | true     | null    | Array of objects that will feed the datatable                                                                  |
| isLoading    | boolean | false    | false   | Flag to indicate to datatable if the data is loading. If it is, your spinner slot will be show                 |
| sortField    | string  | false    | null    | To indicate by which field the datatable is sorted for                                                         |
| sort         | string  | false    | null    | To indicate by which direction the databale is sorted for ('asc' or 'desc')                                    |
| notFoundMsg  | string  | false    | null    | Message to by show when no data was found                                                                      |
| trackBy      | string  | false    | 'id'    | An unique id column used for checkbox column type to compare if a field is checked or not                      |


## DataTable Header Fields Props
| Name              | Required | Default | Description                                                                                                                                               |
|-------------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| name              | true     | null    | Attribute that the DataTable will try to retrieve the value from the data item.                                                                           |
| label             | true     | null    | Attribute that the DataTable will show on the header for the column.                                                                                      |
| sortable          | false    | false   | Define if that column will be sortable or not. In case the value is true, two arrows will be show on the header.                                          |
| format            | false    | null    | A function used to format a value in each line of the DataTable's body.                                                                                   |
| __slot:actions    | false    | null    | Used to create a new column to be used for buttons or any kind of action. You have to inform the slot 'actions' and it will be rendered inside each line. |
| __slot:checkboxes | false    | null    | Used to create a column with a checkbox. Every time you check or uncheck an item an event is emited.                                                      |

## Installation
```
npm install v-datatable-light
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

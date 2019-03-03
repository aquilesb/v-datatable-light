
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

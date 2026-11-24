import { NODE_KIND_ARRAY, type DataNode } from 'schema-node-core'
import { regBaseSchemaKindView } from 'schema-node-vue-view'
import { PageNode } from 'schema-node-app'

import pageTableView from './view/pageTableView.vue'
import tableFilter from './view/tableFilter.vue'

// register the app root lazy loading support for the generic schema view
import './rootLoader'

// the pageable array node uses the page table view
regBaseSchemaKindView(NODE_KIND_ARRAY, undefined, (node: DataNode) => {
  if (node instanceof PageNode) return pageTableView
  return undefined
})

export { pageTableView, tableFilter }

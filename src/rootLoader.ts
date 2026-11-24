import type { DataNode, IValueAccess, PropertyCtor } from 'schema-node-core'
import { AppNode, Loaded } from 'schema-node-app'
import { regRootNodeLoader, type IRootNodeLoader } from 'schema-node-vue-view'

/**
 * The root node loader for app level nodes.
 * Fields owned by an AppNode are loaded lazy by the app layer, so the generic
 * schema view delegates the loaded state handling to this loader.
 */
const appRootNodeLoader: IRootNodeLoader = {
  match: (node: DataNode) => node.parent instanceof AppNode,
  isLoaded: (node: DataNode) => node.getPropertyValue<boolean>(Loaded) ?? false,
  load: async (node: DataNode) => {
    await (node.parent as AppNode).reload([node], true)
  },
  subscribe: (node: DataNode, handler: (loaded: boolean) => void) =>
    node.subscribeProperty(
      Loaded,
      (_owner: IValueAccess, _propCtor: PropertyCtor, newValue: unknown) => handler(!!newValue),
      true,
    ),
}

regRootNodeLoader(appRootNodeLoader)

export { appRootNodeLoader }

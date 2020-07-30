export default {
  getTagList(state)
  {
    return state.app.content.tagList
  },
  getBreadcrumbItems(state)
  {
    return state.app.content.breadcrumbItems
  },
  getCollapsed(state)
  {
    return state.app.leftMenu.isCollapsed
  },
  getAppName(state)
  {
    return state.app.appName
  },
  getUser(state)
  {
    return state.user
  }
}
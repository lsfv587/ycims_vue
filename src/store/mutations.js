export default {
  setLayoutShow(state,palyload)
  {
    state.app.isShowLogo = palyload.isShowLogo ;
    state.app.isShowBreadcrumb = palyload.isShowBreadcrumb ;
    state.app.isShowContentTag = palyload.isShowContentTag ;
  },
  leftMenuCollapsed(state)
  {
    state.app.leftMenu.isCollapsed = !state.app.leftMenu.isCollapsed;
  },
  setAppTagList(state,tagList){
    state.app.content.tagList = tagList;
  },
  setAppBreadcrumb(state,items)
  {
    state.app.content.breadcrumbItems = items
  },
  setUser(state,user)
  {
    state.user.token = user.token;
    state.user.username = user.username;
    state.user.menus = user.menus;
  }
}
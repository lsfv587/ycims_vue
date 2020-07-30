import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from "./getters";
import mutations from "./mutations";

const state =  {
  app:{
    appName:"后台管理系统",
    isShowLogo:false,
    isShowBreadcrumb:false,
    isShowContentTag:true,
    leftMenu:{
      isCollapsed: false
    },
    content:{
      tagList:[],
      breadcrumbItems:[]
    }
  },
  user:{
    username:"admin",
    user_icon:require("@/assets/img/img.jpg"),
    token:'',
    routes:[],
    menus:[]
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations
})

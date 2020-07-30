
 const layout = () => import('./layout')
 const home = () => import('./home')
 const system_user = () => import('./system/user')
 const system_role = () => import('./system/role')
 const system_menu = () => import('./system/menu')
 const fjop_optimization = () => import('./fjop/optimization')
const no_find = () =>import('./404')
 export  default {
  layout,
   home,
   system_menu,
   system_role,
   system_user,
  fjop_optimization,
   no_find
 }


import auth from './auth'
import router from "../router";

export  default {
  //重新刷新页面,重新加载用户信息到store
  reloadPage : () => {
    if (auth.isLogin()){
      let user = {
        token:sessionStorage.getItem("token"),
        username:sessionStorage.getItem("username"),
        routes:JSON.parse(sessionStorage.getItem("routes")),
        menus: JSON.parse(sessionStorage.getItem("menus"))
      }
      auth.saveUserInfo(user);
      auth.addRoutes(user.routes);
      auth.addTag();
    }
    else{
      router.replace('/login');
    }
  },
  //路由守卫
  routerGuard : () =>{
    router.beforeEach((to,from,next) => {
      if (auth.isLogin())
      {
        if (to.path === "/login")
        {
          next('/home')
        }
        else{
          next()
        }
      }
      else{
        if (to.path === "/login")
          next()
        else
          next('/login');
      }
    })
  }
}
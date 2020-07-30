import generaRouter from "./generaRouter";
import {request} from '../network/request'
import router from '../router/index'
import {resetRouter} from '../router/index'
import store from '../store/index'

const auth = {
  //判断用户是否登入
  isLogin : () => {
    let token = sessionStorage.getItem("token");
    if (token)
    {
      return true;
    }
    else {
      return false;
    }
  },
//用户登入验证
  login : loginInfo =>{
    return new Promise((resolve,reject) =>{
      request({
        config: {
          url:"/login/login",
          method: "post",
          xhrFields: {
            withCredentials: true
          },
          responseType:'json',
          data: loginInfo
        }
      }).then( res =>{
        if (res.code === 200){
          let user = {
            token:res.data.token,
            username:loginInfo.userName,
            routes:res.data.routes,
            menus:res.data.menus,
          }
          auth.saveUserInfo(user);
          auth.addRoutes(user.routes);
          router.replace('/home');
          resolve()
        }else {
          reject({message:"登入失败,原因：" + res.message,type:"error"})
        }
      }).catch(error =>{
        reject({message:"系统繁忙，请稍后再试！",type:"error"})
      })
    })
  },
  //用户退出登入
  logout : () =>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("routes")
    sessionStorage.removeItem("menus")
    resetRouter();
    router.replace('/login');
  },
//保存用户信息
   saveUserInfo : (user) =>{
    //将用户信息保存到session和store中
    sessionStorage.setItem("token",user.token);
    sessionStorage.setItem("username",user.username);
    sessionStorage.setItem("routes",JSON.stringify(user.routes));
    sessionStorage.setItem("menus",JSON.stringify(user.menus));
    store.commit("setUser",user);
  },
  //刷新页面时，标签组件添加固定首页项
  addTag: () =>{
    let tags = [];
    tags.push({
      title: "首页",
      path: "/home",
      fixed: true
    })
    store.commit("setAppTagList",tags);
  },
//动态添加路由
  addRoutes : rs =>{
    //添加404页面
    rs.push({
      name:'404',
      path:'*',
      component:"no_find"
    });
    let routes = [];
    generaRouter(routes,rs);
    router.addRoutes(routes);
  }
}

export default  auth

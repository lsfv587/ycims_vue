// 路由配置表
import Components from '@/views/pages.js'

export default (routers, data) => {
  generaRouter(routers, data);
};
//根据后端传过来的路由信息转换成 vue 的路由对象
function generaRouter(routers, data){
  if(data && data.length > 0) {
    data.forEach((item) => {
      let menu = Object.assign({}, item);
      menu.component = Components[menu.component];
      if(item.children){
        menu.children = [];
        generaRouter(menu.children,item.children);
      }
      routers.push(menu);
    });
  }
};
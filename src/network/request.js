import axios from 'axios'

const request = parm =>{
  //创建axois请求对象
  let instance = axios.create({
     baseURL:'http://localhost:8080/jqyc/',
     // baseURL:'http://localhost:90/',
     timeout: 10000
  });
  //允许跨域携带cookie
  instance.defaults.withCredentials = true;
  //添加请求拦截,在请求头中加入token
  instance.interceptors.request.use(
      config=>{
        let token = window.sessionStorage.getItem("token");
        if (token != undefined || token != null)
        {
          config.headers.Authorization = token;
        }
        return config;
      },
      error =>{
        return Promise.reject(error);
      }
  );
  //设置返回拦截,去掉多余的数据
  instance.interceptors.response.use(
      response =>{
        return response.data;
      },
      error => {
        return Promise.reject(error)
      }
  )
  return  instance(parm.config);
;
}

export {
  request
}
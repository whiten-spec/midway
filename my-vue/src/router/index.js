import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from '../components/login/Login'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router)
Vue.use(ElementUI)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloLogin',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    // 如果需要就执行下面的代码
    // let num = sessionStorage.getItem('isLogin')
    // 调整登录判断为token
    let token = localStorage.getItem('token')
    // 通过sessionStorage 获取当前的isLogin的值 将我们保存的isLogin的值赋给num,num是顺便取的名称，可以换
    // 我们在登录界面，我们使用请求，请求成功后，我们就使用sessionStorage为‘isLogin’保存一个值  1，如果请求失败，就不保存‘isLogin’的值
    // 如果请求成功，num的值就是1，请求失败就是null，所以下面进行判断
    if (token && token.split('.').length === 3) {
      // 如果登录了，就直接跳转到该路由
      next()
    } else {
      next({
        path: '/login'// 返回登录界面
        // query: {redirect: to.fullPath}
      })
    }
  } else {
    // 如果不需要登录权限就直接跳转到该路由
    next()
  }
})

export default router

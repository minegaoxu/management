import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '../views/Home.vue'
import login from '../views/Login.vue'
// import { Form } from 'element-ui'
import { aging } from '@/api/apis'
Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      // 懒加载, 当hash值被匹配成功时,才会动态加载此页面
      component: () => import('../views/Home'),
      // 子路由
      children: [
        // 首页
        {
          path: '/home/index',
          name: '/home/index',
          component: () => import('../views/homes/Index'),
          meta:{bread:['后台首页']}
        },
        // 商品管理-添加商品
        {
          path: '/home/addprod',
          name: '/home/addprod',
          component: () => import('../views/homes/Addprod'),
          meta:{bread:['订单管理']}
        },
        // 店铺管理
        {
          path: '/home/store',
          name: '/home/store',
          component: () => import('../views/homes/Store'),
          meta:{bread:['店铺管理']}
        },
        // 商品统计
        {
          path: '/home/stati',
          name: '/home/stati',
          component: () => import('../views/homes/Stati'),
          meta:{bread:['销售统计','商品统计']}
        },
        // 商品列表
        {
          path: '/home/prodlist',
          name: '/home/prodlist',
          component: () => import('../views/homes/Prodlist'),
          meta:{bread:['商品管理','商品列表']}
        },
        // 订单管理
        {
          path: '/home/manage',
          name: '/home/manage',
          component: () => import('../views/homes/Manage'),
          meta:{bread:['订单管理']}
        },
        // 商品分类
        {
          path: '/home/goods',
          name: '/home/goods',
          component: () => import('../views/homes/Goods'),
          meta:{bread:['商品管理','商品分类']}
        },
        // 修改密码
        {
          path: '/home/change',
          name: '/home/change',
          component: () => import('../views/homes/Change'),
          meta:{bread:['账号管理','修改密码']}
        },
        // 添加账号
        {
          path: '/home/addaccount',
          name: '/home/addaccount',
          component: () => import('../views/homes/Addaccount'),
          meta:{bread:['账号管理','添加账号']}
        },
        // 账号列表
        {
          path: '/home/account',
          name: '/home/account',
          component: () => import('../views/homes/Account'),
          meta:{bread:['账号管理','账号列表']}
        },
        // 订单统计
        {
          path: '/home/order',
          name: '/home/order',
          component: () => import('../views/homes/Order'),
          meta:{bread:['销售统计','订单统计']}
        },
        // 个人中心
        {
          path: '/home/center',
          name: '/home/center',
          component: () => import('../views/homes/Center'),
          meta:{bread:['账号管理','个人中心']}
        }
      ]
    }
  ]
})
// z设置路由拦截
router.beforeEach((to, form, next) => {
  // 来自哪里
  
  // 验证
  if (to.path != '/') {
    // 调用token
    aging(localStorage.token).then(res => {
      if (res.data.code == 0) {
        next()  //正常跳转
      } else {
        next('/') //跳转到登录页面
      }
    })
  } else {
    //正常跳转
    next()
  }
})

export default router


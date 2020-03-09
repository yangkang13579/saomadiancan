import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routes = [
  {
    path: '/CodePay',
    name: 'CodePay',
    component: () => import('../pages/CodePay/CodePay.vue'),
    meta: {
      title: '扫码支付',
      keepAlive: false
    }
  },
  {
    path: '/Successful',
    name: 'Successful',
    component: () => import('../pages/CodePay/Successful.vue'),
    meta: {
      title: '授权成功'
    }
  },
  {
    path: '/PayEmpty',
    name: 'PayEmpty',
    component: () => import('../pages/CodePay/PayEmpty.vue'),
    meta: {
      title: '正在跳转'
    }
  },
  {
    path: '/txSuccessful',
    name: 'txSuccessful',
    component: () => import('../pages/CodePay/txSuccessful.vue'),
    meta: {
      title: '提现成功'
    }
  },
  {
    path: '/payOrder',
    name: 'payOrder',
    component: () => import('../pages/CodePay/payOrder.vue'),
    meta: {
      title: '支付订单'
    }
  },
  {
    path: '/',
    name: 'ImpowerOrder',
    component: () => import('../pages/CodeOrder/ImpowerOrder.vue'),
    meta: {
      title: '正在跳转'
    }
  },
  {
    path: '/ImpowerOrder',
    name: 'ImpowerOrder',
    component: () => import('../pages/CodeOrder/ImpowerOrder.vue'),
    meta: {
      title: '正在跳转'
    }
  },
  // {
  //   path: '/',
  //   name: 'orderIndex',
  //   component: () => import('../pages/CodeOrder/orderIndex.vue'),
  //   meta: {
  //     title: '点餐首页'
  //   }
  // },
  {
    path: '/orderIndex',
    name: 'orderIndex',
    component: () => import('../pages/CodeOrder/orderIndex.vue'),
    meta: {
      title: '点餐首页'
    }
  },
  {
    path: '/produitDetail',
    name: 'produitDetail',
    component: () => import('../pages/CodeOrder/produitDetail.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/leadCoupons',
    name: 'leadCoupons',
    component: () => import('../pages/CodeOrder/leadCoupons.vue'),
    meta: {
      title: '领取优惠卷'
    }
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: () => import('../pages/CodeOrder/confirmOrder.vue'),
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/StartingPoin',
    name: 'StartingPoin',
    component: () => import('../pages/CodeOrder/StartingPoin.vue'),
    meta: {
      title: '开始点餐'
    }
  },
  {
    path: '/remark',
    name: 'remark',
    component: () => import('../pages/CodeOrder/remark.vue'),
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/advance',
    name: 'advance',
    component: () => import('../pages/CodeOrder/advance.vue'),
    meta: {
      title: '预订单'
    }
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: () => import('../pages/CodeOrder/orderDetails.vue'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('../pages/CodeOrder/paySuccess.vue'),
    meta: {
      title: '支付订单'
    }
  },
  {
    path: '/orderHistory',
    name: 'orderHistory',
    component: () => import('../pages/CodeOrder/orderHistory.vue'),
    meta: {
      title: '历史订单'
    }
  },
  {
    path: '/historyDetail',
    name: 'historyDetail',
    component: () => import('../pages/CodeOrder/historyDetail.vue'),
    meta: {
      title: '历史订单详情'
    }
  },
  {
    path: '/historyEvaluate',
    name: 'historyEvaluate',
    component: () => import('../pages/CodeOrder/historyEvaluate.vue'),
    meta: {
      title: '历史评价'
    }
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../pages/CodeOrder/evaluate.vue'),
    meta: {
      title: '发表评价'
    }
  },
  {
    path: '/useCoupon',
    name: 'useCoupon',
    component: () => import('../pages/CodeOrder/useCoupon.vue'),
    meta: {
      title: '优惠券'
    }
  },
]
// 创建路由实例
const router = new Router({
  routes,
  linkActiveClass: 'u-link--Active'
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  window.scrollTo(0, 0)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router

// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
// export function modifyAName({commit}, name) { // commit 提交；name即为点击后传递过来的参数，此时是 'A餐馆'
//     return commit ('modifyAName', name)
// }
// export function modifyBName({commit}, name) {
//     return commit ('modifyBName', name)
// }

// export function setLogin ({commit}, name) {
//     return commit('SET_LOGIN', name);
//   }

//   export function userStion ({commit}, name) {
//     return commit('SET_USER', name);
//   }
 //扫码点餐下单备注
  export function setRemark ({commit}, name) {
    return commit('SET_REMARK', name);
  }
//扫码点餐滚动抽奖文字
  export function setHot ({commit}, name) {
    return commit('SET_HOT', name);
  }
  //扫码点餐滚动抽奖文字
  export function setisdraw ({commit}, name) {
    return commit('SET_ISDRAW', name);
  }
// ES6精简写法
// export const modifyAName = ({commit},name) => commit('modifyAName', name)


// 提交 mutations是更改Vuex状态的唯一合法方法
// export const modifyAName = (state, name) => { // A组件点击更改餐馆名称为 A餐馆
//   state.resturantName = name // 把方法传递过来的参数，赋值给state中的resturantName
// }
// export const modifyBName = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
//   state.resturantName = name
// }

// export const SET_LOGIN = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
//   state.username = name
// }

// export const SET_USER = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
//   state.user = name
// }

export const SET_REMARK = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
  state.text = name
}

export const SET_HOT = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
  state.hot = name
}

export const SET_ISDRAW = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
  state.isdraw = name
}
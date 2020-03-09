<template>
  <div>提现成功</div>
</template>

<script>
import { api } from '../../components/js/api';
export default {
  data () {
    return {
      token: 0,
      money: 0,
      auth_code: 0
    }
  },
  created () {
    alert(window.location.href)
    let obj = this.$GetRequest()
    // let auth_code = obj.auth_code
    // let state = obj.state
    alert(JSON.stringify(obj))
    this.token = obj.token
    this.money = obj.money
    this.auth_code = obj.auth_code

    let data1 = this.$reData(
      { code: this.auth_code, token: this.token },
      'user.login/alipay_user_info_share'
    )
    // 授权
    api(data1).then(json => {
      if (json.code === 10001) {
        alert('授权成功', json.responseData.token)
        let data2 = this.$reData(
          { type: 'ali', money: this.money },
          'user.account/destoon_finance_cash',
          this.token
        )
        // 授权成功提现
        api(data2).then(json => {
          if (json.code === 10001) {
            alert(json.msg, 'tx')
          } else {
            alert(json.msg, 'txsb')
          }
        })
      } else {
        alert(json.msg, 'sqsb')
      }
    })
  },
  methods: {
    shouquan () {},
    tixian () {}
  }
}
</script>

<style>
</style>

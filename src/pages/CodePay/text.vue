<template>
  <div>
    <button id="result" class="btn tradenoPay">支付</button>
  </div>
</template>

<script>
import $ from 'jquery';
import wx from 'weixin-js-sdk';
import { api } from '../../components/js/api.js';
export default {
  data () {
    return {}
  },
  created () {
    // 页面载入完成后即唤起收银台
    // 此处${tradeNO}为模板语言语法，实际调用样例类似为tradePpay("2016072621001004200000000752")
    this.tradePay('2019090622001437870568655134')
  },
  mounted () {},
  methods: {
    log (obj) {
      $('#result')
        .append(obj)
        .append(' ')
        .append('<br />')
    },
    ready () {
      // 通过传入交易号唤起快捷调用方式(注意tradeNO大小写严格)
      $(document).AlipayJSBridge.call(
        'tradePay',
        {
          tradeNO: '2019090622001437870568655134'
        },
        function (data) {
          this.log(JSON.stringify(data))
          if ('9000' == data.resultCode) {
            this.log('支付成功')
          }
        }
      )
    },
    tradePay () {
      this.ready()
    }
  }
}
</script>

<style scoped >
button {
  display: block;
  margin: auto;
  padding: 0.5rem;
  font-size: 0.25rem;
  background: red;
}
</style>

<template>
  <!-- 跳转中间页,负责微信和支付宝授权登录 -->
  <div style="font-size:0.32rem"></div>
</template>

<script>
  import wx from 'weixin-js-sdk';

  var u = navigator.userAgent,
    app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  export default {
    data() {
      return {
        token: '',
        qrcodetoken: '',
        ins_user_id: 0,
        qrcode_no: 0,
        get_url: '',
        get_url1: '',
        get_url2: ''
      }
    },
    created() {
      // this.qrcodetoken = this.GetRequest().qrcodetoken
      //  toLowerCase() 来把字符串转换成小写。
      var ua = window.navigator.userAgent.toLowerCase()

      console.log(ua)
      // 判断是不是微信
      let token = this.$GetRequest().token
      let money = this.$GetRequest().money
      let state = this.$GetRequest().state

      this.ins_user_id = this.$GetRequest().ins_user_id || 0
      this.qrcode_no = this.$GetRequest().qrcode || 0
      this.get_url = encodeURIComponent(
        this.$url +
        '/#/Codepay?ins_user_id=' +
        this.ins_user_id +
        '&qrcode_no=' +
        this.qrcode_no
      )
      this.get_url1 = encodeURIComponent(this.$url + '/#/Codepay')
      this.get_url2 = encodeURIComponent(this.$url + '/#/txSuccessful')
      // alert(token, money, state)
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          this.$appid +
          '&redirect_uri=' +
          this.get_url +
          '&response_type=code&scope=snsapi_userinfo&state=wx#wechat_redirect';
        // let host = window.location.host
        // window.location.href = 'http://'+host+'/#/Codepay?qrcodetoken='+this.qrcodetoken
      }
      // 判断是不是支付宝
      else if (ua.match(/AlipayClient/i) == 'alipayclient') {
        if (state == 'tx') {
          window.location.href =
            'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' +
            this.$zfbappid +
            '&scope=auth_user&redirect_uri=' +
            this.get_url2 +
            '&state=tx&token=' +
            token +
            '&money=' +
            money
        } 
        else {
          // let str =
          //   'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' +
          //   this.$zfbappid +
          //   '&scope=auth_user&redirect_uri=' +
          //   this.get_url1 +
          //   '&state=zfb&ins_user_id=' +
          //   this.ins_user_id +
          //   '&qrcode_no=' +
          //   this.qrcode_no
          // alert(str)
          window.location.href =
            'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' +
            this.$zfbappid +
            '&scope=auth_user&redirect_uri=' +
            this.get_url1 +
            '&state=zfb&ins_user_id=' +
            this.ins_user_id +
            '&qrcode_no=' +
            this.qrcode_no
        }
        // 调取接口拿appid
        // window.location.href = 'http://'+host+'/#/Codepay?qrcodetoken='+this.qrcodetoken
      } else {
        if (isAndroid) {
          this.token = bridge.getToken()
          let host = window.location.host
          let url =
            'http://' +
            host +
            '/#/Codepay?qrcodetoken=' +
            this.qrcodetoken +
            '&token=' +
            this.token
          bridge.jumpToExternalBrowser(url)
        } else if (isIOS) {
          window.gettoken = this.gettoken
          let host = window.location.host
          let url =
            'http://' +
            host +
            '/#/Codepay?qrcodetoken=' +
            this.qrcodetoken +
            '&token=' +
            this.token
          window.webkit.messageHandlers.url.postMessage(url)
        }

        if (this.token) {
        }
      }
    },
    mounted() {
      window.gettoken = this.gettoken
    },
    methods: {
      weixinLog() {
        const appId = '123456';
        const code = '555555';
      },
      // 路由参数截取
      GetRequest() {
        var url = location.href
        var theRequest = new Object()
        var index = url.indexOf('?')
        if (url.indexOf('?') != -1) {
          var str = url.substr(index + 1)
          var strs = str.split('&')
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
          }
        }
        console.log(theRequest)
        return theRequest
      },
      // 供ios获取token
      gettoken(num) {
        alert(num)
        this.token = num
        // alert(this.tokens)
      }
    }
  }
</script>

<style>
</style>
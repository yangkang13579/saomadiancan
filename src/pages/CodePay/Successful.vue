<template>
  <!-- 授权成为商户页 -->
  <div>
    <p v-if="success">授权成功</p>
    <p v-if="begin">正在请求授权</p>
    <div :class="showTips?'tips':'Tips'">{{tipsConetent}}</div>
  </div>
</template>

<script>
import { api } from "../../components/js/api";

// import { fail } from 'assert'
export default {
  data() {
    return {
      success: false,
      begin: true,
      showTips: false, // 展示提示框
      tipsConetent: "", // 提示框内容,
      url: ""
    };
  },
  created() {
    var ua = window.navigator.userAgent.toLowerCase();
    // alert(window.location.href.indexOf('app_auth_code'))
    // this.url = this.$url + '/#/Successful';
    this.url = encodeURIComponent(this.$url + "/#/Successful");
    if (ua.match(/AlipayClient/i) == "alipayclient") {
      if (window.location.href.indexOf("app_auth_code") == -1) {
        let insId = this.$GetRequest().ins_id;
        let zfbpay = this.$reData(
          { type: 2 },
          "order.pay/get_ali_or_wx_config",
          ""
        );
        api(zfbpay).then(json => {
          if (json.code == 10001) {
            let appid = json.responseData.appid;

            window.location.href =
              "https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=" +
              appid +
              "&redirect_uri=" +
              this.url +
              "?ins_id=" +
              insId;
          } else {
            // alert(json.msg)
            this.showTipsFn(json.msg);
          }
        });
      } else {
        this.success = true;
        this.begin = false;
        let app_auth_code = this.$GetRequest().app_auth_code;
        let insId = this.$GetRequest().ins_id;
        // alert(app_auth_code)
        let zfpay = this.$reData(
          { ins_id: insId, app_auth_code: app_auth_code },
          "order.pay/ali_third_auth",
          ""
        );
        api(zfpay).then(json => {
          // alert(json.msg)
          this.showTipsFn(json.msg);
          // alert(app_auth_code)
        });
      }
    }
  },
  methods: {
    // 自制消息提示
    showTipsFn(val) {
      clearTimeout(this.timeOut2);
      this.tipsConetent = val;
      this.showTips = true;
      this.timeOut2 = setTimeout(() => {
        this.showTips = false;
        this.tipsConetent = "";
      }, 2000);
    }
  }
};
</script>

<style scoped>
div > p {
  font-size: 0.34rem;
  text-align: center;
  margin-top: 1rem;
}
</style>

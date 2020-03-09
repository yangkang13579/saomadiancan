<template>
  <div class="advance">
    <div class="confirmTitle">
      <div class="confirmTitle-one">{{shopname}}</div>
      <div class="confirmTitle-two">
        <span>{{zhuo}}</span>
        号桌
      </div>
      <div class="confirmTitle-there">
        用餐
        <span>{{people}}</span>
        人
      </div>
    </div>

    <div class="orderNew">
      <div class="orderNew-title">
        <p>核对订单信息</p>
      </div>
      <div class="orderNew-code">
        <p>订单号</p>
        <span>{{cookie.order_no}} </span>
      </div>
      <div class="orderNew-time">
        <p>下单时间</p>
        <span>{{ cookie.create_time | formartDate }}  </span>
      </div>
      <div class="orderNew-remark">
        <span>订单备注</span>
        <p>{{cookie.remarks}} </p>
      </div>

    </div>


    <div class="confirmCont">
      <div class="confirmCont-title">
        核对订单信息
      </div>

      <div class="orderList">
        <div v-for="(item,index) in cookie.orderinfo.saveStore" :key="index" class="orderItem">
          <div class="orderItem-left">
            <img :src="item.picture_url" alt />
          </div>
          <div class="orderItem-right">
            <div class="orderItem-title">
              {{item.goods_name}}
            </div>
            <div v-if="item.cart" class="orderItem-kouwei">
              {{item.cart.sku_name}}
            </div>
            <div class="orderItem-jiage">
              <div class="orderItem-price">
                <span>￥</span>
                <p>{{item.cart.price}}</p>
              </div>
              <div class="orderItem-car">
                <span>x {{item.count}} 份</span>
                <!-- <img class="sub" v-if="" @click="sub(item)" src="../../assets/imgs/sub.png" />
                <span>{{item.number}}</span>
                <img class="add" @click="add(item)" src="../../assets/imgs/adds.png" /> -->
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="store-conts">
        <div class="store-caption">
          <span>支付详情</span>
        </div>
        <div class="store-name">
          <div class="store-name-left">
            优惠活动
          </div>
          <div @click="goCoun()" class="store-name-right">
            <span style="color: #FF4D4F" v-if="is_useful_count==true">有{{useful_count}}可用优惠卷</span>
            <span v-if="is_useful_count==false">暂无使用优惠卷</span>
            <i class="iconfont rigth_btn">&#xe6b5;</i>
          </div>
        </div>
        <div v-if="point_status" class="store-leibie">
          <div class="store-name-left">
            <span v-show="index==1">您有{{use_point}}积分,可为您立省{{use_money}}元</span>
            <span v-show="index==0">完成订单可获得{{give_point}}积分</span>
          </div>
          <div class="store-name-right">
            <img @click="check(1)" v-show="index==1" src="../../assets/imgs/iconSucess.png" />
            <img @click="check(0)" v-show="index==0" src="../../assets/imgs/iconnone.png" />
          </div>
        </div>
        <div class="fapiao">
          <p>开具发票</p>
          <span>请到收银台开具</span>
        </div>
      </div>
      <div class="staHot">
          <Hot></Hot>
      </div>

    <div class="Start_fotter">
        <div @click="toCar" class="left">
            <i class="iconfont">&#xe72c;</i>
            <p style="font-size:.22rem">添加菜品</p>
            <img class="add"  src="../../assets/imgs/adds.png" />
          </div>
      <div class="content">
        <p>
          <span>￥</span>
          <span v-if='!getPonit'>{{(money-couponPrice).toFixed(2)}}</span>
          <span v-else>{{(money - use_money-couponPrice).toFixed(2)}}</span>
        </p>
        <p>￥{{money}}</p>
      </div>
      <!-- 去结算 -->
      <div @click="goPay()" class="right">
        去结账
      </div>
    </div>

  </div>
</template>
<script>
  var clicktag = 0;
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    import { api } from '../../components/js/api.js';
    import  {formatDate} from '../../components/js/time.js';
    import Hot from '../../components/hot/hot'
  export default {
    data() {
      return {
        is_useful_count:false,
        useful_count: '', // 切换场景
        status: 1, // 状态--可用优惠券1>不可用2
        is_point:0,
        point_status:false,
        couponPrice: 0,
        time:1577952756,
        use_point:0,
        use_money:0,
        give_point:0,
        money:'',
        index: 1,
        zhuo: 14,
        zongnumber: 33,
        people: 6,
        orderinfo:[],
        getPonit: false,
      }
    },

    filters: {
      formartDate(param) {
        let date = new Date(param*1000);
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
}
  },
    // filters: {
    //   formatDate(time) {
    //     let date = new Date(time);
    //     return formatDate(date, 'yyyy-MM-dd hh:mm');
    //   }
    // },
    beforeRouteEnter: (to, from, next) => {
      console.log(to, 'to')
      console.log(from, 'from')
      
      next(vm => {
        if (from.name == 'StartingPoin') {
          document.addEventListener(
            "WeixinJSBridgeReady",
            function() {
                WeixinJSBridge.call("closeWindow");
            },
            false
        );
        //ios手机
        WeixinJSBridge.call("closeWindow")

        }
      })
    },
    components: {
      Hot
    },
    created() {
      this.init()
      console.log('22', this.$store.getters.text)

      if(this.$route.query.coupon_id_str){
        this.coupon_id_str = this.$route.query.coupon_id_str;
        // console.log('this.coupon_id_str',this.coupon_id_str)
      }
      if(this.$route.query.coupon_money){
        this.coupon_money = this.$route.query.coupon_money;
        console.log('coupon_money',this.coupon_money)
      }
     
      
      this.couponPrice = this.$route.query.couponPrice ? this.$route.query.couponPrice : 0
    },
    methods: {
      ponit(){
        this.$toast.loading({
          message: "加载中..."
        });
          let token = sessionStorage.getItem("token");
          let data = this.$reData(
          {
            order_id:this.order_id
          },
            'order.order/getfoodspoint',
                token
            )
            api(data).then(res => {
              console.log("ponit",res)
              this.$toast.clear(); 
              if(res.code=10001){
                this.point_status = res.responseData.point_status;
                if(this.point_status==false){
                    this.is_point = 0
                    this.give_point = res.responseData.give_point.point;
                    this.give_point_money = res.responseData.give_point.money;

                  }else{
                    this.use_point = res.responseData.point.point;
                    this.use_money = res.responseData.point.money;
                    this.give_point = res.responseData.give_point.point;
                    this.give_point_money = res.responseData.give_point.money;
                    // if(this.use_money>0 ){
                    //   this.getPonit = true;
                    //   this.is_point = 1
                    //   this.index=1
                      
                    // }else{
                    //   this.getPonit = false;
                    //   this.is_point = 0
                    //   this.index=0
                    // }
                    if(this.use_money>0 ){
                      this.getPonit = true;
                      this.is_point = 1
                      
                    }
                    if(this.$route.query.is_use_point){
                      this.is_use_point = this.$route.query.is_use_point;
                      if(this.is_use_point==true){
                        this.index=0
                        this.getPonit = false
                        this.is_point =0;
                      }else{

                      }
                    }
                  }


              }else{
                this.$toast(res.msg)
              }


            })

      },


      // ponit(){
      //   let token = sessionStorage.getItem("token");
      //   console.log('this.ins_id',this.ins_id)
      //   this.$axios({
      //     method: 'get',
      //     url: "api/apiv2/foodshop/point",
      //     params: {
      //       money:this.money,
      //       order_id:this.order_id,
      //       ins_id:this.ins_id,
      //       token:token
      //     }
      //   }).then(res => {
      //     console.log('积分',res)
      //     if(res.data.code == 10001){
      //      this.point_status = res.data.responseData.point_status;
      //      if(this.point_status==false){
      //       this.is_point = 0

      //      }else{
      //       this.use_point = res.data.responseData.use_point;
      //       this.use_money = res.data.responseData.use_money;
      //       this.give_point = res.data.responseData.give_point;
      //       if(this.use_money>0 ){
      //         this.getPonit = true;
              
      //       }
      //       if(this.$route.query.is_use_point){
      //         this.is_use_point = this.$route.query.is_use_point;
      //         if(this.is_use_point==true){
      //           this.index=0
      //           this.getPonit = false
      //         }else{

      //         }
      //       }
      //      }
           
             
      //     }else{
      //       this.$toast(res.data.msg)
      //     }
        
      //   })
      // },
      
      check(index){
        if(this.$route.query.is_use_point){
          this.$toast('该优惠券不能和积分同时使用')
          return
        }
        if(index==1){
          this.index=0
          this.getPonit = false
          this.is_point = 0;
        }else{
          this.index=1
          this.getPonit = true
          this.is_point = 1;
        }
        console.log("index",index)
        
      },
      init(){
        if(sessionStorage.getItem("ins_id")){
           this.ins_id = sessionStorage.getItem("ins_id");
           console.log('ins_id',this.ins_id)
        }
        if(localStorage.getItem("cookie")){
          console.log("88888888888")
           this.cookie = JSON.parse(localStorage.getItem("cookie"));
           this.order_id = this.cookie.order_id
           this.money =  this.cookie.orderinfo.total.money;
           this.marketPrice = this.cookie.orderinfo.total.marketPrice;
           console.log('cookie',this.cookie)

          const goods_arr = []
          JSON.parse(localStorage.getItem("cookie")).orderinfo.saveStore.forEach(item => {
            let vote = {};
            vote.goods_id = item.id
            vote.money = item.cart.price
            vote.number = item.count
            vote.category_id = item.category_id
            goods_arr.push(vote);
            console.log("传递的参数", goods_arr)
          });
          sessionStorage.setItem('goods_arr', JSON.stringify(goods_arr))
          let idarr=[];
          for(var i=0;i<goods_arr.length;i++){
              idarr.push(goods_arr[i].goods_id)
          }
        // goods_id 的集合
          this.idarr = idarr.toString();
          this.goods_arr = goods_arr //商品各类信息

          console.log('this.idarr',this.idarr)
          console.log('this.goods_arr',this.goods_arr)
          this.coupons()
  
           this.ponit()
        }
        if(sessionStorage.getItem("shopname")){
           this.shopname = sessionStorage.getItem("shopname");
           console.log('shopname',this.shopname)
        }
        if(sessionStorage.getItem("people")){
           this.people = sessionStorage.getItem("people");
           console.log('peoplepeople',this.people)
        }
        if(sessionStorage.getItem("qr")){
           this.qr = sessionStorage.getItem("qr");
           console.log('qr',this.qr)
        }
       
        if(sessionStorage.getItem("deskinfo")){
           let deskinfo = JSON.parse(sessionStorage.getItem("deskinfo"));
           this.zhuo = deskinfo.areaname + deskinfo.deskname
           console.log('deskinfo',this.zhuo)
        }
        // this.goRemab()
      },
      coupons(){
          let token = sessionStorage.getItem("token");
          let data = this.$reData(
          {
                coupon_scene_c: 6, // 优惠券场景
                ins_id: this.ins_id, // 机构ID
                status: this.status,
                goods_id:  this.idarr,
                money: this.money,
                goods_arr: this.goods_arr
              },
              'coupon.couponrule/couponlist',
                token
            )
            api(data).then(res => {
              console.log('优惠卷',res)
              this.useful_count = res.responseData.useful_count
              if(this.useful_count>0){
                this.is_useful_count = true
              }else{
                this.is_useful_count = false
              }

            })
      },

      toCar(){
        this.$router.go(-2);
        // this.$router.push({
        //   path: '/StartingPoin',
        //   query: {
        //     ins_id: this.ins_id
        //   }
        // })
      },
      sub(item) {
        console.log('item', item)
        if (item.number <= 1) {
          this.$dialog.confirm({
            title: '标题',
            message: '弹窗内容'
          }).then(() => {
            // on confirm
          }).catch(() => {
            // on cancel
          });
          return

        } else {
          item.number--
        }
      },
      add(item) {
        item.number++
      },
      goRemark() {
        this.$router.push({
          path: '/remark'
        })
      },
      goCoun() {
       
        this.$router.push({
          path: '/useCoupon',
          query: {
            money: this.money,
            iscount: this.getPonit,
            couponIndex: this.$route.query.couponIndex ? this.$route.query.couponIndex : null,
            coupon_id: this.$route.query.coupon_id_str ? this.$route.query.coupon_id_str : null
          }
        })
      },
     
      goPay(){
  
        let token = sessionStorage.getItem("token");
      
        console.log('is_use_point',this.is_point)
        if (clicktag == 0) {
          clicktag = 1
        
          let payData = this.$reData(
                {
                  pay_type: 'wxJsapiPay', // 支付类型:wxJsapiPay(微信jsapi支付);wxAppPay(微信app支付);aliWapPay支付宝手机网站支付;aliAppPay支付宝app支付
                  pay_scene: 2, // 支付场景 1 扫码支付 2 正常支付
                  pay_pattern: 2, // 支付模式 1普通商户模式 2服务商模式
                  order_id: this.order_id,// 订单id，正常支付传此参数
                  user_coupon_id: this.coupon_id_str,      // 优惠卷id，正常支付传此参数
                  // money:this.money,     // 金额，正常支付传此参数
                  is_use_point: this.is_point,       //是否使用积分抵扣 1是 0否
                  coupon_money:this.coupon_money
                  // order_type:6
                }, 'order.pay/entrance',
                token
            )
            api(payData).then((jsons) => {
              console.log('jsons',jsons)
              if(jsons.code === 10001){
                let response = jsons.responseData.app_response
                let orderId = jsons.responseData.order_id
                console.log('orderId02', orderId)
                this.wxpay(response, orderId)
              }
              else{
                console.log("99009")
                  this.$toast(jsons.msg)
                    if (jsons.msg == '支付成功') {
                      console.log("支付不需要钱99")
                        var self = this;
                        var orderId = jsons.responseData.order_id
                        console.log("orderId", orderId)
                        setTimeout(function () {
                          self.$router.push({ 
                            path: '/paySuccess',
                              query: { 
                                orderId: orderId,
                                give_point:self.give_point,
                                give_point_money:self.give_point_money
                              } 
                            })
                        }, 1000)

                        localStorage.removeItem("cookie")
                        localStorage.removeItem("save")
                        localStorage.removeItem("saveStore")
                        localStorage.removeItem("total")
                      }
                      else if (jsons.msg == '商户号错误') {
                        this.$toast(jsons.msg)
                        console.log('jsons.msg',jsons.msg)
                        // var self = this;
                        // setTimeout(function () {
                        //   self.$router.push({ path: '/orderIndex' })
                        // }, 500)
                      }

                    }
            })
            
            setTimeout(function () { clicktag = 0 }, 2000);
          }

   
       
    },


      wxpay(data, id) {
        console.log('orderId03', id)
        if (typeof WeixinJSBridge === 'undefined') {
          console.log("支付不需要钱02")
          if (document.addEventListener) {
            document.addEventListener(
              'WeixinJSBridgeReady',
              this.onBridgeReady,
              false
            )
            console.log("支付不需要钱03")
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
            console.log("支付不需要钱04")
          }
        } else {
          this.onBridgeReady(data, id)
          console.log("支付不需要钱05")
        }
      },
      onBridgeReady(data, id) {
        console.log("支付不需要钱06data", data)
        console.log("支付不需要钱id", id)

        let that = this
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            debug: true,
            appId: data.appId, // 公众号名称，由商户传入
            timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
            nonceStr: data.nonceStr, // 随机串
            package: data.package,
            signType: data.signType, // 微信签名方式：
            paySign: data.paySign // 微信签名
          },
          function (res) {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              // alert('支付成功')
              // that.successPay = true
              // that.zzc_show = true
              var self = this;
              var orderId = id;
              console.log('orderId04', orderId)
              setTimeout(function () {
                that.$router.push({ 
                  path: '/paySuccess', 
                  query: { 
                    orderId: orderId,
                    give_point:that.give_point,
                    give_point_money:that.give_point_money
                  } 
                })
              }, 1000)
                       localStorage.removeItem("cookie")
                        localStorage.removeItem("save")
                        localStorage.removeItem("saveStore")
                        localStorage.removeItem("total")
            } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
              return;
              // var self = this;
              // var orderId = id;
              // 跳转订单状态页面
              // that.$router.push({ path: '/paySuccess', query: { orderId: orderId} })
            } else {
              console.log("9999")
              var orderId = id;
              that.$router.push({ 
                path: '/paySuccess', 
                query: { 
                    orderId: orderId,
                    give_point:that.give_point,
                    give_point_money:that.give_point_money
                  } 
                })
              alert('支付失败!')
            }
          }
        )
      }
    },
          // goRemab(){
      //   let token = sessionStorage.getItem("token");
      //   this.$axios({
      //     method: 'get',
      //     url: "api/apiv2/foodshop/order_buy",
      //     params: {
      //       develop:1,
      //       qrcode_id:this.qr,
      //       num:this.people,
      //       remarks:this.$store.getters.text,
      //       orderinfo:this.save,
      //       token:token
      //     }
      //   }).then(res => {
      //     console.log('下单',res)
      //     if(res.data.code == 10001){
      //       this.order_id = res.data.responseData.order_id;
      //       this.money = res.data.responseData.orderinfo.total.money;
      //       this.nums = res.data.responseData.orderinfo.total.nums;
      //       this.orderinfo = res.data.responseData.orderinfo.saveStore;
             
      //     }else{

      //     }
        
      //   })
 
      // },
   
  }

</script>
<style lang='less' scoped>
  .advance {
    padding: 0 0.24rem 1.2rem 0.24rem;
    width: 7.02rem;
  }
  .staHot{
    position: fixed;
    bottom: 1rem;
    left: 0;
    width: 100%;
    height: .6rem;
    z-index: 33;

  }

  .Start_fotter {
    height: 1rem;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #cccccc;
    display: flex;
    align-items: center;
    .left {
      color: #ff4d4f;
      font-size: 0.24rem;
      padding: 0.2rem 0.4rem;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 0.5rem;
      }
      img {
        position: absolute;
        top: 0.1rem;
        right: 0.27rem;
        width: .33rem;
        height: .33rem;
       
      }
    }
    .content {
      padding-left: 0.36rem;
      p:nth-child(1) {
        padding-top: 0.1rem;
        color: #ff4d4f;
        font-family: PingFang SC;
        font-weight: bold;
        font-size: 0.24rem;

        span:nth-child(2) {
          font-size: 0.36rem;
        }
      }
      p:nth-child(2) {
        padding-bottom: 0.1rem;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
        text-decoration: line-through;
      }
    }
    .right {
      margin-left: auto;
      border-radius: .38rem;
      text-align: center;
      line-height: .76rem;
      margin-right: .24rem;
      width: 1.98rem;
      font-size: 0.28rem;
      font-weight: bolder;
      background: linear-gradient(90deg, rgba(255, 77, 79, 1) 0%, rgba(252, 162, 90, 1) 100%);
      color: #fff;
      height: 0.76rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /* 抬头 */

  .confirmTitle {
    width: 6.42rem;
    padding: 0 .3rem;
    height: .8rem;
    background: #fff;
    border-radius: .1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: .28rem;
    color: #333333;
    .confirmTitle-one{
      text-align: left;
    }
    .confirmTitle-two{
      text-align: center;
    }
    .confirmTitle-there{
      text-align: right;
    }
    div{
      width:33.3%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      color: #FF4D4F;
    }
  }
  /* 订单列表 */

  .confirmCont {
    width: 6.42rem;
    padding: 0.3rem .3rem .26rem .3rem;
    background: #fff;
    border-radius: .2rem;
    margin-top: .2rem;
    .confirmCont-title {
      font-size: .3rem;
      color: #333333;
      font-weight: bolder;
    }
    .orderList {
      width: 6.42rem;
      background: #fff;
      border-radius: .1rem;
      margin-top: .2rem;
      .orderItem {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: .8rem;
        .orderItem-left {
          width: 1.64rem;
          height: 1.64rem;

          margin-right: .2rem;
          img {
            width: 1.64rem;
            height: 1.64rem;
          }
        }
        .orderItem-right {
          width: 4.5rem;
          height: 1.74rem;
          .orderItem-title {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #333333;
            font-size: .32rem;
            font-weight: bolder;
          }
          .orderItem-kouwei {
            font-size: .24rem;
            color: #777777;
            margin-top: .1rem;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .orderItem-jiage {
            width: 100%;
            height: .8rem;
            display: flex;
            justify-content: space-between;
            .orderItem-price {
              display: flex;
              align-items: flex-end;
              span {
                font-size: .24rem;
                color: #FF4D4F;
              }
              p {
                color: #FF4D4F;
                font-size: .33rem;
                font-weight: bolder;
                /* margin-bottom: -.05rem; */
              }
            }
            .orderItem-car {
              height: .8rem;
              display: flex;
              align-items: flex-end;
              font-size: .3rem;
              color: #FF4D4F;
            }
          }
        }
      }
    }
  }
  .orderItem:last-child{
    margin-bottom:0rem !important;
  
  }

  /* 订单信息模块 */

  .orderNew {
    width: 7.02rem;
    height: 3.1rem;
    background: #fff;
    margin-top: .2rem;
    border-radius: .2rem;
    .orderNew-title {
      width: 100%;
      height: .78rem;
      border-bottom: 1px solid #EEEEEE;
      line-height: .74rem;
      p {
        color: #333333;
        font-size: .28rem;
        font-weight: Bold;
        margin-left: .3rem;
      }
    }
    .orderNew-code,
    .orderNew-time {
      width: 100%;
      height: .72rem;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        color: #333333;
        font-size: .28rem;
        margin-left: .3rem;
      }
      span {
        color: #777777;
        font-size: .24rem;
        margin-right: .3rem;
      }
    }
    .orderNew-remark {
    width: 100%;
    height: .72rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #333333;
      font-size: .28rem;
      margin-left: .3rem;
    }
    p {
      color: #777777;
      font-size: .24rem;
      margin-right: .3rem;
      width: 4.5rem;
      text-align: right;
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  }
  }

  


  /* 订单信息模块 */

  .store-conts {
    /* height: 2.42rem; */
    width: 100%;
    border-radius: .2rem;
    background: #fff;
    margin-top: .21rem;
    margin-bottom: 1rem;
  }

  .store-conts-imgList {}

  .store-conts-zizhi {
    width: 6.42rem;
    border-radius: 0.2rem;
    margin-top: 0.18rem;
  }
  .store-name{
    width: 100%;
    height: .8rem;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }








.store-caption{
    width: 100%;
    height: .8rem;
    background: #fff;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    align-items: center;
    span{
      color:#333333;
      margin-left:.3rem;
      font-size:.28rem;
      font-weight:Bold;
    }
}
.store-leibie{
  border-bottom: 1px solid #EEEEEE;
}

  .store-leibie,.fapiao {
    width: 100%;
    height: .8rem;
    border-radius: .1rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .fapiao p{
    color: #333333;
    font-size: .28rem;
    margin-left: .3rem;
  }
  .fapiao span{
    color: #777777;
    font-size: .24rem;
    margin-right: .3rem;
  }

  .store-name-left {
    color: #333333;
    font-size: .28rem;
    margin-left: .3rem;
  }

  .store-name-right {
    color: #777777;
    font-size: .24rem;
    margin-right: .3rem;
    span {
      margin-right: .05rem;
    }
    i {
      margin-top: .1rem;
    }
    img {
      width: .3rem;
      height: .31rem;
    }
  }
</style>
<template>
  <div class="bigboxsa">
    <div class="order_box"></div>
    <div class="paysuccess">
      <img src="../../assets/imgs/success.1.png" class="touxiang" />
      <div class="zhifusucc">支付成功</div>
      <p class="moneys">￥{{order_info.pay_money}}</p>
      <div class="integralInfo" v-if="hide">
        <div class="content" v-if="integralInfoShow">
          <img src="../../assets/imgs/12-2@2x.png" alt="35" width="33" height />
          <div class="cent">
              <p>恭喜获得{{give_point}}积分</p>
              <p style="color:#666666;font-size:0.2rem;">
                可抵现
                <span style="color:#FF4D4F">{{give_point_money}}</span>元
              </p>
          </div>
          <div class="order-stand" @click="gohistory">
            <p>查看订单</p>
          </div>
         
        </div>
        <!-- <div class="content" v-if="!integralInfoShow">
            <div class="cent">
              <img src="../../assets/imgs/12-2@2x.png" alt="35" width="33" height />
              
              <p>成功使用{{order_info.use_point}}积分</p>
              <p style="color:#666666;font-size:0.2rem;">
                已抵现
                <span style="color:#FF4D4F">{{order_info.already_replace_money}}</span>元
              </p>
          </div>
        </div> -->
      </div>
      <div class="orderInfos">
        <p class="orderInfostitle">订单信息</p>
        <p class="xiaofeiinfo">
          消费门店
          <span>{{order_info.store_name}}</span>
        </p>
        <p class="xiaofeiinfo">
          订单编号
          <span>{{order_info.order_no}}</span>
        </p>
        <p class="xiaofeiinfo">
          创建时间
          <span>{{order_info.create_time}}</span>
        </p>
        <p class="xiaofeiinfo">
          付款方式
          <span>{{order_info.payname}}</span>
        </p>
      </div>
    </div>
    <div v-if="order_info.is_join_lucky_draw==1" class="choujiang" @click="golottery">
      <img src="../../assets/imgs/bj.png" alt="">
    </div>
    <!-- <div class="guang_gao">
      <img :src="$imgurl+item.img_url" alt v-for="(item,index) in adv_goods" :key="index" @click="goto(item.goods_id)" />
    </div> -->
    <!-- <div class="guanggao">
      <img src="../../assets/imgs/guanggao5.png" alt="">
    </div>-->
    <!-- <p class="pingtaituijian">平台推荐</p>
    <div class="merchantsgoods_list1">
      <div class="merchantsgoods_li1" v-for="(item,index) in recommend_goods_list" @click="goto(item.goods_id)" :key="index">
        <div class="merchantsgoods_pic1">
          <img :src="$imgurl+item.img_url" />
        </div>
        <div class="merchantsgoods_text1">
          <h6>{{item.goods_name}}</h6>
          <div>{{item.market_price}}</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  // import { getIndex } from "../../js/ajax";
  // let fromURL = "";
  // let fromTP = "";
  export default {
    name: "paySuccess",
    data() {
      return {
        give_point:0,
        give_point_money:0,
        hide: true,
        integralInfoShow: true,
        orderId: 0,
        token: "",
        order_info:[],
        // wwwurl: 'http://test-ydhl.chinaniceshop.com/',
        // order_info: {
        //   pay_money: 23.23, // 支付金额
        //   ins_name: '京东商城', // 商家名称
        //   order_no: 155904205434181000, // 订单号
        //   create_time: '2019-05-28 19:14:14', // 创建时间
        //   payment_type: '支付宝', // 付款方式
        //   use_point: 0, // 使用积分;'
        //   already_replace_money: 0, // 已抵现金额
        //   give_point: 100, // 获得积分
        //   can_replace_money: 20.0 // 可抵现金额
        // },
        adv_goods: [],
        recommend_goods_list: []
      };
    },
    created() {
      // this.orderId = 776
      this.orderId = this.$route.query.orderId;
      console.log('this.orderId',this.orderId)
      console.log('this.$route.query',this.$route.query)
      
      if(this.$route.query.give_point){
        this.give_point = this.$route.query.give_point

      }
      if(this.$route.query.give_point_money){
        this.give_point_money = this.$route.query.give_point_money
      }
      if(sessionStorage.getItem("ins_id")){
           this.ins_id = sessionStorage.getItem("ins_id");
           console.log('ins_id',this.ins_id)
        }
      this.init()
      

      // let data = this.$reData(
      //   { order_id: this.orderId },
      //   "order.index/get_accomplish_order_info",
      //   this.token
      // );
      // getIndex(data).then(json => {
      //   if (json.code === 10001) {
      //     this.order_info = json.responseData.order_info;
      //     this.adv_goods = json.responseData.adv_goods;
      //     this.recommend_goods_list = json.responseData.recommend_goods_list;
      //     if (
      //       this.order_info.use_point == 0.0 &&
      //       this.order_info.give_point != 0.0
      //     ) {
      //       this.integralInfoShow = true;
      //     } else if (
      //       this.order_info.use_point == 0.0 &&
      //       this.order_info.give_point == 0.0
      //     ) {
      //       this.hide = false;
      //     } else if (this.order_info.use_point != 0.0) {
      //       this.integralInfoShow = false;
      //     }
      //   } else {
      //     this.$toast(json.msg);
      //   }
      // });
    },
    methods: {
      init(){
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/order_success",
          params: {
            // develop:1,
            token:token,
            order_id:this.orderId
          }
        }).then(res => {
          console.log('支付成功订单',res)
          if(res.data.code == 10001){
              //评分
           this.order_info = res.data.responseData
            

          }else{

          }
        
        })


      },
 
      gohistory() {
        this.$router.push({ path: '/orderHistory' })
      },
      golottery() {
        var token = sessionStorage.getItem("token");
        var isApp = 5;
        // this.orderId
        // var order_id = 1833;
        // this.$router.push({
        //   path: "/lottery",
        //   query: {
        //     isApp: 5,
        //     token: this.token,
        //     order_id: this.orderId
        //   }
        // });
        // http://yitest.chinaniceshop.com/#/lottery?isApp=5&order_id=1833&token=9dd7343038ff47e648eabc3d0ea92984
        window.location.href = this.$wxUrl + "/#/lottery?isApp=" + isApp +"&order_id="+ this.orderId+"&token="+ token;
      },
      goto(id) {
        window.location.href = this.$imgurl + "ShopDetail?goods_id=" + id;
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   fromURL = from.path;
    //   fromTP = from.query.untype;
    //   next();
    // },
    // beforeRouteLeave(to, from, next) {
    //   if (fromTP != "" && fromTP != undefined && to.path == "/ConfirmOrder") {
    //     next({ path: "/" });
    //   } else {
    //     if (fromURL == "/ConfirmOrder" && to.path == "/ConfirmOrder") {
    //       next({ path: "/Gouwuche" });
    //     } else {
    //       next(); // 默认跳转
    //     }
    //   }
    // }
  };
</script>

<style scoped>
  .order_box {
    width: 100%;
    height: 3rem;
    background: rgba(255, 77, 79, 1);
  }

  .paysuccess {
    width: 7.02rem;
    /* height: 5.51rem; */
    margin: auto;
    margin-top: -1.53rem;
    background: #ffffff;
    box-shadow: 0px 0.06rem 0.16rem 0px rgba(10, 13, 47, 0.05);
    border-radius: 0.1rem;
    position: relative;
  }
  .order-stand{
    display: flex;
    align-items: center;
    border-radius: .1rem;
    background:rgba(255,77,79,.2);
  }
  .order-stand p{
    color: #FF4D4F;
    font-size: .24rem;
    padding: .08rem .14rem;
  }
  .cent{
    width:2.3rem;
  }
  .touxiang {
    width: 1.1rem;
    height: 1.1rem;
    display: block;
    margin: auto;
    position: absolute;
    top: -0.55rem;
    left: 2.96rem;
  }

  .zhifusucc {
    font-size: 0.34rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(62, 62, 62, 1);
    text-align: center;
    padding-top: 0.8rem;
  }

  .moneys {
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 77, 79, 1);
    text-align: center;
    margin-top: 0.2rem;
  }

  .integralInfo {
    border-top: 1px solid #f0f0f0;
    padding-top: 0.14rem;
    margin-top: .34rem;
  }

  .integralInfo .content {
    background-color: #f7f7f7;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    border-radius: 16px;
    width: 70%;
    margin: 0 auto;
    font-size: 0.24rem;
    padding: 0.2rem 0.5rem;
  }

  .integralInfo .content img {
    float: left;
    margin-right: 0.36rem;
  }

  .zhifutypes {
    align-items: center;
    flex: 1;
  }

  .zhifutypes:nth-of-type(1) {
    border-right: 0.02rem dashed #999;
  }

  .zhifutypes p:nth-of-type(1) {
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #666;
    text-align: center;
  }

  .zhifutypes p:nth-of-type(2) {
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #999;
    text-align: center;
    margin-top: 0.1rem;
  }

  .orderInfos {
    margin-left: 0.4rem;
    margin-top: 0.22rem;
    padding-bottom: 0.22rem;
  }

  .xiaofeiinfo {
    font-size: 0.24rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-top: 0.1rem;
  }

  .xiaofeiinfo span {
    margin-left: 0.5rem;
  }

  .orderInfostitle {
    font-size: 0.26rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .guanggao {
    width: 7.02rem;
    height: 1.89rem;
    display: block;
    margin: auto;
    margin-top: 0.2rem;
  }

  .pingtaituijian {
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .pingtaituijian span {
    float: right;
    font-size: 0.24rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-right: 0.24rem;
  }

  .merchantsgoods_list1 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0.2rem 1rem 0.2rem;
  }

  .merchantsgoods_li1 {
    margin-top: 0.2rem;
    width: 3.45rem;
    height: 5rem;
    background: #fff;
    overflow: hidden;
  }

  .merchantsgoods_pic1 {
    width: 3.45rem;
    height: 3.24rem;
  }

  .merchantsgoods_pic1>img {
    width: 100%;
    height: 100%;
  }

  .merchantsgoods_text1 {
    width: 100%;
    box-sizing: border-box;
    padding: 0.15rem;
  }

  .merchantsgoods_text1>h6 {
    font-size: 0.26rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .merchantsgoods_text1>div {
    font-size: 0.3rem;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(255, 77, 79, 1);
    line-height: 0.32rem;
    margin-top: 0.05rem;
  }

  .merchantsgoods_text1>div>span {
    padding: 0 0.05rem;
    font-size: 0.2rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255, 77, 79, 1);
    border: 0.01rem solid rgba(255, 0, 0, 1);
    border-radius: 0.04rem;
    margin-left: 0.1rem;
  }

  .merchantsgoods_text1>span {
    display: block;
    font-size: 0.2rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 0.32rem;
    margin-top: 0.05rem;
  }

  .merchantsgoods_text1>span>i {
    font-style: normal;
  }

  .bigboxsa {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .guang_gao {
    margin-top: 0.3rem;
    overflow: hidden;
  }

  .guang_gao img {
    width: 45%;
    height: 1.87rem;
    margin-bottom: 0.2rem;
    margin-left: 0.27rem;
    float: left;
  }

  .guang_gao img:nth-child(5) {
    width: 95%;
    height: 1.87rem;
    margin-left: 0.2rem;
  }

  .guanggao img {
    width: 100%;
    height: 1.87rem;
  }

  .choujiang {
    width: 7.02rem;
    height: 2.33rem;
    margin: auto;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
  }

  .choujiang img {
    width: 7.02rem;
    height: 2.33rem;
    border-radius: 0.1rem;
  }
</style>
<template>
  <!-- 支付完成以后的回调页面 -->
  <div class="bigboxsa">
    <div class="order_box"></div>
    <div class="paysuccess">
      <img src="../../assets/imgs/success.png" class="touxiang" />
      <div class="zhifusucc">支付成功</div>
      <p class="moneys">￥{{order_info.pay_money}}</p>
      <div class="integralInfo" v-if="hide">
        <div class="content" v-if="integralInfoShow">
          <img src="../../assets/imgs/12-2@2x.png" alt="35" width="33" height />
          <p>恭喜获得{{order_info.give_point}}积分</p>
          <p style="color:#666666;font-size:0.2rem;">
            价值
            <span style="color:#FF4D4F">{{order_info.can_replace_money}}</span>元
          </p>
        </div>
        <div class="content" v-if="!integralInfoShow">
          <img src="../../assets/imgs/12-2@2x.png" alt="35" width="33" height />
          <p>成功使用{{order_info.use_point}}积分</p>
          <p style="color:#666666;font-size:0.2rem;">
            已抵现
            <span style="color:#FF4D4F">{{order_info.already_replace_money}}</span>元
          </p>
        </div>
      </div>
      <div class="orderInfos">
        <p class="orderInfostitle">订单信息</p>
        <p class="xiaofeiinfo">
          消费门店
          <span>{{order_info.ins_name}}</span>
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
          <span>{{order_info.payment_type}}</span>
        </p>
        <p class="xiaofeiinfo" v-show="coupon_info">
          优惠券
          <span style="margin-left:.7rem">{{coupon_info}}</span>
        </p>
      </div>
    </div>
    <div class="raffle" v-show="is_join_lucky_draw==1">
      <!-- <div class="raffle"> -->
      <img @click="Go_lottery" class="raffle_box" src="../../assets/imgs/GO@2x.png" alt />
    </div>
    <div class="guang_gao">
      <img
        :src="$imgUrl+item.img_url"
        alt
        v-for="(item,index) in adv_goods"
        :key="index"
        @click="goto(item.goods_id)"
      />
    </div>
    <!-- <div class="guanggao">
      <img src="../../assets/imgs/guanggao5.png" alt="">
    </div>-->
    <p class="pingtaituijian">平台推荐</p>
    <div class="merchantsgoods_list1">
      <div
        class="merchantsgoods_li1"
        v-for="(item,index) in recommend_goods_list"
        :key="index"
        @click="goto(item.goods_id)"
      >
        <div class="merchantsgoods_pic1">
          <img :src="$imgUrl+item.img_url" />
        </div>
        <div class="merchantsgoods_text1">
          <h6>{{item.goods_name}}</h6>
          <div>{{item.market_price}}</div>
        </div>
      </div>
      <!-- <div class="merchantsgoods_li1">
        <div class="merchantsgoods_pic1"><img src="../../assets/imgs/shop2.png"></div>
        <div class="merchantsgoods_text1">
          <h6>云南（YUNANBAIYAO）牙膏发过的递四发方速...</h6>
          <div>
            ¥ 98.9
          </div>
        </div>
      </div>
      <div class="merchantsgoods_li1">
        <div class="merchantsgoods_pic1"><img src="../../assets/imgs/shop3.png"></div>
        <div class="merchantsgoods_text1">
          <h6>云南（YUNANBAIYAO）牙膏发过的递四发方速...</h6>
          <div>
            ¥ 98.9
          </div>
        </div>
      </div>
      <div class="merchantsgoods_li1">
        <div class="merchantsgoods_pic1"><img src="../../assets/imgs/shop4.png"></div>
        <div class="merchantsgoods_text1">
          <h6>云南（YUNANBAIYAO）牙膏发过的递四发方速...</h6>
          <div>
            ¥ 98.9
          </div>
        </div>
      </div>-->
      <!-- 获得优惠券页面 -->
    </div>
    <div class="main_coup" v-show="is_give_coupon==1" @click="is_give_coupon=0"></div>
    <img
      class="Get_Coup_img"
      v-show="is_give_coupon==1"
      @click="is_give_coupon=0"
      src="../../assets/imgs/again.png"
      alt
    />
  </div>
</template>

<script>
import { api } from '../../components/js/api';
export default {
  name: 'PayOrder',
  data () {
    return {
      is_give_coupon: 0, // 是否显示赠送优惠券的弹框
      is_join_lucky_draw: false,
      hide: true,
      integralInfoShow: false,
      order_id: 155904205434181000,
      token: '8903319195403e1e70dcea95b8fcd4ae',
      order_info: {
        pay_money: 23.23, // 支付金额
        ins_name: '京东商城', // 商家名称
        order_no: 155904205434181000, // 订单号
        create_time: '2019-05-28 19:14:14', // 创建时间
        payment_type: '支付宝', // 付款方式
        use_point: 0, // 使用积分;'

        already_replace_money: 0, // 已抵现金额
        give_point: 100, // 获得积分
        can_replace_money: 20.0, // 可抵现金额
        coupon_info: '' // 获取的优惠券张数以及金额
      },
      adv_goods: [],

      recommend_goods_list: {
        img_url: 'public/static/images/11.jpg',
        goods_id: 74,
        goods_name:
          'G2000休闲潮流男装衬衫 2019春夏新品修身衬衣长袖男00040541 粉色/25 03/165',
        market_price: 206.7
      }
    }
  },
  components: {},
  created () {
    this.order_id = this.$route.query.order_id
    // alert(this.order_id)
    this.token = this.$route.query.token
    // alert(this.order_id)
    // alert(this.token)
    let data = this.$reData(
      { order_id: this.order_id },
      'order.index/get_accomplish_order_info',
      this.token
    )
    // let data = this.$reData({order_id: 141}, 'order.index/get_accomplish_order_info', 'ae221b320a03344749a033e67f1cfa62')
    api(data).then(json => {
      console.log(json, 'json')

      if (json.code === 10001) {
        // alert(JSON.stringify(json.responseData))
        this.order_info = json.responseData.order_info
        this.adv_goods = json.responseData.adv_goods
        this.recommend_goods_list = json.responseData.recommend_goods_list
        this.is_join_lucky_draw = json.responseData.is_join_lucky_draw
        this.is_give_coupon = json.responseData.is_give_coupon
        this.coupon_info = json.responseData.order_info.coupon_info

        if (
          this.order_info.use_point == 0.0 &&
          this.order_info.give_point != 0.0
        ) {
          this.integralInfoShow = true
        } else if (
          this.order_info.use_point == 0.0 &&
          this.order_info.give_point == 0.0
        ) {
          this.hide = false
        } else if (this.order_info.use_point != 0.0) {
          this.integralInfoShow = false
        }
      } else {
        alert(json.msg)
      }
    })
  },
  methods: {
    goto (id) {
      window.location.href = this.$wxUrl + '/#/ShopDetail?goods_id=' + id
    },
    // 调到抽奖页面
    Go_lottery () {
      window.location.href =
        this.$wxUrl +
        '/#/lottery?order_id=' +
        this.order_id +
        '&token=' +
        this.token +
        '&isApp=3';
    }
  }
}
</script>

<style scoped>
.main_coup {
  position: fixed;
  top: 0;
  background: #000000;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
.Get_Coup_img {
  width: 4.18rem;
  height: 5.31rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.raffle {
  padding: 0.1rem 0.2rem;
}
.raffle .raffle_box {
  display: block;
  width: 100%;
  height: 2.33rem;
}
.order_box {
  width: 100%;
  height: 3.58rem;
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
  font-size: 0.24rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 77, 79, 1);
  text-align: center;
  margin-top: 0.2rem;
}

.integralInfo {
  border-top: 1px solid #f0f0f0;
  padding-top: 0.14rem;
}
.integralInfo .content {
  background-color: #f7f7f7;
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
}

.xiaofeiinfo {
  font-size: 0.24rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 0.1rem;
}
.xiaofeiinfo:last-child {
  padding-bottom: 0.36rem;
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

.merchantsgoods_pic1 > img {
  width: 100%;
  height: 100%;
}

.merchantsgoods_text1 {
  width: 100%;
  box-sizing: border-box;
  padding: 0.15rem;
}

.merchantsgoods_text1 > h6 {
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

.merchantsgoods_text1 > div {
  font-size: 0.3rem;
  font-family: ArialMT;
  font-weight: 400;
  color: rgba(255, 77, 79, 1);
  line-height: 0.32rem;
  margin-top: 0.05rem;
}

.merchantsgoods_text1 > div > span {
  padding: 0 0.05rem;
  font-size: 0.2rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 77, 79, 1);
  border: 0.01rem solid rgba(255, 0, 0, 1);
  border-radius: 0.04rem;
  margin-left: 0.1rem;
}

.merchantsgoods_text1 > span {
  display: block;
  font-size: 0.2rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 0.32rem;
  margin-top: 0.05rem;
}

.merchantsgoods_text1 > span > i {
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
</style>

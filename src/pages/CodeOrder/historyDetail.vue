<template>
  <div class="advance">
    <div class="orderNew">
      <div class="orderNew-title">
        <p>订单信息</p>
      </div>
      <div class="orderNew-code">
        <p>订单号</p>
        <span>{{dataInfo.order_no}}</span>
      </div>
      <div class="orderNew-time">
        <p>下单时间</p>
        <span>{{dataInfo.create_time}} </span>
      </div>
      <div class="orderNew-time">
        <p>订单备注</p>
        <span class="orderNew-span">{{dataInfo.remarks===''? mone:dataInfo.remarks }} </span>
      </div>
      <div class="orderNew-remark">
        <p>用餐人数</p>
        <span>{{dataInfo.num }} </span>
      </div>

    </div>


    <div class="confirmCont">
      <div class="confirmCont-title">
        菜单详情
      </div>

      <div class="orderList">
        <div v-for="(item,index) in saveStore" :key="index" class="orderItem">
          <div class="orderItem-left">
            <img :src="item.picture_url" alt />
          </div>
          <div class="orderItem-right">
            <div class="orderItem-title">
              {{item.goods_name}}
            </div>
            <div class="orderItem-kouwei">
              {{item.cart.sku_name}}
            </div>
            <div class="orderItem-jiage">
              <div class="orderItem-price">
                <span>￥</span>
                <p>{{item.cart.price}}</p>
              </div>
              <div class="orderItem-car">
                <span>x {{item.count}} 份</span>
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
          支付方式
        </div>
        <div class="store-name-right">
          <span v-if="dataInfo.payment_type=='wxJsapiPay'">微信支付</span>
          <span v-else>支付宝支付</span>
        </div>
      </div>


      <div class="store-name">
        <div class="store-name-left">
          优惠信息
        </div>
        <div class="store-name-right">
          <!-- <span style="color: #FF4D4F">20元店铺通用优惠卷</span> -->
        </div>
      </div>

      <div class="store-bot">
          <div class="storeOne">
              <span>优惠卷金额</span>
              <span>-￥{{dataInfo.coupon_money}}</span>
            </div>
        <div class="storeOne">
          <span>积分抵扣</span>
          <span>-￥{{dataInfo.point_money}}</span>
        </div>
        <div class="storeOne">
          <span>实际金额</span>
          <span>￥{{dataInfo.order_money}}</span>
        </div>
        <div class="storeOne">
          <p>实付金额</p>
          <p>￥{{dataInfo.pay_money}}</p>
        </div>

      </div>




    </div>



  </div>
</template>
<script>
  import { api } from '../../components/js/api.js';
  export default {
    data() {
      return {
        mone:'无',
        saveStore:[],
        dataInfo: [],
        order_id: '',
        index: 1,
        zhuo: 14,
        zongnumber: 33,
        people: 6,
        produit: [
          {
            id: 1,
            price: '13.5',
            name: '红烧排骨红烧排骨红烧排骨红烧排骨红烧排骨',
            img: "../../assets/imgs/shop2.png",
            number: 5,
            fenlei: '微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣'
          },
          {
            id: 2,
            price: '17.5',
            name: '红烧排骨',
            img: "../../assets/imgs/shop2.png",
            number: 2,
            fenlei: '微辣苦甜'
          }
        ]
      }
    },

    created() {
      if (this.$route.query.order_id) {
        this.order_id = this.$route.query.order_id;
        console.log('this.order_id', this.order_id)
        this.init()
      }

    },
    methods: {
      init() {
        let token = sessionStorage.getItem("token");
        let data = this.$reData(
          {
            order_id: this.order_id
          },
          'order.index/getfoodsorderinfo',
          token
        )
        api(data).then(res => {
          console.log("res", res)
          if (res.code = 10001) {
            this.dataInfo = res.responseData;
            this.saveStore = res.responseData.orderinfo.saveStore
          } else {
            this.$toast(res.msg)
          }

        })


      },


      goRemark() {
        this.$router.push({
          path: '/remark'
        })
      },
      goPay() {
        this.$router.push({
          path: '/paySuccess'
        })
      }
    },


  }

</script>
<style lang='less' scoped>
  .advance {
    padding: 0 0.24rem 0rem 0.24rem;
    width: 7.02rem;
  }

  .store-bot {
    padding: .2rem .3rem;
  }

  .storeOne {
    width: 100%;
    height: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #777777;
      font-size: .24rem;
    }
    p {
      color: #333333;
      font-size: .28rem;
      font-weight: bold;
    }
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

  .orderItem:last-child {
    margin-bottom: 0rem !important;

  }

  /* 订单信息模块 */

  .orderNew {
    width: 7.02rem;
    /* height: 3.1rem; */
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
    .orderNew-span{
      display: block;
      color: #777777;
      font-size: 0.24rem;
      margin-right: 0.3rem;
      width: 4.5rem;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

  .store-name {
    width: 100%;
    height: .8rem;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }








  .store-caption {
    width: 100%;
    height: .8rem;
    background: #fff;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    align-items: center;
    span {
      color: #333333;
      margin-left: .3rem;
      font-size: .28rem;
      font-weight: Bold;
    }
  }


  .store-leibie {
    width: 100%;
    height: .8rem;
    border-radius: .1rem;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
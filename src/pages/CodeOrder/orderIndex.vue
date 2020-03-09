<template>
  <div style="width:100%;height:100%;background:#F5F5F5;padding:0 .24rem;box-sizing:border-box">
    <!-- code {{code}}
    <p>12:{{token}}</p> -->
    <!-- {{code}} -->
    <!-- {{comd}} -->
    <div v-if="isdraw" class="hot">
           <p>
            Hot
          </p>
          <div>
              <marquee direction="left">{{hot}}</marquee>
          </div>
        
      <!-- {{hot}} -->
    </div>
    <div class="swiper">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img :src="image.adv_image" v-lazy="image.adv_image" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          <span v-for="(image, index) in banner" :key="index" :class="{'active':current==index}"></span>
        </div>
      </van-swipe>
    </div>
    <div class="SeatNumber">
      <div class="SeatNumber_left">
        <img src="../../assets/imgs/shop2.png" alt />
      </div>
      <div class="SeatNumber_right">
        <div class="address">
          您当前位置在：
          <span>{{deskinfo.areaname}}{{deskinfo.deskname}}</span>
          号桌
        </div>
        <div class="SeatNumber_num">
          <p>请输入用餐人数</p>
          <p>
            <img class="sub" :class="{'active':Number(people)<=0}" @click="NumberDiners(2)" src="../../assets/imgs/sub.png" />
            <!-- <span :class="{'active':Number(people)<=0}" @click="NumberDiners(2)">-</span> -->
            <span @click="modification">{{people}}</span>
            <img class="add" :class="{'active':Number(people)>=12}" @click="NumberDiners(1)" src="../../assets/imgs/adds.png" />
            <!-- <span :class="{'active':Number(people)>=12}" @click="NumberDiners(1)">+</span> -->
          </p>
        </div>
      </div>
    </div>
    <div class="starting">
      <img v-show="Number(people)<=0" src="../../../static/img/str.png" alt />
      <img @click="dianCan" v-show="Number(people)>0" src="../../../static/img/ccc.png" alt />
    </div>
    <!-- <van-tabbar v-model="active" active-color="#FF4D4F" :safe-area-inset-bottom="true">
      <van-tabbar-item>
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>订单</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.normal2 : icon.active2" />
      </van-tabbar-item>
    </van-tabbar> -->
    <van-dialog v-model="show" title="请输入用餐人数" show-cancel-button confirmButtonColor="#FFFFFF" confirmButtonText="是" cancelButtonText="否"
      @confirm="confirms">
      <van-cell-group>
        <van-field type="number" @input="inputPhone" v-model="people" placeholder="0" />
        <!-- <van-field
        readonly
        clickable
        :value="value"
        @touchstart.native.stop="show = true"
      /> -->
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
  import { api } from '../../components/js/api.js';
  import axios from "axios";
  import wx from 'weixin-js-sdk';
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  export default {
    data() {
      return {
        SwiperImg: [
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34729/14/3948/120618/5cbeee07Efbe17ec5/d57ddd4fbbbc09e0.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34423/17/5378/97852/5cbecd7bE73730c2f/76e5359d8fb3a1e1.jpg!cr_1125x549_0_72!q70.jpg.dpg'
        ], // 轮播图片
        current: 0, // 轮播到当前的小圆点
        active: 0, // 底部被选中s
        icon: {
          normal: '../../../static/img/nox.png',
          active: '../../../static/img/xzs.png',
          normal2: '../../../static/img/dd.png',
          active2: '../../../static/img/wdd.png'
        }, // 底部数据
        people: 0, // 用餐人数
        show: false, // 弹框的显示
        value: '', // 输入框的值
        hot: '',
        comd: '',
        isdraw:false,
        iosOrAn: false,
        code: '',
        qr: '',
        mode_pay:'',
        shopname: '',
        deskinfo: []
      }
    },

    // beforeRouteEnter: (to, from, next) => {
    //   console.log(to, 'to')
    //   console.log(from, 'from')
      
    //   next(vm => {
    //     if (from.name == 'StartingPoin') {
    //       document.addEventListener(
    //         "WeixinJSBridgeReady",
    //         function() {
    //             WeixinJSBridge.call("closeWindow");
    //         },
    //         false
    //     );
    //     //ios手机
    //     WeixinJSBridge.call("closeWindow")

    //     }
    //   })
    // },
    created() {
      console.log("api", api)
      if (isIOS) {
        this.iosOrAn = false
      } else if (isAndroid) {
        this.iosOrAn = true
      }
      if(sessionStorage.getItem("people")){
           this.people = sessionStorage.getItem("people");
           console.log('peoplepeople',this.people)
        }
      this.IsWeixinOrAlipay()
      this.qr = this.$route.query.qr
      this.qr = 1;
      sessionStorage.setItem("qr", this.qr);



      console.log('this.qr', this.qr)
      let index = window.location.href.indexOf('qr=')
      // let index2 = window.location.href.indexOf('&qrcode_no')
      let state = this.$GetRequest().state
      this.state = this.$GetRequest().state
      console.log('state',state)
      if (state == 'zfb') {
     
        this.isType = 1
        this.qr = this.$GetRequest().qr
        this.code = this.$GetRequest().auth_code


        if (sessionStorage.getItem("token")) {
          console.log("有了token")
          this.cate()
          this.banner()
          return false;
        } else {
          let data = this.$reData(
            {
              code: code,
            },
            'user.login/alipay_user_info_share',
          )
          api(data).then(json => {
            if (json.code == 10001) {
              this.token = json.responseData.token
              sessionStorage.setItem("token", json.responseData.token);
              this.cate()
              this.banner()
            } else if (json.code == 20128) {
              this.lose_text = json.msg
              this.efficacy = true
            } else {
              this.showTipsFn(json.msg)
            }
          })
        }
      }
      else if (state == 'wx#/orderIndex?qr') {

        this.code = this.$GetRequest().code
        console.log('this.code', this.code)

       


        if (sessionStorage.getItem("token")) {
          console.log("有了token")
          this.cate()
          this.banner()
          return false;
        } else {
          let data = this.$reData(
            {
              code: this.code,
            },
            'user.login/wx_user_info_share',
          )
          api(data).then(json => {
            if (json.code == 10001) {
              console.log('json', json)
              this.token = json.responseData.token;
              sessionStorage.setItem("token", json.responseData.token);
              
              this.cate()
              this.banner()
              // this.disable = false

            } else if (json.code == 20128) {
              this.lose_text = json.msg
              this.efficacy = true
            } else {
              this.showTipsFn(json.msg)
            }
          })


        }


      }



    },
    methods: {
      inputPhone(e){
        console.log("e",e)
        let filtered = e.replace(/^0|[^\d]/g, '');  
          if(this.people != filtered){
              this.people = filtered;
          }
          console.log(this.people.length,this.people,e)
      },
      // 获取餐桌位置信息
      cate() {
        let token = sessionStorage.getItem("token");
        console.log('token', token)
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/qrcode",
          params: {
            qrcode_id: 1,
            // develop: 1,
            token: token
          }
        }).then(res => {
          console.log('334', res)
          if(res.data.code==10001){
            // if(res.data.responseData.mode_pay=='0'){
            //   this.mode_pay = res.data.responseData.mode_pay;
            //   console.log('this.mode_paythis.mode_pay',this.mode_pay)
            //   this.$toast('该店暂不支持扫码点餐')
            // }else{
              this.shopname = res.data.responseData.shopname;
              this.ins_id = res.data.responseData.ins_id;
              this.deskinfo = res.data.responseData.deskinfo;
              this.mode_pay = res.data.responseData.mode_pay;
              console.log('this.mode_paythis.mode_pay',this.mode_pay)
              document.title = this.shopname;
              //用来干滚动抽奖
              if(res.data.responseData.draw_info==null){
                 this.isdraw = false;
                 this.$store.dispatch('isdraw', this.this.isdraw);//vuex存储起来
              }else{
                console.log("11111111111",res.data.responseData.draw_info)
                this.isdraw = true;
                this.draw_info = res.data.responseData.draw_info
                let code = "订单满 : "+ this.draw_info.customer_one_price + '元可参与抽奖'+"  ";
                let opList = this.draw_info.red_envelope_options_list;
                let good =[]
                for(let i=0;i<opList.length;i++){
                  let top = opList[i].grade + "等奖" + opList[i].money + "元"
                  good.push(top)
                }
                console.log('good',good)
                let pop = good.join()
                this.hot = code + pop
                this.$store.dispatch('setHot', this.hot);//vuex存储起来
                this.$store.dispatch('setisdraw', this.isdraw);//vuex存储起来
                console.log('hot',this.hot)
              }

              //存储后期用桌号
              sessionStorage.setItem("shopname", this.shopname)
              var deskinfo = JSON.stringify(this.deskinfo)
              sessionStorage.setItem("mode_pay", this.mode_pay);
              sessionStorage.setItem("deskinfo", deskinfo);
              sessionStorage.setItem("ins_id", this.ins_id);
              console.log('document.title2qw', document.title)

            // }
             

          }else{
            this.$toast(res.data.msg)
          }
         
        })

      },
       // 获取banner信息
       banner() {
        let token = sessionStorage.getItem("token");
        console.log('token', token)
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/banner",
          params: {
            // develop: 1,
            token: token
          }
        }).then(res => {
          console.log('获取banner信息', res)
          this.banner = res.data.responseData.data;
          this.$forceUpdate()
        
        })

      },


      dianCan() {
        console.log('this.mode_pay',this.mode_pay)
        // if(this.mode_pay==0){
        //   this.$toast('该店暂不支持扫码点餐')
        // }else{
          sessionStorage.setItem("people", this.people);
          this.$router.push({
            path: '/StartingPoin',
            query: {
              ins_id: this.ins_id
            }
          })
        // }
       
      },
      IsWeixinOrAlipay() {
        var ua = window.navigator.userAgent.toLowerCase()
        // 判断是不是微信
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          // alert('weixi')
          this.pay_type = 'weixin';
        }
        // 判断是不是支付宝
        else if (ua.match(/AlipayClient/i) == 'alipayclient') {
          this.pay_type = 'zfb';
        } else {
          this.pay_type = 'app';
        }
      },
      onChange(index) {
        console.log(index)
        this.current = index
      },
      // 点击用餐人数的变化
      NumberDiners(val) {
        // 判断是增加还是减少
        if (val == 1) {
          // 增加
          if (Number(this.people) >= 12) {
            return false
          }
          this.people++
        } else {
          // 减少
          if (Number(this.people) <= 0) {
            return false
          }
          this.people--
        }
      },
      inBlure() {
        console.log(this.value)

        if (this.value.length == 1) {
          this.value = this.value.replace(/[^1-9]/g, '')
        } else {
          this.value = this.value.replace(/^(0+)|[^\d]+/g, '')
        }
      },
      // 点击确认
      confirms() {
        if(this.people==''){
          console.log("33")
          this.people =0;
        }
        console.log('this.people',this.people)
        // this.people = this.value
      },
      // 点击人数,修改人数
      modification() {
        this.value = this.people
        this.show = !this.show
      }
    }
  }
</script>
<style lang='less' scoped>
  .hot {
    width: 100%;
    height: .6rem;
    background: hsla(359, 100%, 65%, .5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 55;
    white-space: nowrap;
    /*一行显示*/
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /*用...代替超出部分*/
    color: #fff;
    font-size: .26rem;
    text-align: center;
    line-height: .6rem;
    align-items: center;
    display: flex;
  }
  .hot p{
    width: .55rem;
  height: .35rem;
  text-align: center;
  line-height: .35rem;
  font-size: .23rem;
  background: #FF4D4F;
  color: #fff;
  margin-left:.3rem;
  border-radius: .04rem;
  }
  .hot div{
  width: 5.7rem;
  height: .6rem;
  margin-left: .2rem;
  /* margin-right: .4rem; */
  text-align: left;
  line-height: .6rem;
  font-size: .26rem;
  color: #fff;
}
  p {
    display: block;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  .swiper {
    width: 100%;
    padding: 0.25rem 0 0.3rem;
    box-sizing: border-box;
    .van-swipe {
      width: 100%;
      height: 3.51rem;
      box-sizing: border-box;
    }
    img {
      width: 100%;
      height: 100%;
      pointer-events: none;
      border-radius: 0.2rem;
    }
    .custom-indicator {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
      padding: 2px 5px;
      font-size: 0.24rem;
      color: #fff;
      /* background: #fff; */
    }
  }

  .custom-indicator {
    span {
      display: inline-block;
      width: 0.15rem;
      height: 0.07rem;
      background: rgba(170, 170, 170, 1);
      opacity: 0.7;
      border-radius: 0.04rem;
      background: #aaaaaa;
      margin: 0 auto;
      margin: 0 0.02rem;
    }
    span.active {
      background: #ff4d4f;
    }
  }

  .SeatNumber {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 0.2rem;
    padding: 0.3rem;
    overflow: hidden;
    .SeatNumber_left {
      font-size: 0.24rem;
      float: left;
      margin-right: 0.3rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .SeatNumber_right {
      width: 100%;
      .address {
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        span {
          color: #ff4500;
        }
      }
      .SeatNumber_num {
        font-size: 0.28rem;
        margin-top: 0.75rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
        overflow: hidden;
        p:nth-child(1) {
          float: left;
        }
        p:nth-child(2) {
          float: right;
          font-size: 0.3rem;
          line-height: 0.4rem;
          display: flex;
          .sub {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            /* border-radius: 50%; */
          }
          span {
            padding: 0 0.32rem;
            color: #FF4D4F;
          }
          .add {
            width: 0.4rem;
            height: 0.4rem;

          }
          span.active {
            background: #cccccc;
          }
        }
      }
    }
  }

  .starting {
    img {
      display: block;
      width: 4.79rem;
      height: 0.8rem;
      margin-top: 0.2rem;
      margin: 2rem auto 0;
    }
  }

  .ww {
    width: 1rem;
    height: 1rem;
  }
</style>
<style scoped>
  .van-swipe>>>.custom-indicator {
    background: rgba(0, 0, 0, 0);
  }

  .van-dialog {
    width: 85%;
    border-radius: 0.2rem;
  }

  .van-dialog>>>.van-dialog__header {
    padding-top: 0.47rem;
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  .van-dialog>>>[class*="van-hairline"]::after {
    /* border-top: 1px solid red; */
  }

  >>>.van-dialog__confirm {
    background: #ff4d4f;
  }

  >>>.van-button--large {
    height: 0.85rem;
    line-height: 0.85rem;
  }

  >>>.van-dialog__footer--buttons {
    border-top: 1px solid #ff4d4f;
  }

  >>>.van-cell__value {
    border-bottom: 1px solid #ff4d4f;
    margin-bottom: 0.59rem;
    margin-top: 0.2rem;
  }

  >>>.van-cell {
    padding: 0.1rem 0.6rem;
  }
</style>
<template>
  <div class="coupons">
    <div v-if="is_used==true" class="noCou">
      <img src="../../assets/imgs/userCoun.png" />
      <p>暂无任何优惠卷</p>
    </div>
    <!-- <ul v-if="is_used==false" class="result_list" id="result_list"> -->
      <!-- <li v-for="(item,index) in totalCoupon" :key="index" :id="item.user_coupon_id">
        <div class="coupon">
          <div class="Datainformation">
            <div class="left">
              <img src="../../assets/矩形1456@2x.png" alt v-show="Number(item.status) != 3" />
              <img src="../../assets/矩形 1456@2x.png" alt v-show="Number(item.status) == 3" />
              <div v-show="item.coupon_type == 1">
                <p :class="[ item.money.length<7 ? 'moneyOnly':'moneyOnlyTwo' ]">￥{{item.money}}</p>
              </div>
              <div v-show="item.coupon_type == 2">
                <p class="text">兑换券</p>
              </div>
              <div v-show="item.coupon_type == 3">
                <p class="money">￥{{item.money}}</p>
                <p class="tiaojian">满{{item.full_money}}元可用</p>
              </div>
            </div>
            <div class="right">
              <p class="type">{{item.coupon_name}}</p>
              <div class="name">
                <div class="name_distance">
                  <p class="distance" v-show="Number(item.distance) >= 1000">{{item.ins_name+' '}}距离{{item.distance / 1000}}Km</p>
                  <p class="distance" v-show="Number(item.distance) < 1000">{{item.ins_name+' '}}距离{{item.distance}}m</p>
                  <p class="time">{{item.start_time+'~'+item.end_time}}</p>
                </div>
                <div class="to_user">
                  <span v-show="Number(item.status) == 1 && Number(item.is_use) == 1" class="canUser" @click="toUser(item.goods_id,item.ins_id,item.ins_category_id,item.user_coupon_id)">去使用</span>
            
                  <span v-show="Number(item.status) == 1 && Number(item.is_use) == 0" class="disabled">暂不可用</span>
              
                  <img v-show="Number(item.status) == 2" src="../../assets/组150@2x.png" alt />
                
                  <img v-show="Number(item.status) == 3" src="../../assets/组失效150@2x.png" alt />
                
                </div>
              </div>
              <p style="border-top:1px solid rgba(238,238,238,1);padding: 0rem .2rem;">
                使用规则
                <span @click="displayRule(item.is_check,index)">
               
                  <i class="iconfont" v-show="item.is_check == 1">&#xe601;</i>
                  <i class="iconfont" v-show="item.is_check == 0">&#xe812;</i>


                </span>
              </p>
            </div>
          </div>
          <div class="rule" v-show="item.is_check == 0">
            <p v-for="(item,index) in item.use_type" :key="index">{{item}}</p>
          </div>
          <div class="shadow" v-show="Number(item.status) == 2"></div>
        </div>
      </li> -->

      <!-- 纯静态页面star -->
      <!-- <li>
        <div class="coupon">
          <div class="Datainformation">
            <div class="left">
              <img src="../../assets/imgs/cou_bgc@2x.png" alt="">
              <div>
                <p class="money">30.00</p>
                <p class="tiaojian">满50元可用</p>
              </div>
            </div>
            <div class="right">
              <p class="type">全场商品满减券</p>
              <div class="name">
                <div class="name_distance">
                  <p class="distance">这里是公司名称111111111111和距离</p>
                  <p class="time">2019.07.31~2020.05.25</p>
                </div>
                <div class="to_user">
                  <span class="disabled">暂不可用</span>
                </div>
              </div>
              <p style="border-top:1px solid rgba(238,238,238,1);padding: 0rem .2rem;">
                使用规则
                <span @click="displayRule(index)">
                  <i class="iconfont">&#xe601;</i>
                  <i class="iconfont">&#xe72a;</i>
                </span>
              </p>
            </div>
          </div>
          <div class="rule">
            <p>1这里有七个字啊</p>
            <p>2你看这里刚好有十个字</p>
            <p>3这里也是七个字</p>
          </div>
        </div>
      </li> -->
      <!-- 纯静态页面over -->
      <div class="cou_content">
      <ul v-if="is_used==false" class="result_list" id="result_list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
      <div class="cou_contentsd">
        <ul id="resulte_list">
          <li v-for="(item,index) in list" :key="index">
            <div class="conten_box">
              <div class="conten_box_left" v-show="item.coupon_type==1">
                <p>
                  <span>￥</span>
                  <span>{{item.money}}</span>
                </p>
                <p>剩余:{{item.number}}</p>
              </div>
              <div class="conten_box_left" v-show="item.coupon_type==2"
                style="font-size:.48rem;font-family:PingFang SC;font-weight:bold;color:rgba(255,255,255,1);text-align:center;"
              >
                <p class="padding:.3rem 0 .3rem;">兑换券</p>
                <p
                  style="font-size:.24rem;font-family:PingFang SC;font-weight:400;color:rgba(255,255,255,1);"
                >剩余:{{item.number}}</p>
              </div>
              <div class="conten_box_left" v-show="item.coupon_type==3">
                <p style="padding-top:.3rem">
                  <span>￥</span>
                  <span>{{item.money}}</span>
                </p>
                <p style="padding-bottom:.1rem;">满{{item.full_money}}减{{item.money}}</p>
                <p>剩余:{{item.number}}</p>
              </div>

              <div class="conten_box_right">
                <div class="right_center">
                  <p>{{item.coupon_name}}</p>
                  <span class="shop_name">{{item.name}}</span>
                  <!-- <p v-if="(Number(item.distance)<1000)">
                    <span class="shop_name">{{item.name}}</span>
                    <span class="shop_distance">{{item.distance}}m</span>
                  </p> -->
                  <!-- <p v-if="(Number(item.distance)>=1000)">
                    <span class="shop_name">{{item.name}}</span>
                    <span class="shop_distance">{{item.distance/1000}}km</span>
                  </p> -->
                  <!-- {{ item.create_time | formatDate }}  -->
                  <p>{{item.start_time}}~{{item.end_time}}</p>
                  <img v-show="item.status==3" src="../../assets/imgs/sx.png" alt />
                  <button v-show="item.status==1" @click="getCoupon(item.id)">立即领取</button>
                  <button v-show="item.status==2" @click="getCoupon(item.id)">继续领取</button>
                </div>
                <p class="rule" @click="rule(item)">
                  <span>使用规则</span>
                  <i class="iconfont" v-show="item.is_check==0">&#xe72b;</i>
                  <i class="iconfont" v-show="item.is_check==1">&#xe72a;</i>
                </p>
              </div> 
            </div>

            <div class="rule_list" v-show="item.is_check==1">
              <ul>
                <li v-for="(item,index) in item.use_type_name" :key="index">{{item}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
        <!-- <li v-for="(item,index) in coupon" :key="index">
          <div class="coupon">
            <div class="Datainformation">
              <div class="shadow"></div>
              <div class="left">
                <img src="../../assets/imgs/cou_bgc@2x.png" alt="">
                <div>
                  <p class="money">{{item.money}}.00</p>
                  <p class="tiaojian">剩余：{{item.shengyu}}</p>
                </div>
              </div>
              <div class="right">
                <p class="type">{{item.type}}</p>
                <div class="name">
                  <div class="name_distance">
                    <p class="distance">{{item.name}}</p>
                    <p class="time">{{item.time}}</p>
                  </div>
                  <div class="to_user">
                    <span  v-show="item.status==0" class="canUser">立即领取</span>
                    <span v-show="item.status==1" class="disabled">暂不可用</span>
                    <img v-show="item.status==-1" src="../../assets/imgs/sx.png" alt />    
                  </div>
                </div>
                <p @click="displayRule(index,item)" class="guize">
                  使用规则
                  <span @click="displayRule(index,item)">
                    <i v-if="item.is_check==false" class="iconfont">&#xe601;</i>
                    <i v-if="item.is_check==true" class="iconfont">&#xe72a;</i>
                  </span>
                </p>
              </div>
            </div>
            <div v-show="item.is_check" class="rule">
              <p v-for="(item,index) in item.use_type" :key="index">{{item}}</p>
            </div>
          </div>
        </li> -->
      </van-list>
      <!-- <li>
        <div class="coupon">
          <div class="Datainformation">
            <div class="left">
              <img src="../../assets/imgs/cou_bgc@2x.png" alt="">
              <div>
                <p class="text">兑换券</p>
              </div>
            </div>
            <div class="right">
              <p class="type">全场商品满减券</p>
              <div class="name">
                <div class="name_distance">
                  <p class="distance">这里是公司名称111111111111和距离</p>
                  <p class="time">优惠券使用时间</p>
                </div>
                <div class="to_user">
                  <img src="../../assets/imgs/sx.png" alt="">
                </div>
              </div>
              <p style="border-top:1px solid rgba(238,238,238,1);padding: 0rem .2rem;">
                使用规则
                <span @click="displayRule(1)">
                  <i class="iconfont">&#xe601;</i>
                </span>
              </p>
            </div>
          </div>
          <div class="rule">
            <p>1这里有七个字啊</p>
            <p>2你看这里刚好有十个字</p>
            <p>3这里也是七个字</p>
          </div>
        </div>
      </li> -->
    </ul>
  </div>

      <!--领取成功弹框 -->
      <div class="successCoup" v-show="successCoupShow"></div>
      <div class="successCoup_img" v-show="successCoupShow">
        <p>
          <span @click="getMore()">领取更多</span>
          <span @click="useCoupon()">去使用</span>
        </p>
      </div>
      <img
        @click="close"
        v-show="successCoupShow"
        class="close_success"
        src="../../assets/imgs/tyq.png"
        alt
      />
  </div>
</template>
<script>
  import { api } from '../../components/js/api.js';
  export default {
    data() {
      return {
        successCoupShow:false,
        list:[],
        page:1,
        loading: false,
        finished: false,
        is_used:false,
        coupon: [
          {
            id: 1,
            is_check:false,
            status: 0,
            money: 30.00,
            shengyu: 24,
            type: '全场商品满减券',
            name: '爱屋及乌有限公司',
            time: '2019.07.31~2020.05.25',
            use_type: [

              "1:可与其他优惠券同时使用",

              "2:可与其他优惠券同时使用",

              "3:可与其他优惠券同时使用"

            ]
          },
          {
            id: 1,
            is_check:false,
            status: 1,
            money: 30.00,
            shengyu: 24,
            type: '全场商品满减券',
            name: '爱屋及乌有限公司',
            time: '2019.07.31~2020.05.25',
            use_type: [

              "1:可与其他优惠券同时使用",

              "2:可与其他优惠券同时使用",

              "3:可与其他优惠券同时使用"

            ]
          },
          {
            id: 1,
            is_check:false,
            status: -1,
            money: 30,
            shengyu: 24,
            type: '全场商品满减券',
            name: '爱屋及乌有限公司',
            time: '2019.07.31~2020.05.25',
            use_type: [

              "1:可与其他优惠券同时使用",

              "2:可与其他优惠券同时使用",

              "3:可与其他优惠券同时使用"
            ]
          },

        ]
      }
    },
    filters: {
      formatDate (value) {
          var val = JSON.parse(value)
          var date = new Date(val*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          // var h = date.getHours() + ':';
          // var m = date.getMinutes() + ':';
          // var s = date.getSeconds();
          // return Y+M+D+h+m+s;
          return Y+M+D;
      }
    },
    created() {
      // this.init()
      if(this.$route.query.ins_id){
        this.ins_id = this.$route.query.ins_id;
      }

    },
      // 点击筛选
   
    methods: {
      getMore(){
        this.successCoupShow = false;
        

      },
      useCoupon(){
        this.$router.back()
      },
      close () {
        console.log("0000")
        this.successCoupShow = false
     
      },
      filtrate () {
        this.list.forEach(item => {
          this.$set(item,"is_check",0)  
        })
      
    },
    // // 点击领取优惠券
    // getCoupon (id) {
    //     let token = sessionStorage.getItem("token");
    //     this.$axios({
    //       method: 'get',
    //       url: "api/apiv2/foodshop/coupon_get",
    //       params: {
    //         id:id,
    //         token:token,
    //       }
    //     }).then(res => {
    //       console.log("res",res)
    //       if(res.data.code==10001){
    //         this.successCoupShow = true
    //         this.list=[];
    //         this.init()
    //       }else{
    //         this.$toast(res.data.msg)
    //       }

    //     })
    // },
        


     // 点击领取优惠券 fcd5a68409b9c3785ce866067b67d9bb
     getCoupon (id) {
      let token = sessionStorage.getItem("token");
      let data = this.$reData(
        {
          coupon_id: id,
          get_type: 1        //领取类型，0：不限；1：线上 2：扫码支付 3：刷脸支付
        },
        'activity.coupon/user_get_coupon',
        token
      )
      console.log(id, 'id')

      api(data).then(res => {
        console.log('activity.coupon/user_get_coupon',res)

        if (res.code == 10001) {
          // this.CouponItem = res.responseData
          this.successCoupShow = true
          this.list=[];
          this.init()
        } else {
          this.$toast(res.msg)
        }
      })
    },
    //改变他的状态值
      rule(item){
        if(item.is_check == 0){
          item.is_check=1;
        }else{
          item.is_check=0;
        }

      },
      onLoad() {
        this.init()
      },
      init(){
        let categoryArr = sessionStorage.getItem("categoryArr")
        let token = sessionStorage.getItem("token");
        console.log('categoryArr',categoryArr)
        let data = this.$reData(
          {
            ins_id: this.ins_id,
            category_id: categoryArr,    //使用场景 所有商品分类id
            page: this.page,
            coupon_scene: 6,      //使用场景 1：线上商城 2:扫码支付 3:刷脸设备 6:扫码点餐
            coupon_type: 0,     	//0 全部 1：抵扣券 2：兑换券 3：满减券
            // distance: 1,
            is_distance: 1,
            page_size:10,
            coupon_send_type: 4    //领取场景 4：线上商城 5:扫码支付 6:刷脸设备	
          },
          'coupon.store/list',
          token
        )
           api(data).then(res => {
            if (res.code == 10001) {
             let data = res.responseData.data;
             let page =  res.responseData.page_count;
             let totalpage = res.responseData.total_count;
            if(data.length==0){
               this.is_used = true
             }else{
               this.is_used = false
                if(page<totalpage){
                    this.list.push(...res.responseData.data)
                    this.page++
                  }else{
                    this.finished = true;
                    this.list.push(...res.responseData.data)
                  }

                  this.filtrate()
                  this.loading = false
             }
             
            } else {
              this.$toast(res.msg)
            }
          })


      },
      // init(){
      //   let token = sessionStorage.getItem("token");
      //   this.$axios({
      //     method: 'get',
      //     url: "api/apiv2/foodshop/coupon",
      //     params: {
      //       develop:1,
      //       ins_id:this.ins_id,
      //       token:token,
      //       page:this.page,
      //       pageSize:10
      //     }
      //   }).then(res => {
      //     console.log('优惠卷',res)
      //     this.$toast.clear(); 
      //     if(res.data.code == 10001){
      //        let data = res.data.responseData.data;
      //        let page =  res.data.responseData.page;
      //        let totalpage = res.data.responseData.totalpage;
      //        if(data.length==0){
      //          this.is_used = true
      //        }else{
      //          this.is_used = false
      //           if(page<totalpage){
      //               this.list.push(...res.data.responseData.data)
      //               this.page++
      //             }else{
      //               this.finished = true;
      //               this.list.push(...res.data.responseData.data)
      //             }

      //             this.filtrate()
      //             this.loading = false
      //        }
            

      //     }else{

      //     }
        
      //   })
      // },
      displayRule(index,item){
        console.log('index',index)
        console.log('item1',item)
        if(item.is_check == false){
          item.is_check = true
        }else{
          item.is_check = false
        }

      },
    },


  }

</script>
<style lang='less' scoped>
  .successCoup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: #000000;
  opacity: 0.5;
  z-index: 9999;
}
.successCoup_img {
  width: 5.04rem;
  height: 5.24rem;
  background: url("../../assets/imgs/gx.png") no-repeat;
  background-size: 100%;
  position: fixed;
  z-index: 99999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
  padding: 0 0.57rem 0 0.77rem;
  box-sizing: border-box;
  p {
    margin-top: 4.23rem;
    display: flex;
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(241, 93, 69, 1);
    span {
      text-align: center;
      width: 1.6rem;
      height: 0.54rem;
      line-height: 0.54rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.27rem;
    }
    span:nth-child(1) {
      margin-right: 0.4rem;
    }
  }
}
.close_success {
  width: 0.69rem;
  height: 0.69rem;
  position: fixed;
  z-index: 99999;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3.03rem;
}
  .coupons{
    padding:.1rem 0;
    width: 100%;
    height: auto;
    .noCou{
        width: 3.87rem;
        height: 2.81rem;
        margin-top:2.46rem;
        margin-left:1.82rem;
        img{
          width: 3.87rem;
          height: 2.81rem;
        }
        p{
          width: 100%;
          text-align: center;
          color: #333333;
          margin-top: .6rem;
          font-size: .3rem;
        }
      }
  }
  .cou_contentsd {
    width: 7.08rem;
  }
  .cou_content {
  width: 7.08rem;
  padding: 0rem 0.24rem 0 0.18rem;
  ul {
    li {
      background: #ffffff;
      margin-bottom: 0.21rem;
      .conten_box {
        width: 100%;
        display: flex;
        overflow: hidden;
        .conten_box_left {
          width: 2.32rem;
          height: 2.06rem;
          background: url("../../assets/imgs/cou_bgc@2x.png") no-repeat;
          background-size: 100%;
          text-align: center;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          box-sizing: border-box;
          p:nth-child(1) {
            padding-top: 0.5rem;
            padding-bottom: 0.1rem;
            span:nth-child(2) {
              font-size: 0.48rem;
            }
          }
        }
        .conten_box_right {
          width: 5rem;
          font-size: 0.24rem;
          .right_center {
            padding-left: 0.2rem;
            position: relative;
            p:nth-child(1) {
              font-size: 0.28rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              padding: 0.28rem 0 0.2rem 0rem;
            }
            p:nth-child(2) {
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
            }
            p:nth-child(3) {
              font-size: 0.24rem;
              transform: scale(0.9);
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(119, 119, 119, 1);
              position: absolute;
              left: 0rem;
            }
            button {
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              padding: 0.13rem 0.18rem;
              background: #ff4d4f;
              border-radius: 0.3rem;
              position: absolute;
              right: 0.15rem;
              bottom: -0.3rem;
              box-shadow: 0px 2px 4px 0px rgba(212, 63, 66, 0.5);
            }
            img {
              width: 1.02rem;
              height: 0.97rem;
              position: absolute;
              right: 0;
              bottom: -0.4rem;
            }
          }
          .rule {
            border-top: 1px solid #eeeeee;
            margin-top: 0.4rem;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(119, 119, 119, 1);
            padding-left: 0.2rem;
            padding-top: 0.06rem;
            .iconfont {
              color: #333333;
              float: right;
              margin-right: 0.34rem;
            }
          }
        }
      }
      .rule_list {
        width: 100%;
        background: #ebebeb;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
        ul {
          padding: 0.23rem 0.26rem 0.27rem 0.26rem;
          li {
            background: #ebebeb;
            line-height: 0.4rem;
          }
        }
      }
      .animate {
        height: 0;
        overflow: hidden;
        transition: height 0.5s;
      }
    }
  }
}
  
  /* .result_list {
    overflow-y: scroll;
    width: 100%;
    background: #f7f7f7;
    padding: 0.21rem 0rem;
    li {
      margin-bottom: 0.2rem;
    }
    .coupon {
      width: 7.02rem;
      margin: 0 auto;
      position: relative;
     
      .Datainformation {
        background: rgba(255, 255, 255, 1);
        display: flex;
        .left {
          width: 2.32rem;
          position: relative;
          font-size: .1rem;
          height: 2.06rem;
          img {
            width: 2.32rem;
          }
          div {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            text-align: center;
            font-family: PingFang SC;
            color: rgba(255, 255, 255, 1);
            .money {
              font-size: 0.48rem;
              font-weight: bold;
              margin-top: 0.5rem;
            }
            .tiaojian {
              font-size: 0.24rem;
              font-weight: 400;
            }
            .moneyOnly {
              font-size: 0.48rem;
              font-weight: bold;
              margin-top: 27%;
            }
            .moneyOnlyTwo {
              font-size: 0.38rem;
              font-weight: bold;
              margin-top: 27%;
            }
            .text {
              font-size: 0.48rem;
              font-weight: bold;
              margin-top: 27%;
            }
          }
        }
        .right {
          width: 4.76rem;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          .type {
            font-size: 0.28rem;
            font-weight: bold;
            padding: 0.15rem 0.2rem;
          }
          .name {
            display: flex;
            padding: 0rem 0.2rem;
            .name_distance {
              flex: 1;
              .time {
                font-size: 0.22rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(119, 119, 119, 1);
                width: 2.6rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .distance {
                margin: 0.1rem 0rem;
                width: 2.6rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .to_user {
              width: 1.5rem;
              position: relative;
              text-align: right;
              height: 0.97rem; 
              .canUser {
                position: absolute;
                top: 0.1rem;
                left: 0.1rem;
                background: rgba(255, 77, 79, 1);
                box-shadow: 0rem 0.02rem 0.04rem 0rem rgba(212, 63, 66, 0.5);
                border-radius: 0.24rem;
                color: rgba(255, 255, 255, 1);
                padding: 0.12rem 0.20rem;
              }
              .disabled {
                position: absolute;
                top: 0.1rem;
                left: 0.1rem;
                background: rgba(193, 193, 193, 1);
                border-radius: 0.24rem;
                color: rgba(255, 255, 255, 1);
                padding: 0.12rem 0.21rem;
              }
              img {
                width: 1.02rem;
                height: 0.97rem;
                position: absolute;
                right: -0.2rem;
              }
            }
          }
          p>span {
            float: right; 
             color: red;
          }
        }
      }
      .rule {
        font-size: 0.24rem;
        background: #ebebeb;
        color: #8a8a8a;
        padding: 0.1rem 0.2rem;
        p {
          padding: 0.05rem 0.2rem;
        }
      }
      .animate {
        height: 0;
        overflow: hidden;
        transition: height 0.5s;
      }
      .shadow {
        width: 100%;
        height: 100%;
        opacity: 0.5;
        position: absolute;
        top: 0;
        background: rgba(255, 255, 255, 1);
      }
    }
  } */
  .guize{
    border-top: 1px solid rgb(238, 238, 238);
    padding: 0rem 0.2rem;
    line-height: .4rem;
    height: .4rem;
  }
</style>
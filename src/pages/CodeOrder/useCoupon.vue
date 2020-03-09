<template>
  <div>
    <div id="useConpon">
      <div class="useSwitch">
        <div :class="{useSwitchitem:status == 1}" @click="tabConpon(1)">可用优惠券({{useful_count}})</div>
        <div :class="{useSwitchitem:status == 2}" @click="tabConpon(2)">不可用优惠券({{useless_count}})</div>
      </div>
      <div class="total">
          <!-- <van-list
          v-model="loading"
          :finished="finished"
            finished-text=""
            @load="onLoad"
        > -->
        <!-- <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" class="scrollView" @init="mescrollInit" > -->
            <ul class="result_list" id="result_list" v-show="NoDate == false">
                <!-- <ul class="result_list" id="result_list" > -->
              <li v-for="(item,index) in allMessage" :key="index" :id="item.coupon_id" v-show="status == 1">
                <div class="coupon">
                  <div class="Datainformation">
                    <div class="left">
                      <img src="../../assets/imgs/cou_bgc@2x.png" alt />
                      <div>
                        <p :class="[item.money.length<7 ? 'money':'moneyOnlyTwo' ]" v-show="item.coupon_type != 2 ">￥{{item.money}}</p>
                        <p class="money" v-show="item.coupon_type == 2 ">兑换券</p>
                        <p class="manzu" v-show="item.coupon_type == 3 ">满{{item.full_money}}元可用</p>
                      </div>
                    </div>
                    <div class="right">
                      <p class="type">
                        {{item.coupon_name}}
                        <!-- <span
                          @click="select(index,item.is_check,item.is_use_point,item.use_show_type,item.coupon_id, item)"
                          v-show="item.is_prohibit == true || item.Firstsenior == false"
                        > -->
                        <span
                        @click.stop="select(index,item.is_check,item.is_use_point,item.use_show_type,item.coupon_id, item)">
                          <i
                            class="iconfont"
                            style="font-size:.46rem;color:#EAEAEA;font-weight:400;"
                            v-show="item.is_check == false"
                          >&#xe6c4;</i>
                          <i
                            class="iconfont"
                            style="font-size:.46rem;color:#4DBA78;"
                            v-show="item.is_check == true"
                          >&#xe663;</i>
                        </span>
                      </p>
                      <div class="name">
                        <div class="name_distance">
                          <p class="distance">
                            <span>{{item.ins_name}}</span>
                            <!-- <span v-if="item.distance >= 1000">{{item.distance / 1000}}km</span>
                            <span v-else>{{item.distance}}m</span> -->
                          </p>
                          <p class="time">{{item.start_time}}~{{item.end_time}}</p>
                        </div>
                      </div>
                      <p
                        style="border-top:1px solid rgba(238,238,238,1);padding: .1rem .2rem;margin-top:.2rem"
                      >
                        使用规则
                        <span @click.stop="displayRule(item)">
                            <i class="iconfont" v-show="item.checkout==0">&#xe72b;</i>
                            <i class="iconfont" v-show="item.checkout==1">&#xe72a;</i>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="rule" v-show="item.checkout==1">
                    <p v-for="(item,index) in item.use_show_type_name" :key="index + '_' +  item.id">{{item}}</p>
                  </div>
                </div>
                <div class="shadow" v-show="item.isDisabled == true"></div>
              </li>
              <li v-for="(item,index) in allMessage" :key="index + '_' + item.id" :id="item.coupon_id" v-show="status == 2">
                <div class="coupon">
                  <div class="Datainformation">
                    <div class="left">
                        <img src="../../assets/imgs/cou_bgc@2x.png" alt />
                      <!-- <img src="../../assets/矩形1456@2x.png" alt /> -->
                      <div>
                        <!-- <p class="money" v-show="item.coupon_type != 2 ">￥{{item.money}}</p> -->
                        <p :class="[item.money.length<7 ? 'money':'moneyOnlyTwo' ]" v-show="item.coupon_type != 2 ">￥{{item.money}}</p>
                        <p class="money" v-show="item.coupon_type == 2 ">兑换券</p>
                        <p class="manzu" v-show="item.coupon_type == 3 ">满{{item.full_money}}元可用</p>
                      </div>
                    </div>
                    <div class="right">
                      <p class="type">
                          {{item.coupon_name}}
                      </p>
                      <div class="name">
                        <div class="name_distance">
                          <p class="distance">
                            <span>{{item.ins_name}}</span>
                            <!-- <span v-if="item.distance >= 1000">{{item.distance / 1000}}km</span>
                            <span v-else>{{item.distance}}m</span> -->
                          </p>
                          <p class="time">{{item.start_time}}~{{item.end_time}}</p>
                        </div>
                      </div>
                      <p
                        style="border-top:1px solid rgba(238,238,238,1);padding: .1rem .2rem;margin-top:.2rem"
                      >
                        使用规则
                        <span @click.stop="displayRule(item)">
                            <i class="iconfont" v-show="item.checkout==0">&#xe72b;</i>
                            <i class="iconfont" v-show="item.checkout==1">&#xe72a;</i>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="rule" v-show="item.checkout == 1">
                    <p v-for="(item,index) in item.use_show_type_name" :key="index">{{item}}</p>
                  </div>
                </div>
                <div class="shadow" v-show="item.is_prohibit == false"></div>
              </li>
            </ul>
            <ul class="NoCouPon" v-show="NoDate == true">暂时没有可用的数据</ul>
         <!-- </van-list> -->
        <!-- </mescroll-vue> -->
      </div>
      <div v-if="status == 1" id="footer">
        <div class="msg">
          <p>已选择{{couponNum}}张优惠券</p>
          <p>
            可抵用:
            <span>￥{{(money - orderPrice).toFixed(2)}}</span>
          </p>
        </div>
        <div class="ensure" @click="ConfirmUse">确认使用</div>
      </div>
    </div>
  </div>
</template>
<script>
var orderPrice = 0, couponNum
import { api } from '../../components/js/api.js';
export default {
  // components: {
  //   MescrollVue
  // },
  data () {
    return {
      // 当减的小于0时记录下负数
      total_no:0,
      total_yes:0,
      use:1,
      allMessage:[],
      total:0,
        page:1,
        loading: false,
        finished: false,
        is_used:false,
      morePrice: 0,
      orderPrice: 0,
      couponNum: 0,
      goodsPrice: 0,
      allMessage: [], // 所有数据
      useful_count: '', // 切换场景
      useless_count: '', // 切换场景

      // ==========接口传参================
      coupon_scene_c: 1, // 优惠券使用场景-----固定
      ins_id: '', // 机构ID
      status: 1, // 状态--可用优惠券1>不可用2
      longitude: '', // 经度
      latitude: '', // 维度
      goods_id: '', // 商品ID(单个)
      money: '', // 订单金额
      goods_arr: [],
      // =================================

      cartId: '', // 购物车ID
      goods_ids: [], // 多个
      // moneys:[],    //多个商品金额
      orderNum: 0,
      orderMoney: 0.0, // 抵用金额
      exchangeNum: 0, // 兑换券数量

      // 缺失页面
      NoDate: false,
  

      // 拆分商品对象的数组
      ProductInformation: [],
      // //兑换券集合
      // Exchange_arr:[],
      // //抵扣券集合
      // Deduction_arr:[],
      // //满减券集合
      // FullDe:[],

      // 
    }
  },
  created () {
    // this.cookieing()
    // 获取缓存中的ID，接口传参
    // this.init()
    // let arr_id = JSON.parse(sessionStorage.getItem('arr_id'))
    // this.ins_id = arr_id.ins_id
    // this.goods_id = arr_id.goods_id
    // this.cartId = arr_id.cartId
    this.money = this.$route.query.money //总金额
    this.allMessage=[]
    this.cookieing()
   

  },
  mounted () {
    this.morePrice = 0
    this.money = this.$route.query.money //总金额
    let goods_arr = JSON.parse(sessionStorage.getItem('goods_arr'))
    this.goods_arr = goods_arr //商品各类信息
    orderPrice = 0
    this.orderPrice = 0
    for (let i = 0; i < this.goods_arr.length; i++) {
        this.orderPrice += parseFloat(this.goods_arr[i].money) * parseFloat(this.goods_arr[i].number)
    }
    this.sortArr(this.ProductInformation)
  },
  // filters: {
  //     formatDate (value) {
  //         var val = JSON.parse(value)
  //         var date = new Date(val*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  //         var Y = date.getFullYear() + '-';
  //         var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  //         var D = date.getDate() + ' ';
  //         return Y+M+D;
  //     }
  //   },
  methods: {
     //改变他的状态值
     displayRule(item){
        if(item.checkout == 0){
          item.checkout=1;
        }else{
          item.checkout=0;
        }

      },
    // filtrate () {
    //     this.allMessage.forEach(item => {
    //       this.$set(item,"checkout",0)  
    //     })
    //     this.allMessage.forEach(item => {
    //       this.$set(item,"is_check",0)  
    //     })
    // },
    //从cookie中获取值；来传给后台参数
    cookieing(){
      console.log(6666666666666666666)
      if(sessionStorage.getItem("ins_id")){
           this.ins_id = sessionStorage.getItem("ins_id");
        }
      let goods_arr = JSON.parse(sessionStorage.getItem('goods_arr'))
      let idarr=[];
      for(var i=0;i<goods_arr.length;i++){
          idarr.push(goods_arr[i].goods_id)
      }
      // goods_id 的集合
        this.idarr = idarr.toString();
        this.goods_arr = goods_arr //商品各类信息
      // if(sessionStorage.getItem("ins_id")){
      //      this.ins_id = sessionStorage.getItem("ins_id");
      //   }
      // if(localStorage.getItem("cookie")){
      //   this.cookie = JSON.parse(localStorage.getItem("cookie"));
      //   let saveStore = this.cookie.orderinfo.saveStore;
      //   let idarr=[];
      //   for(var i=0;i<saveStore.length;i++){
      //     idarr.push(saveStore[i].id)
      //   }
      //   this.idarr = idarr.toString();
      //   console.log('this.idarr',this.idarr)
        this.init()
      // }

    },
    init(){
      console.log(5555555555555555555)
      let token = sessionStorage.getItem("token");
      let data = this.$reData(
       {
             coupon_scene_c: 6, // 优惠券场景
             ins_id: this.ins_id, // 机构ID
             status: this.status,
            //  longitude: _this.longitude, // 经度
            //  latitude: _this.latitude, // 维度
             goods_id:  this.idarr,
             money: this.money,
             goods_arr: this.goods_arr
          },
           'coupon.couponrule/couponlist',
             token
        )
                  api(data).then(res => {
                    console.log("res",res)
                      if (res.code == 10001) {
                        console.log('4444444444444')
                        this.allMessage = res.responseData.info
                        // if(this.allMessage.length<50){
                        //   this.loading = false
                        // }
                        this.useful_count = res.responseData.useful_count
                        this.useless_count = res.responseData.useless_count
                        // this.loading = false
                        if (res.responseData.info.length == 0) {
                          this.NoDate = true
                        } else {
                          this.NoDate = false
                          //11、优先级最高的
                          this.allMessage.forEach((item,index) => {
                            console.log(333)
                            var user_coupon_id, couponIndex
                            if (this.$route.query.coupon_id) {
                              couponIndex = this.$route.query.couponIndex.split(',')
                              for (var i = 0; i < couponIndex.length; i++) {
                                if (parseInt(couponIndex[i]) === index) {
                                  this.select(index, true, item.is_use_point, item.use_show_type, item.user_coupon_id, item)
                                  item.is_check = true
                                }
                              }
                            }
                            
                           
                            item.Firstsenior = false
                          })
                        }
                        if (sessionStorage.getItem('CouPon')) {
                          _this.orderNum = JSON.parse(
                            sessionStorage.getItem('CouPon')
                          ).DYnum //优惠券个数
                          _this.orderMoney = JSON.parse(
                            sessionStorage.getItem('CouPon')
                          ).DYmoney //抵用金额
                        }
                      }
                    })

    },
    // init(){
    //    let token = sessionStorage.getItem("token");
    //     this.$axios({
    //       method: 'get',
    //       url: "api/apiv2/foodshop/coupon_my",
    //       params: {
    //         use:this.use,
    //         token:token,
    //         page:this.page,
    //         pageSize:10,
    //         ins_id:this.ins_id,
    //         money:this.moneyTop,
    //         goods_id:this.idarr
    //       }
    //     }).then(res => {
    //       if(res.data.code==10001){
    //         let data = res.data.responseData.data;
    //          let page =  res.data.responseData.page;
    //          this.total = res.data.responseData.total;
    //          this.total_no = res.data.responseData.total_no;
    //          this.total_yes = res.data.responseData.total_yes;
    //          let totalpage = res.data.responseData.totalpage;
    //          if(data.length==0){
    //            this.NoDate = true
    //          }else{
    //            this.NoDate = false
    //             if(page<totalpage){
    //                 this.allMessage.push(...res.data.responseData.data)
    //                 this.page++
    //               }else{
    //                 this.finished = true;
    //                 this.allMessage.push(...res.data.responseData.data)
    //               }
    //               this.allMessage.forEach((item,index) => {
    //                 item.is_check = false
    //                 var coupon_id, couponIndex = 0
    //                 if (this.$route.query.coupon_id) {
    //                   couponIndex = this.$route.query.couponIndex.split(',')
    //                 }
    //                 for (var i = 0; i < couponIndex.length; i++) {
    //                   if (parseInt(couponIndex[i]) === index) {
    //                     console.log(parseInt(couponIndex[i]), index, 'parseInt(couponIndex[i])')
    //                     this.select(index, true, item.is_use_point, item.use_show_type, item.coupon_id, item)
    //                     this.allMessage[index].is_check = true
    //                     this.$forceUpdate()
    //                   }
    //                 }
    //                 item.Firstsenior = false
    //               })
    //               console.log(this.allMessage, 'this.allMessagethis.allMessage')
    //               // this.filtrate()
    //               this.loading = false
    //          }
           
    //       }else{
    //         this.$toast(res.data.msg)
    //       }

    //     })
    // },
    onLoad() {
      console.log(888888888888888888888888)
      this.allMessage=[]
      this.cookieing()
      // this.getCouponlist()
    },
    //选择优惠卷是否勾选
    // displayRule: function (index, is_open) {
    //   console.log('index',index)
    //   console.log('is_open',is_open)
    //   if (is_open == false) {
    //     this.allMessage[index].is_open = true
    //   } else {
    //     this.allMessage[index].is_open = false
    //   }
    //   this.$forceUpdate()
    // },
    ConfirmUse () {
      let is_use_point = false
      let coupon_money ='';
      let coupon_id = [], couponIndex = []
      for (var i = 0; i < this.allMessage.length; i++) {
        if (this.allMessage[i].is_check === true && this.allMessage[i].is_use_point === 0) {
          is_use_point = true
        }
        if (this.allMessage[i].is_check) {
          coupon_money+=this.allMessage[i].money;
          coupon_id.push(this.allMessage[i].user_coupon_id)
          couponIndex.push(i)
        }
      }
      this.coupon_money = coupon_money
      console.log('this.coupon_money',this.coupon_money)
      // <span>￥{{(money - orderPrice).toFixed(2)}}</span>
      //路由传参

       this.$router.push({
        path: '/orderDetails',
        query: {
          // DYmoney:this.orderMoney,
          // DYnum:exchange.length,
          // DYid_str:exchange,
          coupon_money:this.coupon_money,
          cart_id: this.cartId,
          is_use_point: is_use_point,
          couponPrice: this.money - this.orderPrice,
          iscount: this.$route.query.iscount,
          coupon_id_str: coupon_id.join(','),
          couponIndex: couponIndex.join(','),
        }
      })




      // this.$router.replace({
      //   path: '/orderDetails',
      //   query: {
      //     // DYmoney:this.orderMoney,
      //     // DYnum:exchange.length,
      //     // DYid_str:exchange,
      //     coupon_money:this.coupon_money,
      //     cart_id: this.cartId,
      //     is_use_point: is_use_point,
      //     couponPrice: this.money - this.orderPrice,
      //     iscount: this.$route.query.iscount,
      //     coupon_id_str: coupon_id.join(','),
      //     couponIndex: couponIndex.join(','),
      //   }
      // })
      // this.$router.go(-1)
    },
    getCouponlist () {
      let token = sessionStorage.getItem('token')
      if (this.longitude == '' || this.latitude == '') {
        let url = encodeURIComponent(location.href.split('#')[0]) // 获取锚点之前的链
        let data = this.$reData(
          { url: url },
          'common.wxshare/actionsqrcode',
          token
        )
        api(data).then(res => {
          let _this = this
          wx.config({
            debug: false,
            appId: this.$appid,
            timestamp: res.responseData.timestamp,
            nonceStr: res.responseData.noncestr,
            signature: res.responseData.signature,
            jsApiList: ['checkJsApi', 'openLocation', 'getLocation']
          })
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['getLocation'],
              success: function (res) {
                if (res.checkResult.getLocation == false) {
                  this.$toast(
                    '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！'
                  )
                }
              }
            })
            wx.getLocation({
              success: function (res) {
                var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。;
                var longitude = res.longitude // 微信经度
                var latitude = res.latitude // 微信纬度
                var lng = ''; // 百度经度
                var lat = ''; // 百度纬度
                var convertor = new BMap.Convertor()
                var ggPoint = new BMap.Point(longitude, latitude)
                var pointArr = []
                pointArr.push(ggPoint)
                convertor.translate(pointArr, 1, 5, function (data) {
                  if (data.status === 0) {
                    lng = data.points[0].lng
                    lat = data.points[0].lat
                    _this.longitude = lng
                    _this.latitude = lat
                    // _this.distance = lng + ',' + lat
                    let dataS = _this.$reData(
                      {
                        coupon_scene_c: _this.coupon_scene_c, // 优惠券场景
                        ins_id: _this.ins_id, // 机构ID
                        status: _this.status,
                        longitude: _this.longitude, // 经度
                        latitude: _this.latitude, // 维度
                        goods_id: _this.goods_id,
                        money: _this.money,
                        goods_arr: _this.goods_arr
                      },
                      'coupon.couponrule/couponlist',
                      token
                    )
                    api(dataS).then(res => {
                      if (res.code == 10001) {
                        _this.allMessage = res.responseData.info
                        _this.useful_count = res.responseData.useful_count
                        _this.useless_count = res.responseData.useless_count
                        if (res.responseData.info.length == 0) {
                          _this.NoDate = true
                        } else {
                          _this.NoDate = false
                          //11、优先级最高的
                          
                          _this.allMessage.forEach((item,index) => {
                            var coupon_id, couponIndex
                            if (_this.$route.query.coupon_id) {
                              couponIndex = _this.$route.query.couponIndex.split(',')
                            }
                            for (var i = 0; i < couponIndex.length; i++) {
                              if (parseInt(couponIndex[i]) === index) {
                                _this.select(index, true, item.is_use_point, item.use_show_type, item.coupon_id, item)
                                item.is_check = true
                              }
                            }
                            item.Firstsenior = false
                          })
                        }
                        if (sessionStorage.getItem('CouPon')) {
                          _this.orderNum = JSON.parse(
                            sessionStorage.getItem('CouPon')
                          ).DYnum //优惠券个数
                          _this.orderMoney = JSON.parse(
                            sessionStorage.getItem('CouPon')
                          ).DYmoney //抵用金额
                        }
                      }
                    })
                  }
                })
              },
              cancel: function (res) {
                this.$toast('用户拒绝授权获取地理位置')
              }
            })
          })
        })
      } else {
        let _this = this
        let dataS = _this.$reData(
          {
            coupon_scene_c: _this.coupon_scene_c, // 优惠券场景
            longitude: _this.longitude, // 经度
            latitude: _this.latitude, // 维度
            ins_id: _this.ins_id, // 机构ID
            status: _this.status,
            goods_id: _this.goods_id,
            money: _this.money,
            goods_arr: _this.goods_arr
          },
          'coupon.couponrule/couponlist',
          token
        )
        api(dataS).then(res => {
          if (res.code == 10001) {
            _this.allMessage = res.responseData.info
            _this.useful_count = res.responseData.useful_count
            _this.useless_count = res.responseData.useless_count
            if (res.responseData.info.length == 0) {
              _this.NoDate = true
            } else {
              _this.NoDate = false
              //11、优先级最高的
              _this.allMessage.forEach(item => {
                var coupon_id
                if (_this.$route.query.coupon_id) {
                  coupon_id = _this.$route.query.coupon_id.split(',')
                }
                if(!coupon_id) return
                for (var i = 0; i < coupon_id.length; i++) {
                  coupon_id[i] === item.coupon_id
                  item.is_check = true
                }
                item.Firstsenior = false
              })
            }
            if (sessionStorage.getItem('CouPon')) {
              _this.orderNum = JSON.parse(
                sessionStorage.getItem('CouPon')
              ).DYnum //优惠券个数
              _this.orderMoney = JSON.parse(
                sessionStorage.getItem('CouPon')
              ).DYmoney //抵用金额
            }
          }
        })
      }
    },
    tabConpon: function (id) {
      this.useSwitch = id
      this.status = id
      this.use = id;
      this.morePrice = 0
      orderPrice = 0
      this.allMessage=[]
      this.init()
      // this.orderPrice = 0
      // this.getCouponlist()
    },
    // 获取数组最小值
    getMin(arr){
      let min = parseFloat(arr[0].money), M
      if (arr.length === 1) return 0
      for(let x = 1; x < arr.length; x++){
        if(parseFloat(arr[x].money) < min){
          M = x
        } else M = 0
      }
      return M;
    },
    // 对应订单满足兑换券商品得价格 coupon_range_type优惠券范围 
    confirmPrice (goodsList, item, coupon_range_type) {
     
      // 优惠券满足得商品id
      // let goods_id_arr = item.goods_id_arr.split(',')
      let goods_id_arr = []
      // 优惠券满足的分类id
      // let category_id_arr = item.category_id_arr.split(',')
      let category_id_arr = []
      var price = 0, dikouPrice = 0, duihuanPrice = 0, goodsPrice = 0
      for (let i = 0; i < goodsList.length; i++) {
        goodsPrice += parseFloat(goodsList[i].money) * parseFloat(goodsList[i].number)
        // 满足指定商品
        if (item.coupon_range_type === '2') {
          for (let m = 0; m < goods_id_arr.length; m++) {
            if (parseInt(goods_id_arr[m]) === parseInt(goodsList[i].goods_id)) {
              // 满减情况
              // price = parseFloat(goodsList[i].money) * parseFloat(goodsList[i].number)
              price = parseFloat(item.money)
              // 抵扣情况
              dikouPrice = parseFloat(item.money)
              // 兑换券
              duihuanPrice = parseFloat(goodsList[i].money)
            }
          }
        } else if (item.coupon_range_type === '3') {
          for (let m = 0; m < category_id_arr.length; m++) {
            // 满足指定类型
            if (parseInt(category_id_arr[m]) === parseInt(goodsList[i].category_id)) {
              // 满减情况
              // price = parseFloat(goodsList[i].money) * parseFloat(goodsList[i].number)
              price = parseFloat(item.money)
              // 抵扣情况
              dikouPrice = parseFloat(item.money)
              // 兑换券
              duihuanPrice = parseFloat(goodsList[i].money)
            }
          }
        }  else if (item.coupon_range_type === '1') {
          // 满足所有
          // 满减情况
          price = parseFloat(item.money)
          // 抵扣情况
          dikouPrice = parseFloat(item.money)
          // 兑换券

          duihuanPrice = parseFloat(goodsList[this.getMin(goodsList)].money)
        } 
      }
      this.goodsPrice = goodsPrice
      return [price, dikouPrice, duihuanPrice]
    },
    select: function (index, is_check, is_use_point, use_show_type, coupon_id, item) {
      if ((this.$route.query.iscount === 'true' || this.$route.query.iscount === true) && item.is_use_point === 0) {
        this.$toast('该优惠券不能和积分同时使用')
        return
      }
      let goodsPrice = 0
      for (let i = 0; i < this.goods_arr.length; i++) {
        goodsPrice += parseFloat(this.goods_arr[i].money) * parseFloat(this.goods_arr[i].number)
      }
      orderPrice = (orderPrice === 0 && (item.is_check === false || !item.is_check)) ? (goodsPrice - orderPrice) : orderPrice
      let goods_arr = JSON.parse(sessionStorage.getItem('goods_arr'))
      item.is_check = !item.is_check
      let price = 0
      if (item.is_check === true) {
        if (item.coupon_type === '3') {
          // 满减券
          orderPrice = orderPrice - this.confirmPrice(goods_arr, item)[0]
        } else if (item.coupon_type === '1') {
          // 抵扣券
          orderPrice = orderPrice - this.confirmPrice(goods_arr, item)[1]
        }  else if (item.coupon_type === '2') {
          // 兑换券
          orderPrice = orderPrice - this.confirmPrice(goods_arr, item)[2]
        }
      } else {
        if (item.coupon_type === '3') {
          // 满减券
          orderPrice = orderPrice + this.confirmPrice(goods_arr, item)[0] - this.morePrice
        } else if (item.coupon_type === '1') {
          // 抵扣券
          orderPrice = orderPrice + this.confirmPrice(goods_arr, item)[1] - this.morePrice
        }  else if (item.coupon_type === '2') {
          // 兑换券
          orderPrice = orderPrice + this.confirmPrice(goods_arr, item)[2] - this.morePrice
        }
      }

      if (orderPrice <= 0) {
        this.morePrice = -(orderPrice)
        orderPrice = 0
      } else this.morePrice = 0
      if (orderPrice > this.goodsPrice) orderPrice = this.goodsPrice
      if (orderPrice === 0) {
        this.allMessage = this.allMessage.map(item => {
          let obj = item
          if (obj.is_check !== true) obj.isDisabled = true
          else obj.isDisabled = false
          return obj
        })
      } else {
        this.allMessage = this.allMessage.map(item => {
          let obj = item
          obj.isDisabled = false
          return obj
        })
      }
      // 获取已勾选的优惠券
      let arys = []
      for (let m = 0; m < this.allMessage.length; m++) {
        if (this.allMessage[m].is_check === true) {
          arys.push(this.allMessage[m])
        }
      }
      
      
      if (item.use_show_type === 0 && item.is_check === true  && orderPrice !== 0) {
        for (var j = 0; j < this.allMessage.length; j++) {
          if (index !== j) {
            this.allMessage[j].isDisabled = true
          }
        }
      }
        

      // 可与其它优惠券同时使用
      if (item.use_show_type === 1 &&  orderPrice !== 0) {
        let ary = []
        for (let j = 0; j < this.allMessage.length; j++) {
          let itemA = this.allMessage[j]
          if (itemA.is_check === true) {
            ary.push(itemA)
          }
        }
        for (let j = 0; j < this.allMessage.length; j++) {
          let itemA = this.allMessage[j]
          for (let i = 0; i< ary.length; i++) {
            if (itemA.coupon_id != ary[i].coupon_id &&
              itemA.use_show_type != 2 &&
              itemA.use_show_type != 0) {
              this.allMessage[j].isDisabled = true
            } else {
              this.allMessage[j].isDisabled = false
            }
          }
        }
        
      } 


      // 多张相同优惠券同时使用
      if (item.use_show_type === 2 && item.is_check === true  && orderPrice !== 0) {
        for (var j = 0; j < this.allMessage.length; j++) {
          let itemA = this.allMessage[j]
          if (itemA.coupon_id == item.coupon_id) {
            itemA.isDisabled = false
          } else {
            this.allMessage[j].isDisabled = true
          }
        }
      }

      // 规则3、1和2的集合

     if (item.use_show_type === 3 && item.is_check === true && orderPrice !== 0) {
        for (var j = 0; j < this.allMessage.length; j++) {
          let itemA = this.allMessage[j]
          itemA.isDisabled = false
            // if (itemA.coupon_id === item.coupon_id || itemA.coupon_id === ary[i].coupon_id) {
            //   itemA.isDisabled = false
            // } else {
            //   this.allMessage[j].isDisabled = true
            // }
        }
      }

      // 单独使用优惠券 选中之后其他禁用
      for (let m = 0; m < this.allMessage.length; m++) {
        if (item.is_check === true || arys.length !== 0) {
          if (this.allMessage[m].use_show_type === 0 && m !== index) {
            this.allMessage[m].isDisabled = true
          }
        }
        
      }
      // 计算使用优惠券数量
      this.couponNum = 0
      this.orderPrice = orderPrice
      for (let m = 0; m < this.allMessage.length; m++) {
        if (this.allMessage[m].is_check) {
         this.couponNum++
        }
      }
    },


    // 冒泡排序
    sortArr: function (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j + 1].money > arr[j].money) {
            // 相邻元素两两对比
            var hand = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = hand
          }
        }
      }
    },
    // 计算(商品数组，优惠券价格)
    lx_calc: function (arr, money) {
      if (arr.length > 0) {
        // 平均价
        let average = Number(money) / Number(arr.length)
        //剩余价格
        let more = 0
        do {
          more = 0
          arr.forEach(item => {
            if (item.couPonMoney + average <= item.money) {
              item.couPonMoney += average
            } else {
              more += Number(item.couPonMoney) + average - Number(item.money)
              item.couPonMoney = Number(item.money)
            }
          })

          if (more > 0) {
            let jilu = []
            arr.forEach(item => {
              if (item.money > item.couPonMoney) {
                jilu.push(item)
              }
            })

            if (jilu.length > 0) {
              arr = jilu
              average = Number(more) / Number(arr.length)
            } else {
              more = 0
            }
          }
        } while (more > 0.001)
      }
    },
    // 价格不能溢出
    Premium: function (state, arr) {
      // 选中的数组
      this.allMessage.forEach(item => {
        if (arr.includes(item) == true) {
          item.Firstsenior = false
        } else {
          item.Firstsenior = state
        }
      })
    },
    Surplus: function (arr) {
      // 传入排序商品数组this.ProductInformation
      let arr0 = [] //能选择的未选中的优惠券
      this.allMessage.forEach(item => {
        if (item.is_check == false && item.is_prohibit == false) {
          arr0.push(item)
        }
      })
      let arr1 = [] //==========指定商品==========兑换券
      let arr2 = [] //==========指定类型==========兑换券
      let arr3 = [] //==========全场商品==========兑换券
      let arr4 = [] //==========指定商品==========满减券
      let arr5 = [] //==========指定类型==========满减券
      let arr6 = [] //==========指定商品==========抵扣券
      let arr7 = [] //==========指定类型==========抵扣券
      let arr8 = [] //==========全场商品==========满减券
      let arr9 = [] //==========全场商品==========抵扣券
      arr0.forEach(item => {
        if (item.coupon_type == 2 && item.coupon_range_type == 2) {
          arr1.push(item)
        } else if (item.coupon_type == 2 && item.coupon_range_type == 3) {
          arr2.push(item)
        } else if (item.coupon_type == 2 && item.coupon_range_type == 1) {
          arr3.push(item)
        } else if (item.coupon_type == 3 && item.coupon_range_type == 2) {
          arr4.push(item)
        } else if (item.coupon_type == 3 && item.coupon_range_type == 3) {
          arr5.push(item)
        } else if (item.coupon_type == 1 && item.coupon_range_type == 2) {
          arr6.push(item)
        } else if (item.coupon_type == 1 && item.coupon_range_type == 3) {
          arr7.push(item)
        } else if (item.coupon_type == 3 && item.coupon_range_type == 1) {
          arr8.push(item)
        } else if (item.coupon_type == 1 && item.coupon_range_type == 1) {
          arr9.push(item)
        }
      })

      //商品明细this.ProductInformation
      //1、计算指定商品兑换券金额
      if (arr1.length > 0) {
        for (let i = 0; i < arr1.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              arr1[i].goods_id_arr.includes(
                this.ProductInformation[j].goods_id
              ) == true &&
              this.ProductInformation[j].couPonMoney == 0
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }

          if (goods_arr.length == 0) {
            arr1[i].Firstsenior = true
          }
        }
      }
      // 2、计算指定类型兑换券金额
      if (arr2.length > 0) {
        for (let i = 0; i < arr2.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              arr2[i].category_id_arr.includes(
                this.ProductInformation[j].category_id
              ) == true &&
              this.ProductInformation[j].couPonMoney == 0
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr2[i].Firstsenior = true
          }
        }
      }
      // 3、计算全场商品兑换券金额
      if (arr3.length > 0) {
        for (let i = 0; i < arr3.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (this.ProductInformation[j].couPonMoney == 0) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr3[i].Firstsenior = true
          }
          // console.log("17.26",goods_arr[goods_arr.length-1].money,goods_arr[goods_arr.length-1].couPonMoney)
        }
      }
      // 4、计算指定商品满减券金额
      if (arr4.length > 0) {
        for (let i = 0; i < arr4.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              arr4[i].goods_id_arr.includes(
                this.ProductInformation[j].goods_id
              ) == true &&
              this.ProductInformation[j].couPonMoney <
                this.ProductInformation[j].money
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr4[i].Firstsenior = true
          }
        }
      }
      // 5、计算指定类型满减券金额
      if (arr5.length > 0) {
        for (let i = 0; i < arr5.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              arr5[i].category_id_arr.includes(
                this.ProductInformation[j].category_id
              ) == true &&
              this.ProductInformation[j].couPonMoney <
                this.ProductInformation[j].money
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr5[i].Firstsenior = true
          }
        }
      }
      // 6、计算指定商品抵扣券金额
      if (arr6.length > 0) {
        for (let i = 0; i < arr6.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              arr6[i].goods_id_arr.includes(
                this.ProductInformation[j].goods_id
              ) == true &&
              this.ProductInformation[j].couPonMoney <
                this.ProductInformation[j].money
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr6[i].Firstsenior = true
          }
        }
      }
      // 7、计算指定类型抵扣券金额
      if (arr7.length > 0) {
        for (let i = 0; i < arr7.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              arr7[i].goods_id_arr.includes(
                this.ProductInformation[j].goods_id
              ) == true &&
              this.ProductInformation[j].couPonMoney <
                this.ProductInformation[j].money
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr7[i].Firstsenior = true
          }
        }
      }
      // 8、计算全场商品满减券金额
      if (arr8.length > 0) {
        for (let i = 0; i < arr8.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              this.ProductInformation[j].couPonMoney <
              this.ProductInformation[j].money
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr8[i].Firstsenior = true
          }
        }
      }
      // 9、计算全场商品满减券金额
      if (arr9.length > 0) {
        for (let i = 0; i < arr9.length; i++) {
          // 临时存储对应商品
          let goods_arr = []
          for (let j = 0; j < this.ProductInformation.length; j++) {
            if (
              this.ProductInformation[j].couPonMoney <
              this.ProductInformation[j].money
            ) {
              // 表示包含
              goods_arr.push(this.ProductInformation[j])
            }
          }
          if (goods_arr.length == 0) {
            arr9[i].Firstsenior = true
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.animate {
  max-height: 9999rem;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
<style lang="less" scoped>
#useConpon {
  width: 100%;
  /* height: 100vh; */
  
  /* overflow: scroll; */
  background: #f7f7f7;
  .useSwitch {
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    font-size: 0.3rem;
    z-index: 33;
    background:#fff;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    display: flex;
    border-top: 1px solid rgba(204, 204, 204, 1);
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    div {
      text-align: center;
      flex: 1;
      padding: 0.26rem 0rem;
    }
    .useSwitchitem {
      color: red;
    }
  }
  .total {
    ul {
      overflow-y: scroll;
      width: 100%;
      background: #f7f7f7;
      padding: 1.11rem 0rem;
      padding-bottom: 0.98rem;
      li {
        margin-bottom: 0.2rem;
        position: relative;
        .coupon {
          width: 7.02rem;
          margin: 0 auto;
          position: relative;
          .Datainformation {
            background: rgba(255, 255, 255, 1);
            display: flex;
            .left {
              width: 2.32rem;
              height: 2.06rem;
              position: relative;
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
                .moneyOnlyTwo{
                  font-size: 0.38rem;
                  font-weight: bold;
                  margin-top: 0.5rem;
                }
                .manzu{
                  font-size: .25rem;
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
                padding: 0.1rem 0.2rem;
                position: relative;
                span {
                  position: absolute;
                  top: 0;
                  right: 0;
                }
              }
              .name {
                padding: 0rem 0.2rem;
                .name_distance {
                  width: 100%;
                  .time {
                    font-size: 0.22rem;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(119, 119, 119, 1);
                    width: 3.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .distance {
                    // margin: 0.1rem 0rem;
                    // display: flex;
                    span {
                      float: none;
                      display: inline-block;
                    }
                    span:first-child {
                      width: 2.6rem;
                      // flex: 1;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    span:last-child {
                      width: 1.5rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
              p > span {
                float: right;
                // color: red;
              }
            }
          }
          .rule {
            font-size: 0.24rem;
            background: #ebebeb;
            color: #8a8a8a;
            line-height: 0.35rem;
            padding: .2rem 0;
            p {
              padding: 0.1rem 0.2rem;
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
        .shadow {
          position: absolute;
          top: 0;
          background: rgba(235, 235, 235, 1);
          opacity: 0.5;
          width: 100%;
          height: 100%;
        }
      }
    }
    .NoCouPon {
      width: 100%;
      font-size: 0.36rem;
      margin-top: 5rem;
      padding: 0;
      text-align: center;
    }
  }
  #footer {
    position: fixed;
    bottom: 0;
    z-index: 33;
    left: 0;
    display: flex;
    width: 100%;
    text-align: center;
    div {
      flex: 1;
      font-size: 0.3rem;
      font-family: PingFang SC;
      font-weight: 500;
      padding: 0.2rem 0rem;
    }
    .msg {
      /* background: rgba(244, 244, 244, 1); */
      background: #fff;
      font-size: 0.26rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      span {
        color: #fe4646;
      }
      p:first-child {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
      }
    }
    .ensure {
      color: rgba(255, 255, 255, 1);
      background: #fe4646;
      line-height: 0.7rem;
    }
  }
}
</style>

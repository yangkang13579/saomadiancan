<template>
  <div>
    <!-- 扫描支付页 -->
    <div class="outer" v-show="isShow&&isShowCheck">
      <div class="toubus">
        <img src="../../assets/imgs/head.png" class="headesws" />
        <p class="jingtong">{{ins_name}}</p>
        <div class="money_mums">
          <span>付款金额：</span>
          <input type="number" placeholder="请输入金额" v-model="money" @input="oninput" pattern="number" v-if="!iosOrAn" />
          <input :disabled="disable" type="tel" placeholder="请输入金额" v-model="money" @input="oninput" pattern="number" v-if="iosOrAn"
          />
          <!-- <span class="payable">应付￥{{actualPayment}}</span> -->
        </div>
        <div class="paymentTips">
          <div class="fl">
            <img src="../../assets/imgs/12-2@2x.png" width="35" height="33" />
          </div>
          <div style="padding: 0.2rem 0;">
            <!-- 支付宝酒店押金按钮未点击 -->
            <div v-if="hasIntegralTwo==false">
              <span v-show="hasIntegral">积分可为您抵扣{{useIntegral}}元</span>
              <span v-show="hasIntegral||deductionMoney" class="fr">
                还需支付
                <i v-show="hasIntegral" style="color:red;font-style:normal;font-weight: bold;">{{money?money-useIntegral-deductionMoney
                  < 0 ? 0:(((money-useIntegral-deductionMoney)*100)/100).toFixed(2):0}}</i>
                    <i v-show="!hasIntegral" style="color:red;font-style:normal;font-weight: bold;">{{money?money-deductionMoney
                      < 0 ? 0:(((money-deductionMoney)*100)/100).toFixed(2):0}}</i>元
              </span>

              <!-- <span
                v-show="!hasIntegral"
                >完成订单可获得{{userGetIntegral}}积分，价值{{userGetIntegral==0?0:userGetmoney}}元</span>-->
              <!-- <span v-show="!hasIntegral">完成订单可获得{{userGetIntegral}}积分</span> -->
              <span v-show="!hasIntegral">完成订单可获得{{userGetIntegral=="NaN"?0:userGetIntegral}}积分</span>
            </div>

            <div v-if="hasIntegralTwo==true">
              <span v-show="hasIntegral">积分可为您抵扣{{useIntegral}}元</span>
              <!-- <span v-show="!hasIntegral">完成订单可获得{{userGetIntegral}}积分</span> -->
              <span v-show="!hasIntegral">完成订单可获得{{userGetIntegral=="NaN"?0:userGetIntegral}}积分</span>
            </div>

          </div>
        </div>
        <div class="fukuans" @click="goPayment">付款</div>
      </div>
      <div class="hot" v-show="draw_info.customer_one_price&&isType!=1">
        <!-- <div class="hot"> -->
        <span class="hot_title">Hot</span>
        <div class="hot_awards">
          <span v-html="str"></span>
        </div>
      </div>









      <div class="integral">
        <span>
          您有{{point}}积分，可使用{{userCanIntegral}}积分，可为您立省
          <em style="color:#FF0000;font-style: normal;font-weight: bold;">{{useIntegral}}</em>元
        </span>
        <i :class="hasIntegral?'iconfont selection':'selection'" @click="slState">{{hasIntegral?'&#xe691;':''}}</i>
      </div>

      <div class="integral" id="coupons" @click="coupon">
        <span>选择优惠券</span>
        <span class="fr">
          <em class="iconfont" style="margin-left:20px;vertical-align: middle;color:#777777;">&#xe6b5;</em>
        </span>
      </div>
      <div class="integral" @click="securities">
        <span style="margin-right:.3rem;display:inline-block;float:left;margin-top:.1rem">领劵</span>
        <p class="man_jian" v-show="can_get_coupon_name.length!=0">
          <span class="manJian" v-show="index<=2" v-for="(item,index) in can_get_coupon_name" :key="index">{{item}}</span>
        </p>

        <span class="fr">
          <em class="iconfont" style="margin-left:0;vertical-align: middle;color:#777777;">&#xe6b5;</em>
        </span>
      </div>
      <div :class="showPaymentType?'paymentType':'hiddenPaymentType'">
        <h3>
          选择付款方式
          <i class="iconfont" @click="hiddenPaymentType">&#xe621;</i>
        </h3>
        <div class="wxPay">
          <i class="iconfont">&#xe693;</i>
          <span>微信支付</span>
          <i class="iconfont" @click="clSlPayType('wx')">{{slPayType=='wx'?'&#xe663;':''}}</i>
        </div>
        <div class="zfbPay">
          <i class="iconfont">&#xe695;</i>
          <span>支付宝支付</span>
          <i class="iconfont" @click="clSlPayType('zfb')">{{slPayType=='zfb'?'&#xe663;':''}}</i>
        </div>
        <div class="confirmPayment">确认支付</div>
      </div>
      <div class="zzc" v-show="showPaymentType" @click="hiddenPaymentType"></div>

      <!-- 二维码失效 -->
      <div class="lose_efficacy" v-show="efficacy"></div>
      <span id="lose_efficacy_text" v-show="efficacy">{{lose_text}}</span>
    </div>
    <!-- 领取店铺优惠券 -->
    <div v-show="!isShow" style="width:100%;height:100%;background:#f7f7f7;position:fixed;height:100%;oveflow:scroll">
      <div class="shop_title">
        <p>
          <span @click="getStatu(1)" :class="{'active':coupon_scene==1}">线上商品</span>
        </p>
        <p>
          <span @click="getStatu(3)" :class="{'active':coupon_scene==3}">刷脸设备</span>
        </p>
        <p>
          <span @click="getStatu(2)" :class="{'active':coupon_scene==2}">扫码支付</span>
        </p>
      </div>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">
        <div class="cou_content" style="margin-top:.2rem">
          <ul id="result_list">
            <li class="list" v-for="(item,index) in articleList" :key="index">
              <div class="conten_box">
                <div class="conten_box_left" v-show="item.coupon_type==1">
                  <p>
                    <span>￥</span>
                    <span>{{item.money}}</span>
                  </p>
                  <p>剩余:{{item.number}}</p>
                </div>
                <div class="conten_box_left" v-show="item.coupon_type==2">
                  <p style="padding:0;font-size:.48rem;font-family:PingFang SC;font-weight:bold;color:rgba(255,255,255,1);text-align:center;padding-top:.6rem;padding-bottom:.1rem">兑换券</p>
                  <p>剩余:{{item.number}}</p>
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
                    <p>{{item.name}}</p>
                    <p>{{item.start_time}}~{{item.end_time}}</p>
                    <img v-show="item.status==3" src="../../assets/imgs/sx.png" alt />
                    <button v-show="item.status==1" @click="getCoupon(item.id)">立即领取</button>
                    <button v-show="item.status==2" @click="getCoupon(item.id)">继续领取</button>
                  </div>
                  <p class="rule" @click="item.is_check=!item.is_check">
                    <span>使用规则</span>
                    <i class="iconfont" v-show="!item.is_check">&#xe72b;</i>
                    <i class="iconfont" v-show="item.is_check">&#xe72a;</i>
                  </p>
                </div>
              </div>

              <div class="rule_list" v-show="item.is_check&&item.use_type.length!=0">
                <ul>
                  <li v-for="(item,index) in item.use_type" :key="index">{{item}}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </mescroll-vue>
      <!-- 返回按钮 -->
      <button @click="isShow=true" class="btn_returns">返回</button>
    </div>
    <!-- 选择优惠券 -->
    <div v-show="!isShowCheck" style="width:100%;height:100%;background:#f7f7f7;position:fixed;height:100%;oveflow:scroll">
      <div class="Choose_coupons_title">
        <div class="returns">
          <i @click="closeReturn" class="iconfont">&#xe8b3;</i>
        </div>
        <span :class="{'active':status==1}" @click="switchoverUoup(1)">可用优惠券({{useful_count}})</span>
        <span :class="{'active':status==2}" @click="switchoverUoup(2)">不可用优惠券({{useless_count}})</span>
      </div>
      <div class="Choose_coupons_content">
        <ul style="margin-top:1.8rem">
          <li class="all" :class="{'active':!item.is_prohibit}" v-for="(item,index) in SelectUouponList" :key="index">
            <div class="cup_box">
              <!-- <div class="cup_box_left">
                <p>
                  <span>￥</span>
                  <span>{{item.money}}</span>
                </p>
              </div>-->
              <div class="cup_box_left" v-show="item.coupon_type==1">
                <p>
                  <span>￥</span>
                  <span>{{item.money}}</span>
                </p>
                <!-- <p>剩余:{{item.number}}</p> -->
              </div>
              <div class="cup_box_left" v-show="item.coupon_type==2">
                <p style="padding:0;font-size:.48rem;font-family:PingFang SC;font-weight:bold;color:rgba(255,255,255,1);text-align:center;line-height:2rem">兑换券</p>
              </div>
              <div class="cup_box_left" style="line-height:0.6rem" v-show="item.coupon_type==3">
                <p style="padding-top:.3rem">
                  <span>￥</span>
                  <span>{{item.money}}</span>
                </p>
                <p style="padding-bottom:.1rem;">满{{item.full_money}}减{{item.money}}</p>
                <!-- <p>剩余:{{item.number}}</p> -->
              </div>
              <div class="cup_box_right">
                <p>
                  <span>{{item.coupon_name}}</span>
                  <span v-show="status==1">
                    <img @click="checkUo(item,index)" v-show="item.is_check" src="../../assets/imgs/check.png" alt />
                    <img @click="checkUo(item,index)" v-show="!item.is_check" src="../../assets/imgs/ty.png" alt />
                  </span>
                </p>
                <p>{{item.ins_name}}</p>
                <p>{{item.start_time}}~{{item.end_time}}</p>
                <p>
                  <span>使用规则</span>
                  <i class="iconfont" v-show="!item.is_open" @click="item.is_open=!item.is_open">&#xe72b;</i>
                  <i class="iconfont" v-show="item.is_open" @click="item.is_open=!item.is_open">&#xe72a;</i>
                </p>
              </div>
            </div>
            <div class="cup_box_bottom" v-show="item.use_type.length!=0&&item.is_open">
              <ul>
                <li v-for="(item1,index) in item.use_type" :key="index">{{item1}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="Choose_coupons_fotter">
        <div class="Choose_coupons_fotter_left">
          <p>已选{{this.checkUoupon.length}}张优惠券</p>
          <p>
            <span>可抵用:</span>
            <span>￥{{AreadeductionMoney}}</span>
          </p>
        </div>
        <div class="Choose_coupons_fotter_right" @click="ConfirmCoupon">确认使用</div>
      </div>
    </div>
    <div :class="showTips?'tips':'Tips'">{{tipsConetent}}</div>


    <div v-if="isYaMoney" class="integral">
      <span>
        是否为押金支付
      </span>
      <i :class="hasIntegralTwo?'iconfont selection':'selection'" @click="slStateTwo">{{hasIntegralTwo?'&#xe691;':''}}</i>
    </div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import { api } from '../../components/js/api.js';
  import MescrollVue from 'mescroll.js/mescroll.vue';
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  export default {
    components: { MescrollVue },
    data() {
      return {
        str: '',
        // 二维码弹框失效的文字提示
        lose_text: '',
        // 二维码失效弹框
        efficacy: false,
        isYaMoney: false,  //押金按钮显示
        tokens: '',
        actualPayment: 0, // 用户实际支付金额
        money: '',
        hasIntegralTwo: false,//支付宝酒店场景下是否需要支付押金

        hasIntegral: false, // 是否使用品台积分
        showPaymentType: false, // 展示支付方式
        slPayType: '', // 选择支付方式
        showTips: false, // 展示提示框
        tipsConetent: '', // 提示框内容

        manage_order_integral: 0, // 用户获得积分，商家赠送比例
        store_order_integral: 0, // 用户获得积分，平台赠送比例
        real_deduction_integral: 0, // 实扣积分限制比例
        manage_convert_integral: 0, // 商家积分兑换比例
        discounts_scale: 0, // 商家优惠比例
        timeout: null, // 防抖
        timeOut2: null,
        pay_type: '', // 扫码客服端
        token: '',
        point: 0, // 用户积分
        ins_name: '', // 商家名称
        userGetIntegral: 0, // 用户获得积分
        // userGetIntegralShow: 0, // 用户获得积分-整数展示
        userGetmoney: 0, // 用户获得的积分可抵现金额
        userCanIntegral: 0, // 用户可使用积分
        // userCanIntegralShow: 0, // 用户可使用积分-整数展示
        useIntegral: 0, // 用户实际抵扣金额
        ins_user_id: 1,
        qrcode_no: 0,
        order_id: 0,
        ins_give_point: 0, // 商家积分
        ins_platform_give_point: 0, // 商家补贴积分
        ins_reword_give_point: 0, // 奖励积分
        iosOrAn: false,
        disable: true, // 禁止输入input,
        draw_info: {}, // 抽奖信息
        types: false,
        couponTypeShow: false,
        isShowSelect: false,
        showContent004: false,
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: {
          // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 // 每页数据条数,默认10
          },
          noMoreSize: 2, // 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // toTop: {
          //   // 回到顶部按钮
          //   src: './static/mescroll/mescroll-totop.png', // 图片路径,默认null,支持网络图
          //   offset: 1000 // 列表滚动1000px才显示回到顶部按钮
          // },
          htmlNodata:
            '<p class="upwarp-nodata" style="display:block">-- 到底了--</p>', // 无数据的布局
          htmlContent:
            '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>', // 布局内容
          empty: {
            // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: 'result_list', // 父布局的id (1.3.5版本支持传入dom元素)
            // icon: './static/mescroll/mescroll-empty.png', // 图标,默认null,支持网络图fcd5a68409b9c3785ce866067b67d9bb
            tip: '暂无相关优惠券~' // 提示
          }
        },
        coupon_scene: 2, // 1：线上商城 2:扫码支付 3:刷脸设备（此为领取渠道、与数据库里的本字段名有误导）
        articleList: [], // 列表数据
        isShow: true,
        isShowCheck: true,
        ins_id: '23', // 机构id
        coupon_send_type: 5, // 优惠券获取类型，4：线上领券，5:扫码页面领券，6：刷脸设备领券
        coupon_scene_c: 2, // 优惠券场景1：线上商城 2:扫码支付 3:刷脸设备
        can_get_coupon_name: [], // 可领取优惠券名称
        status: 1, // 选择优惠券类型的切换
        SelectUouponList: [], // 选择优惠券列表,
        useless_count: 0, // 不可用的优惠券
        useful_count: 0, // 可用优惠券
        checkUoupon: [], // 选中的优惠券列表
        Check_type: [], // 使用规则类型,逗号分隔拼接 0：单独使用优惠券 1：可与其他优惠券同时使用 2:可多张相同优惠券使用
        UouponNum: 0, // 优惠券张数
        deductionMoney: 0, // 优惠券金额
        AreadeductionMoney: 0, // 暂存优惠券金额
        website_support: '', // 是否已开通网站支持，0否，1是
        SelectMoney: 0, // 调取选择优惠券列表的参数,
        isType: '',
        coupon_id: '', // 选择优惠劵的id
        workingArea: [], // 暂存区
        AreacheckUoupon: [] // 暂存
      }
    },
    created() {
      if (isIOS) {
        this.iosOrAn = false
      } else if (isAndroid) {
        this.iosOrAn = true
      }
      this.IsWeixinOrAlipay()
      // alert(window.location.href)
      // alert(JSON.stringify(this.$GetRequest()))
      let index = window.location.href.indexOf('ins_user_id=')
      let index2 = window.location.href.indexOf('&qrcode_no')
      let state = this.$GetRequest().state
      if (state == 'zfb') {
        this.isYaMoney = true;  //支付宝状态押金按钮显示
        this.isType = 1
        this.ins_user_id = this.$GetRequest().ins_user_id
        this.qrcode_no = this.$GetRequest().qrcode_no
        let code = this.$GetRequest().auth_code

        let data = this.$reData(
          {
            code: code,
            ins_user_id: this.ins_user_id,
            qrcode_no: this.qrcode_no
          },
          'user.login/alipay_user_info_share',
          ''
        )
        api(data).then(json => {
          if (json.code == 10001) {
            this.disable = false
            // alert(JSON.stringify(json))
            this.token = json.responseData.token
            this.point = json.responseData.point
            this.manage_order_integral = json.responseData.manage_order_integral
            this.store_order_integral = json.responseData.store_order_integral
            this.real_deduction_integral =
              json.responseData.real_deduction_integral
            this.manage_convert_integral =
              json.responseData.manage_convert_integral
            this.discounts_scale = json.responseData.discounts_scale
            this.ins_name = json.responseData.ins_name
            this.ins_give_point = json.responseData.ins_give_point
            this.ins_platform_give_point =
              json.responseData.ins_platform_give_point
            this.ins_reword_give_point = json.responseData.ins_reword_give_point
            this.draw_info = json.responseData.draw_info
            this.can_get_coupon_name = json.responseData.can_get_coupon_name
            this.ins_id = json.responseData.ins_id
            if (json.responseData.website_support == 1) {
              this.website_support = 'aliWapPay';
            } else if (json.responseData.website_support == 0) {
              this.website_support = 'aliPrePay';
            }
            if (json.responseData.draw_info.customer_one_price) {
              this.str =
                '订单满' +
                this.draw_info.customer_one_price +
                '元可以参与抽奖:　一等奖 :' +
                this.draw_info.red_envelope_options_list[0].money +
                ';　二等奖' +
                this.draw_info.red_envelope_options_list[1].money +
                ';　三等奖' +
                this.draw_info.red_envelope_options_list[2].money +
                '　　　';
              this.lang()
            }

            // 订单满300元可以参与抽奖:　一等奖:1.00元;　二等奖:2.00元;　三等奖:3.00元
            if (this.point == 0) {
              this.hasIntegral = false
            }
          } else if (json.code == 20128) {
            this.lose_text = json.msg
            this.efficacy = true
          } else {
            this.showTipsFn(json.msg)
          }
        })
      } else if (state == 'wx#/Codepay?ins_user_id') {
        this.ins_user_id = window.location.href.slice(index + 12, index2)
        this.isYaMoney = false; //微信状态押金按钮不显示
        let code = this.$GetRequest().code
        this.qrcode_no = this.$GetRequest().qrcode_no
        // alert(this.$GetRequest().qrcode_no)
        // alert(code)
        // alert(window.location.href)
        // alert(code)
        let data = this.$reData(
          {
            code: code,
            code,
            ins_user_id: this.ins_user_id,
            qrcode_no: this.qrcode_no,
            source: 1,
            source: 1
          },
          'user.login/wx_user_info_share',
          ''
        )
        api(data).then(json => {
          // alert(JSON.stringify(json))
          if (json.code == 10001) {
            this.disable = false
            // alert(JSON.stringify(json.responseData))
            this.token = json.responseData.token
            this.point = json.responseData.point
            this.manage_order_integral = json.responseData.manage_order_integral
            this.store_order_integral = json.responseData.store_order_integral
            this.real_deduction_integral =
              json.responseData.real_deduction_integral
            this.manage_convert_integral =
              json.responseData.manage_convert_integral
            this.discounts_scale = json.responseData.discounts_scale
            this.ins_name = json.responseData.ins_name
            this.ins_give_point = json.responseData.ins_give_point
            this.ins_platform_give_point =
              json.responseData.ins_platform_give_point
            this.ins_reword_give_point = json.responseData.ins_reword_give_point
            this.draw_info = json.responseData.draw_info
            this.can_get_coupon_name = json.responseData.can_get_coupon_name
            this.ins_id = json.responseData.ins_id
            console.log(this.ins_id, '机构id')

            if (json.responseData.draw_info.customer_one_price) {
              this.str =
                '订单满' +
                this.draw_info.customer_one_price +
                '元可以参与抽奖:　一等奖 :' +
                this.draw_info.red_envelope_options_list[0].money +
                ';　二等奖' +
                this.draw_info.red_envelope_options_list[1].money +
                ';　三等奖' +
                this.draw_info.red_envelope_options_list[2].money +
                '　　　';
              this.lang()
            }

            if (this.point == 0) {
              this.hasIntegral = false
            }
          } else if (json.code == 20128) {
            //
            this.lose_text = json.msg
            this.efficacy = true
          } else {
            this.showTipsFn(json.msg)
          }
        })
      }

      // this.lang()
    },

    methods: {
      // 切换领取状态
      getStatu(id) {
        this.coupon_scene = id
        this.articleList = []
        this.mescroll.resetUpScroll()
      },
      // 选择优惠券返回按钮
      closeReturn() {
        this.isShowCheck = true
      },
      // 点击切换优惠券状态
      switchoverUoup(id) {
        this.status = id

        this.SelectUouponList = []
        let data = this.$reData(
          {
            coupon_scene_c: 2,
            ins_id: this.ins_id,
            // ins_id: 149,
            status: this.status,
            money: this.SelectMoney
          },
          'coupon.couponrule/couponlist',
          // 'fcd5a68409b9c3785ce866067b67d9bb'
          this.token
        )
        api(data).then(res => {
          if (res.code == 10001) {
            console.log(res.responseData.info, res.responseData.useful_count)

            this.checkUoupon = []
            this.SelectUouponList = res.responseData.info
            this.useful_count = res.responseData.useful_count
            this.useless_count = res.responseData.useless_count
          } else {
            alert(res.msg)
          }
        })
      },
      // 确认使用优惠劵
      ConfirmCoupon() {
        // 暂存
        this.workingArea = this.SelectUouponList
        this.AreacheckUoupon = this.checkUoupon
        this.deductionMoney = this.AreadeductionMoney
        console.log(this.workingArea, 'jj')
        this.isShowCheck = true
        if (this.checkUoupon.length != 0) {
          this.userGetIntegral = 0
        } else {
          if (
            this.ins_give_point == '0.00' &&
            this.ins_platform_give_point == '0.00'
          ) {
            let num = this.money * 1000 * (this.discounts_scale * 1000)
            num = num / (this.manage_order_integral * 100) / 10000
            num = (parseInt(num * 100) / 100).toFixed(2)

            let num2 = this.money * 1000 * (this.discounts_scale * 1000)
            num2 = num2 / (this.store_order_integral * 1000) / 1000
            num2 = (parseInt(num2 * 100) / 100).toFixed(2)
            // this.userGetIntegral;
            this.userGetIntegral = (
              parseInt(Number(num) * 100 + Number(num2) * 100) / 100
            ).toFixed(2)
            if (
              Number(this.ins_reword_give_point) < Number(this.userGetIntegral)
            ) {
              this.userGetIntegral = this.ins_reword_give_point
            }
            console.log(this.userCanIntegral, '用户可使用积分')
          } else {
            let num = this.money * 1000 * (this.discounts_scale * 1000)
            num = num / (this.manage_order_integral * 100) / 10000
            let manges = (parseInt(num * 100) / 100).toFixed(2)
            let num2 = this.money * 1000 * (this.discounts_scale * 1000)
            num2 = num2 / (this.store_order_integral * 1000) / 1000
            let store = (parseInt(num2 * 100) / 100).toFixed(2)

            if (Number(manges) > Number(this.ins_give_point)) {
              manges = this.ins_give_point
            }
            if (Number(store) > Number(this.ins_platform_give_point)) {
              store = this.ins_platform_give_point
            }
            this.userGetIntegral = (
              parseInt(Number(manges) * 100 + Number(store) * 100) / 100
            ).toFixed(2)
          }
        }
        let str = this.checkUoupon.some((v, i) => {
          return v.is_use_point == 0
        })
        // 判断选中优惠券列表中是否有不可以使用积分的规则
        // 判断优惠券金额大于输入金额的时候
        console.log(str, '是否可以')
        if (str || Number(this.money) <= Number(this.deductionMoney)) {
          this.hasIntegral = false
        }
      },
      // 点击选择优惠券
      // 点击选择优惠券
      checkUo(val, index) {
        console.log(val, '点中的')
        let currentMonrey = 0
        // 每次点击判断是选中的状态还是取消选中的状态
        // 判断当前是不是被禁止的状态
        if (val.is_prohibit) {
          if (val.is_check) {
            // 取消,切掉那个
            // 判断选中的是不是只有一个
            currentMonrey =
              parseInt(
                Number(this.AreadeductionMoney) * 100 - Number(val.money) * 100
              ) / 100
            if (this.checkUoupon.length == 1) {
              console.log('只有一个')
              this.SelectUouponList = this.SelectUouponList.map((v, i) => {
                v.is_prohibit = true
                v.is_check = false
                return v
              })
            } else {
              // 判断当前的取消的编号在中选列表中是否依然存在
              // 取消的是2
              if (val.use_show_type == 2 || val.use_show_type == 3) {
                this.SelectUouponList.map((v, i) => {
                  if (i == index) {
                    v.is_check = false
                  }
                })
              } else if (val.use_show_type == 1) {
                this.SelectUouponList.map((v, i) => {
                  if (i != index) {
                    if (val.couponid == v.couponid) {
                      v.is_prohibit = true
                    }
                  } else {
                    v.is_check = false
                  }
                })
              }
            }
            this.checkUoupon = this.checkUoupon.filter((v, i) => {
              return v.user_coupon_id != val.user_coupon_id
            })
            this.SelectUouponList.map((v, i) => {
              if (v.use_show_type == 1) {
                let res = this.checkUoupon.some((a, b) => {
                  if (a.user_coupon_id != v.user_coupon_id) {
                    return (
                      a.couponid == v.couponid ||
                      (a.use_show_type == 0 || a.use_show_type == 2)
                    )
                  }
                })
                if (res) {
                  v.is_prohibit = false
                  // v.is_check = false
                } else {
                  v.is_prohibit = true
                }
              } else if (v.use_show_type == 2) {
                let res2 = this.checkUoupon.some((a, b) => {
                  return a.couponid != v.couponid
                })
                // res ? (v.is_prohibit = false) : (v.is_prohibit = true)
                if (res2) {
                  v.is_prohibit = false
                  v.is_check = false
                } else {
                  v.is_prohibit = true
                }
              } else if (v.use_show_type == 3) {
                let res3 = this.checkUoupon.some((a, b) => {
                  return a.use_show_type == 2 || a.use_show_type == 0
                })
                if (res3) {
                  v.is_prohibit = false
                  v.is_check = false
                } else {
                  v.is_prohibit = true
                }
              }
            })
            console.log(this.checkUoupon, '选中')
          } else {
            // 选中
            currentMonrey =
              parseInt(
                Number(this.AreadeductionMoney) * 100 + Number(val.money) * 100
              ) / 100
            this.checkUoupon.push(val)
            console.log(this.checkUoupon, '选中')
            // 排序
            this.checkUoupon.sort(this.compare('money'))
            if (Number(currentMonrey) >= Number(this.money)) {
              this.SelectUouponList.map((v, i) => {
                if (i != index) {
                  if (v.is_prohibit) {
                    if (!v.is_check) {
                      v.is_prohibit = false
                    }
                  }
                }
              })
            }
            // 判断选中的是否是0
            if (val.use_show_type == 0) {
              this.SelectUouponList = this.SelectUouponList.map((v, i) => {
                if (i != index) {
                  v.is_check = false
                  v.is_prohibit = false
                } else {
                  v.is_check = !v.is_check
                }
                return v
              })
            } else {
              //  判断此时优惠券的金额 >= 输入金额
              if (val.use_show_type == 1) {
                // 判断编号是否是一样
                this.SelectUouponList = this.SelectUouponList.map((v, i) => {
                  if (v.is_prohibit) {
                    // 找到那些没有被静止的
                    if (i != index) {
                      // 只看编号不相等
                      if (
                        v.couponid != val.couponid &&
                        v.use_show_type != 0 &&
                        v.use_show_type != 2
                      ) {
                        v.is_prohibit = true
                      } else {
                        v.is_prohibit = false
                      }
                    } else {
                      v.is_check = true
                      v.is_prohibit = true
                    }
                  }
                  return v
                })
              } else if (val.use_show_type == 2) {
                // 只看编号相等的
                this.SelectUouponList = this.SelectUouponList.map((v, i) => {
                  if (v.is_prohibit) {
                    if (i != index) {
                      if (v.couponid == val.couponid) {
                        v.is_prohibit = true
                      } else {
                        v.is_prohibit = false
                        v.is_check = false
                      }
                    } else {
                      v.is_check = true
                    }
                  }
                  return v
                })
              } else if (val.use_show_type == 3) {
                // 只看规则,0和2不能
                this.SelectUouponList = this.SelectUouponList.map((v, i) => {
                  if (v.is_prohibit) {
                    if (i != index) {
                      if (v.use_show_type == 3 || v.use_show_type == 1) {
                        v.is_prohibit = true
                      } else {
                        v.is_prohibit = false
                      }
                    } else {
                      v.is_check = true
                    }
                  }
                  return v
                })
              }
              // 此时再次判断
              // 判断将优惠券金额减去数组中最小一项 > 输入金额
              if (this.checkUoupon.length != 0) {
                this.feng(currentMonrey)
              }
            }
          }
        } else {
          console.log('被禁止')
          return false
        }
      },
      // 封装一个方法将数组的金额从小到大排列
      compare(property) {
        // 按照数组中的对象属性进行排序
        return function (a, b) {
          var value1 = a[property]
          var value2 = b[property]
          return value2 - value1
        };
      },
      // 封装递归的方法
      feng(currentMonrey) {
        if (
          Number(currentMonrey) -
          Number(this.checkUoupon[this.checkUoupon.length - 1].money) >
          Number(this.money)
        ) {
          this.SelectUouponList.map((v, i) => {
            if (
              v.couponid == this.checkUoupon[this.checkUoupon.length - 1].couponid
            ) {
              v.is_prohibit = false
              v.is_check = false
            }
          })
          this.checkUoupon.pop()
          console.log(this.checkUoupon, '切除过后')
          this.feng(currentMonrey)
        } else {
          return false
        }
      },
      // 选择优惠卷列表
      coupon() {

        // 判断如果支付宝押金按钮点击了勾选
        if (this.hasIntegralTwo == true) {
          this.showTipsFn('押金支付暂不支持使用优惠卷')
          return
        }
        // 判断如果支付宝押金按钮未勾选
        else {
          // 判断选择金额是否和输入的金额一致
          if (Number(this.money) > 0) {
            this.isShowCheck = false
          }
          if (this.SelectMoney == this.money && Number(this.money) > 0) {
            this.SelectUouponList = this.workingArea.map((v, i) => {
              return Object.assign({}, v)
            })
            this.checkUoupon = this.AreacheckUoupon.map((v, i) => {
              return Object.assign({}, v)
            })
            console.log(this.checkUoupon, '选中的')

            return false
          } else {
            this.SelectMoney = this.money
            this.SelectUouponList = []
            this.checkUoupon = []
            let data = this.$reData(
              {
                coupon_scene_c: this.coupon_scene_c,
                ins_id: this.ins_id,
                // ins_id: 25,
                status: this.status,
                money: this.SelectMoney
              },
              'coupon.couponrule/couponlist',
              // 'fcd5a68409b9c3785ce866067b67d9bb'
              this.token
            )
            console.log(this.SelectMoney, '金额')
            api(data).then(res => {
              console.log(res, '选择')
              if (res.code == 10001) {
                if (res.responseData.length != 0) {
                  this.isShowCheck = false
                  this.SelectUouponList = res.responseData.info
                  // this.workingArea = res.responseData.info
                  this.workingArea = this.SelectUouponList.map((v, i) => {
                    return Object.assign({}, v)
                  })
                  this.useful_count = res.responseData.useful_count
                  this.useless_count = res.responseData.useless_count
                } else {
                  return false
                }
              } else {
                this.showTipsFn(res.msg)
              }
            })
          }
        }
      },
      //  点击领卷按钮领取
      securities() {
        // 判断如果支付宝押金按钮点击了勾选
        if (this.hasIntegralTwo == true) {
          this.showTipsFn('押金支付暂不支持领券')
          return
        } else {
          this.isShow = false
          this.articleList = []
          this.mescroll.resetUpScroll()
        }

      },
      // 点击领取优惠券
      getCoupon(id) {
        let data = this.$reData(
          {
            coupon_id: id,
            get_type: 2
          },
          'activity.coupon/user_get_coupon',
          this.token
          // 'fcd5a68409b9c3785ce866067b67d9bb'
        )
        api(data).then(res => {
          console.log(res)
          if (res.code == 10001) {
            this.articleList = []
            this.mescroll.resetUpScroll()
          } else {
            console.log('cuowu l')

            this.showTipsFn(res.msg)
          }
        })
      },
      // 领取优惠券
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      upCallback(page, mescroll) {
        let _this = this
        let datas = _this.$reData(
          {
            ins_id: _this.ins_id,
            coupon_scene: _this.coupon_scene,
            coupon_send_type: 5,
            page: page.num,
            page_size: 10
          },
          'coupon.store/list',
          this.token
          // 'fcd5a68409b9c3785ce866067b67d9bb'
        )
        console.log(this.ins_id, this.coupon_scene, this.coupon_send_type)

        api(datas).then(res => {
          console.log(res, 'shushu')
          if (res.code == 10001) {
            let data = page.num == 1 ? [] : this.articleList
            data.push(...res.responseData.data)
            _this.articleList = data
            // 数据渲染成功后,隐藏下拉刷新的状态
            _this.$nextTick(() => {
              mescroll.endSuccess(res.responseData.data.length)
            })
          }
        })
      },
      // 奖项实现跑马灯效果
      lang() {
        console.log(this.str)
        var _this = this
        setInterval(function () {
          // 获取第一个字符
          var start = _this.str.substring(0, 1)
          // 得到后面的字符
          var end = _this.str.substring(1)
          // 重新赋值
          _this.str = end + start
        }, 300)
      },
      oninput(e) {
        // 通过正则过滤小数点后两位
        e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
        console.log('e', e.target.value)

        if (e.target.value.indexOf('.') === -1) {
          if (e.target.value.length >= 7) {
            e.target.value = e.target.value.substring(0, 6)
          }
        } else if (e.target.value.length >= 10) {
          e.target.value = e.target.value.substring(0, 9)
        }
        if (e.target.value == '.') {
          e.target.value = Number('0.')
        }

        this.money = e.target.value
      },
      // 付款
      goPayment() {

        if (!this.money) {
          this.showTipsFn('请输入金额')
          return;
        }
        // if (this.money.indexOf('00') != -1) {
        //   this.money = this.money.replace(/^0*/, '')
        // }
        // if (this.money.indexOf('0.0.') != -1) {
        //   this.money = '0';
        // }
        if (this.money.trim() == '0.0.') {
          this.money = '0';
        }
        if (this.money.trim() == '00') {
          this.money = '0';
        }

        if (this.money.trim() == '0.00') {
          this.money = '0';
        }
        if (this.money.trim() == '0.0') {
          this.money = '0';
        }

        //  this.showPaymentType = true
        //  防抖
        if (this.timeout !== null) {
          clearTimeout(this.timeout)
        }
        let arr = []
        this.checkUoupon.forEach((v, i) => {
          arr.push(v.user_coupon_id)
        })
        this.coupon_id = arr.join(',')
        console.log(arr, '数组arr')
        console.log(this.coupon_id, '优惠券id')
        console.log(this.deductionMoney, '折扣')
        let that = this
        this.timeout = setTimeout(() => {
          if (this.pay_type == 'weixin') {
            if (!this.token) {
              this.showTipsFn('未登录，请先登录')
            } else {
              //   微信付款
              if (!this.hasIntegral) {
                this.userCanIntegral = 0
                this.useIntegral = 0
              }
              let wxpay = this.$reData(
                {
                  pay_type: 'wxJsapiPay',
                  pay_scene: 1,
                  ins_user_id: this.ins_user_id,
                  qrcode_no: this.qrcode_no,
                  pay_money:
                    this.money - this.useIntegral - this.deductionMoney < 0
                      ? 0
                      : (
                        parseInt(
                          this.money * 100 -
                          this.useIntegral * 100 -
                          this.deductionMoney * 100
                        ) / 100
                      ).toFixed(2),
                  point: this.userCanIntegral,
                  point_money: this.useIntegral,
                  pay_pattern: 2,
                  money: this.money,
                  is_use_point: this.hasIntegral,
                  user_coupon_id: this.coupon_id,
                  coupon_money: this.deductionMoney
                },
                'order.pay/entrance',
                this.token
              )
              console.log(this.money, '支付金额')

              api(wxpay).then(json => {
                if (json.code == 10001) {
                  // alert(JSON.stringify(json))
                  that.order_id = json.responseData.order_id
                  // if (this.money - this.useIntegral <= 0) {
                  //   that.$router.push({
                  //     path: '/payOrder',
                  //     query: { order_id: that.order_id, token: that.token }
                  //   })
                  // } else {
                  this.wxpay(json.responseData.app_response)
                  // }
                  // alert(JSON.stringify(json.responseData))
                  // alert(json.responseData.order_id)
                } else if (json.code == 10002) {
                  that.order_id = json.responseData.order_id
                  that.$router.push({
                    path: '/payOrder',
                    query: { order_id: that.order_id, token: that.token }
                  })
                } else if (json.code == 20093) {
                  // alert('订单金额参数错误')
                  this.showTipsFn('订单金额参数错误')
                  if (isAndroid) {
                    document.addEventListener(
                      'WeixinJSBridgeReady',
                      function () {
                        WeixinJSBridge.call('closeWindow')
                      },
                      false
                    )
                  }
                  if (isIOS) {
                    WeixinJSBridge.call('closeWindow')
                  }
                } else {
                  this.showTipsFn(json.msg)
                  // alert(json.msg)
                }
              })
            }
          }
          else if (this.pay_type == 'zfb') {
            //走支付宝押金
            if (this.hasIntegralTwo == true) {
              // 支付宝付款
              let zfbpay = this.$reData(
                {
                  pay_type: 'aliFreezePay', //支付方式
                  pay_scene: 1,                   //支付场景
                  ins_user_id: this.ins_user_id,  //机构用户id
                  qrcode_no: this.qrcode_no,
                  pay_money: this.money,
                  point: 0,
                  point_money: 0,
                  pay_pattern: 2,
                  money: this.money,
                  deposit_status: 1
                  // is_use_point: '',
                  // user_coupon_id: this.coupon_id,
                  // user_coupon_id: '',
                  // coupon_money: this.deductionMoney
                },
                'order.pay/entrance',
                this.token
              )
              api(zfbpay).then(json => {
                // alert(JSON.stringify(json))
                if (json.code == 10001) {
                  // const div = document.createElement('div')
                  // div.innerHTML = json.responseData
                  // document.body.appendChild(div)
                  // document.forms.alipaysubmit.submit()
                  window.location.href = json.responseData
                }
                else if (json.code == 10002) {
                  that.order_id = json.responseData.order_id
                  that.$router.push({
                    path: '/payOrder',
                    query: { order_id: that.order_id, token: that.token }
                  })
                }
                else if (json.code == 20093) {
                  this.showTipsFn(json.msg)
                  if (isAndroid) {
                    document.addEventListener(
                      'WeixinJSBridgeReady',
                      function () {
                        WeixinJSBridge.call('closeWindow')
                      },
                      false
                    )
                  }
                  if (isIOS) {
                    WeixinJSBridge.call('closeWindow')
                  }
                }
                else {
                  this.showTipsFn(json.msg)
                }
              })

            }
            //不走支付宝押金入口
            else {

              if (!this.hasIntegral) {
                this.userCanIntegral = 0
                this.useIntegral = 0
              }
              // 支付宝付款
              let zfbpay = this.$reData(
                {
                  pay_type: this.website_support,
                  pay_scene: 1,
                  ins_user_id: this.ins_user_id,
                  qrcode_no: this.qrcode_no,
                  pay_money:
                    this.money - this.useIntegral - this.deductionMoney < 0
                      ? 0
                      : (
                        parseInt(
                          this.money * 100 -
                          this.useIntegral * 100 -
                          this.deductionMoney * 100
                        ) / 100
                      ).toFixed(2),
                  point: this.userCanIntegral,
                  point_money: this.useIntegral,
                  pay_pattern: 2,
                  money: this.money,
                  is_use_point: this.hasIntegral,
                  user_coupon_id: this.coupon_id,
                  coupon_money: this.deductionMoney
                },
                'order.pay/entrance',
                this.token
              )
              api(zfbpay).then(json => {
                // alert(JSON.stringify(json))
                if (json.code == 10001) {
                  // if (this.money - this.useIntegral <= 0) {
                  //   that.order_id = json.responseData.order_id
                  //   that.$router.push({
                  //     path: '/payOrder',
                  //     query: { order_id: that.order_id, token: that.token }
                  //   })
                  // } else {
                  // alert(JSON.stringify(json))

                  //
                  if (this.website_support == 'aliWapPay') {
                    const div = document.createElement('div')
                    div.innerHTML = json.responseData
                    document.body.appendChild(div)
                    document.forms.alipaysubmit.submit()
                  }
                  else if (this.website_support == 'aliPrePay') {
                    window.location.href = json.responseData
                  }

                  // }
                }
                else if (json.code == 10002) {
                  that.order_id = json.responseData.order_id
                  that.$router.push({
                    path: '/payOrder',
                    query: { order_id: that.order_id, token: that.token }
                  })
                }
                else if (json.code == 20093) {
                  this.showTipsFn(json.msg)
                  if (isAndroid) {
                    document.addEventListener(
                      'WeixinJSBridgeReady',
                      function () {
                        WeixinJSBridge.call('closeWindow')
                      },
                      false
                    )
                  }
                  if (isIOS) {
                    WeixinJSBridge.call('closeWindow')
                  }
                }
                else {
                  this.showTipsFn(json.msg)
                }
              })
            }
          }
          else if (this.pay_type == 'app') {
          }
        }, 250)



      },
      // 使用积分状态
      slState() {
        if (this.hasIntegralTwo == true) {
          this.showTipsFn('押金支付暂不支持使用积分')
          this.hasIntegral = false

        } else {


          if (this.point == 0.0) {
            this.showTipsFn('无可使用积分')
            this.hasIntegral = false
          } else if (this.useIntegral == 0) {
            console.log(this.useIntegral, '00000')

            this.hasIntegral = false
          } else if (Number(this.money) <= Number(this.deductionMoney)) {
            // 当输入金额小于优惠券的金额,不在使用积分抵扣
            this.hasIntegral = false
            console.log(this.money, this.deductionMoney, '勾选比较')
          } else {
            this.hasIntegral = !this.hasIntegral
          }
          if (this.checkUoupon.length != 0) {
            let str = this.checkUoupon.some((v, i) => {
              return v.is_use_point == 0
            })
            console.log(str, '是否可以')
            if (str) {
              this.showTipsFn('积分不可与优惠券同时使用')
              this.hasIntegral = false
            }
          }
        }
      },

      //支付宝酒店场景下
      slStateTwo() {
        if (this.hasIntegralTwo == true) {
          this.hasIntegralTwo = false
          if (this.hasIntegral == true) {
            this.hasIntegral = false
          }

        } else {
          this.hasIntegralTwo = true
          this.hasIntegral = false
        }





      },





      // 选择支付方式
      clSlPayType(val) {
        this.slPayType = val
      },
      // 点击遮罩层隐藏支付方式
      hiddenPaymentType() {
        this.showPaymentType = false
      },

      // 自制消息提示
      showTipsFn(val) {
        console.log(1111111)

        clearTimeout(this.timeOut2)
        this.tipsConetent = val
        this.showTips = true
        this.timeOut2 = setTimeout(() => {
          this.showTips = false
          this.tipsConetent = '';
        }, 2000)
      },
      // 自制消息提示强制退出
      showTipsFnout(val) {
        // clearTimeout(this.timeOut2)
        this.tipsConetent = val
        this.showTips = true
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
      wxpay(pay) {
        //   alert(pay)
        console.log(1)
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener(
              'WeixinJSBridgeReady',
              this.onBridgeReady,
              false
            )
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        } else {
          this.onBridgeReady(pay)
        }
      },
      // 微信支付参数
      onBridgeReady(pay) {
        let _that = this
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            debug: true,
            appId: pay.appId, // 公众号名称，由商户传入
            timeStamp: pay.timeStamp + '', // 时间戳，自1970年以来的秒数
            nonceStr: pay.nonceStr, // 随机串
            package: pay.package,
            signType: pay.signType, // 微信签名方式：
            paySign: pay.paySign // 微信签名
          },
          function (res) {
            console.log(res)
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              // alert('支付成功')
              setTimeout(() => {
                _that.$router.push({
                  path: '/payOrder',
                  query: { order_id: _that.order_id, token: _that.token }
                })
              }, 1000)
            } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
              // alert('用户取消支付')
              let data = _that.$reData(
                { order_id: _that.order_id },
                'order.index/cancel_offline_order'
              )
              api(data).then(res => { })
            } else {
              // alert('支付失败!')
            }
          }
        )
      }
    },
    beforeRouteEnter: (to, from, next) => {
      console.log(to, 'to')

      next(vm => {
        if (from.name == 'payOrder') {
          if (isAndroid) {
            document.addEventListener(
              'WeixinJSBridgeReady',
              function () {
                WeixinJSBridge.call('closeWindow')
              },
              false
            )
          }
          if (isIOS) {
            WeixinJSBridge.call('closeWindow')
          }
        }
      })
    },
    watch: {
      hasIntegral() {
        if (this.money) {
          console.log('景来了')
          if (this.hasIntegralTwo == true) {
            this.hasIntegral = false
          }
          else {



            // if (this.hasIntegral) {
            // 如果选中
            // 用户可使用积分
            // this.userCanIntegral = Math.floor(
            //   this.money * this.discounts_scale * this.real_deduction_integral
            // )
            // this.userCanIntegral = (
            //   parseInt(
            //     this.money *
            //       100 *
            //       (this.discounts_scale * 100) *
            //       (this.real_deduction_integral * 100) *
            //       100
            //   ) / 100000000
            // ).toFixed(2)
            let num =
              this.money *
              100 *
              (this.discounts_scale * 100) *
              (this.real_deduction_integral * 100)
            this.userCanIntegral = Number((parseInt(num / 10000) / 100).toFixed(2))

            if (Number(this.point) < Number(this.userCanIntegral)) {
              this.userCanIntegral = this.point
            }
            // if (this.userCanIntegral < 1) {
            //   this.userCanIntegral = 0
            // }
            // 用户使用积分可抵用金额
            this.useIntegral = (
              parseInt(
                (this.userCanIntegral *
                  1000 *
                  (this.manage_convert_integral * 1000)) /
                10000
              ) / 100
            ).toFixed(2)
            if (Number(this.useIntegral) == 0) {
              this.userCanIntegral = 0
              this.hasIntegral = false
            }
            // 如果用户所支付金额小于抵扣金额
            if (Number(this.useIntegral) > Number(this.money)) {
              console.log(
                '如果用户所支付金额小于抵扣金额',
                this.useIntegral,
                this.money
              )

              this.useIntegral = this.money
              this.userCanIntegral = (
                this.useIntegral / this.manage_convert_integral
              ).toFixed(2)
            }
            // 判断用户可省金额等关于0.00,用户可使用积分为0
            // if (Number(this.useIntegral) <= 0) {
            //   this.userCanIntegral = 0.0
            // }
            // } else {
            if (this.hasIntegral) {
              // 实际所付款金额
              this.actualPayment =
                Math.floor(
                  (this.money -
                    this.money *
                    this.discounts_scale *
                    this.real_deduction_integral *
                    this.manage_convert_integral) *
                  100
                ) / 100
            }
            else {
              this.actualPayment = this.money
            }
            // 用户获得积分
            // this.userGetIntegral = (
            //   (this.money * this.discounts_scale) / this.manage_order_integral +
            //   (this.money * this.discounts_scale) / this.store_order_integral
            // ).toFixed(2)
            // 判断商家积分和补贴积分均为0
            if (
              this.ins_give_point == '0.00' &&
              this.ins_platform_give_point == '0.00'
            ) {
              let num = this.money * 1000 * (this.discounts_scale * 1000)
              num = num / (this.manage_order_integral * 100) / 10000
              num = (parseInt(num * 100) / 100).toFixed(2)

              let num2 = this.money * 1000 * (this.discounts_scale * 1000)
              num2 = num2 / (this.store_order_integral * 1000) / 1000
              num2 = (parseInt(num2 * 100) / 100).toFixed(2)
              // this.userGetIntegral;
              this.userGetIntegral = (
                parseInt(Number(num) * 100 + Number(num2) * 100) / 100
              ).toFixed(2)
              if (
                Number(this.ins_reword_give_point) < Number(this.userGetIntegral)
              ) {
                this.userGetIntegral = this.ins_reword_give_point
              }
              console.log(this.userCanIntegral, '用户可使用积分')
            }
            else {
              let num = this.money * 1000 * (this.discounts_scale * 1000)
              num = num / (this.manage_order_integral * 100) / 10000
              let manges = (parseInt(num * 100) / 100).toFixed(2)
              let num2 = this.money * 1000 * (this.discounts_scale * 1000)
              num2 = num2 / (this.store_order_integral * 1000) / 1000
              let store = (parseInt(num2 * 100) / 100).toFixed(2)

              if (Number(manges) > Number(this.ins_give_point)) {
                manges = this.ins_give_point
              }
              if (Number(store) > Number(this.ins_platform_give_point)) {
                store = this.ins_platform_give_point
              }
              this.userGetIntegral = (
                parseInt(Number(manges) * 100 + Number(store) * 100) / 100
              ).toFixed(2)
            }
            // 用户获得积分可抵现金额
            // this.userGetmoney = Math.floor(this.userGetIntegral * 10 * this.manage_convert_integral * 10 / 100 * 100) / 100
            this.userGetmoney = (
              parseInt(
                this.userGetIntegral * 10 * this.manage_convert_integral * 10
              ) / 100
            ).toFixed(2)
            // 判断是否有选择优惠券
            if (this.checkUoupon.length != 0) {
              this.userGetIntegral = 0
            }
            // }
          }
        }
        else {
          console.log('空来了')
          this.actualPayment = 0
          this.userGetIntegral = 0
          this.userGetmoney = 0
          this.userCanIntegral = 0
          this.useIntegral = 0
        }
      },
      money() {
        this.SelectMoney = 0
        if (this.money) {
          this.checkUoupon = []
          this.deductionMoney = 0
          console.log('景来了')
          let num =
            this.money *
            100 *
            (this.discounts_scale * 100) *
            (this.real_deduction_integral * 100)
          this.userCanIntegral = Number((parseInt(num / 10000) / 100).toFixed(2))

          if (Number(this.point) < Number(this.userCanIntegral)) {
            this.userCanIntegral = this.point
          }
          if (Number(this.userCanIntegral) <= 0) {
            this.hasIntegral = false
          } else {
            this.hasIntegral = true
          }
          // 用户使用积分可抵用金额
          this.useIntegral = Number(
            parseInt(
              (this.userCanIntegral *
                1000 *
                (this.manage_convert_integral * 1000)) /
              10000
            ) / 100
          ).toFixed(2)

          if (Number(this.useIntegral) == 0) {
            this.hasIntegral = false
            this.userCanIntegral = 0
          }
          // 判断用户可省金额等关于0.00,用户可使用积分为0
          // if (Number(this.useIntegral) <= 0) {
          //   this.userCanIntegral = 0.0
          // }

          // 如果用户所支付金额小于抵扣金额
          if (Number(this.useIntegral) > Number(this.money)) {
            console.log(
              '如果用户所支付金额小于抵扣金额',
              this.useIntegral,
              this.money
            )
            this.useIntegral = this.money
            this.userCanIntegral = (
              this.useIntegral / this.manage_convert_integral
            ).toFixed(2)
          }
          // } else {
          if (this.hasIntegral) {
            // 实际所付款金额
            this.actualPayment =
              Math.floor(
                (this.money -
                  this.money *
                  this.discounts_scale *
                  this.real_deduction_integral *
                  this.manage_convert_integral) *
                100
              ) / 100
          } else {
            this.actualPayment = this.money
          }
          if (
            this.ins_give_point == '0.00' &&
            this.ins_platform_give_point == '0.00'
          ) {
            // this.userGetIntegral = (
            //   parseInt(
            //     ((this.money * this.discounts_scale) /
            //       this.manage_order_integral +
            //       (this.money * this.discounts_scale) /
            //         this.store_order_integral) *
            //       100
            //   ) / 100
            // ).toFixed(2)
            let num = this.money * 1000 * (this.discounts_scale * 1000)
            num = num / (this.manage_order_integral * 100) / 10000
            num = (parseInt(num * 100) / 100).toFixed(2)

            let num2 = this.money * 1000 * (this.discounts_scale * 1000)
            num2 = num2 / (this.store_order_integral * 1000) / 1000
            num2 = (parseInt(num2 * 100) / 100).toFixed(2)

            this.userGetIntegral = (
              parseInt(Number(num) * 100 + Number(num2) * 100) / 100
            ).toFixed(2)

            if (
              Number(this.ins_reword_give_point) < Number(this.userGetIntegral)
            ) {
              this.userGetIntegral = this.ins_reword_give_point
            }
          } else {
            // let manges = (
            //   parseInt(
            //     (this.money * 1000 * (this.discounts_scale * 1000)) /
            //       (this.manage_order_integral * 1000) /
            //       1000
            //   ) / 100
            // ).toFixed(2)
            let num = this.money * 1000 * (this.discounts_scale * 1000)
            num = num / (this.manage_order_integral * 100) / 10000
            let manges = (parseInt(num * 100) / 100).toFixed(2)

            // let store = (
            //   parseInt(
            //     ((this.money * 100 * (this.discounts_scale * 100)) /
            //       (this.store_order_integral * 100) /
            //       100) *
            //       100
            //   ) / 100
            // ).toFixed(2)
            let num2 = this.money * 1000 * (this.discounts_scale * 1000)
            num2 = num2 / (this.store_order_integral * 1000) / 1000
            let store = (parseInt(num2 * 100) / 100).toFixed(2)

            if (Number(manges) > Number(this.ins_give_point)) {
              manges = this.ins_give_point
            }
            if (Number(store) > Number(this.ins_platform_give_point)) {
              store = this.ins_platform_give_point
            }
            this.userGetIntegral = (
              parseInt(Number(manges) * 100 + Number(store) * 100) / 100
            ).toFixed(2)
          }
          // 用户获得积分可抵现金额
          this.userGetmoney = (
            parseInt(
              this.userGetIntegral * 10 * this.manage_convert_integral * 10
            ) / 100
          ).toFixed(2)
        } else {
          console.log('空来了')
          this.hasIntegral = false
          this.actualPayment = 0
          this.userGetIntegral = 0
          this.userGetmoney = 0
          this.userCanIntegral = 0
          this.useIntegral = 0
        }
      },
      // 优惠劵的金额
      checkUoupon() {
        if (this.checkUoupon.length == 0) {
          this.AreadeductionMoney = 0
        } else {
          this.AreadeductionMoney = 0
          this.checkUoupon.forEach((v, i) => {
            // if (v.is_check) {
            this.AreadeductionMoney = (
              parseInt(
                Number(this.AreadeductionMoney) * 1000 + Number(v.money) * 1000
              ) / 1000
            ).toFixed(2)
            // }
            console.log(this.AreadeductionMoney, '抵扣金额')
          })
        }
      }
    }
  }
</script>

<style scoped>
  #result_list {
    /* margin-bottom: 1rem; */
  }

  #result_list li.list:last-child {
    /* margin-bottom: 1.5rem; */
  }

  .mescroll>>>.mescroll-upwarp {
    padding: 0;
    min-height: 0.2rem;
    height: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .mescroll-upwarp .upwarp-nodat {
    display: block;
  }
</style>
<style scoped lang='less'>
  .shop_title {
    display: flex;
    text-align: center;
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    background: #ffffff;
    p {
      width: 33.33rem;
      span {
        padding: 0.26rem 0 0.18rem;
        display: inline-block;
      }
      span.active {
        border-bottom: 0.02rem solid #e2391c;
        color: #e2391c;
      }
    }
  }

  .returns {
    text-align: center; // border-bottom: 1px solid #cccccc;
    line-height: 0.8rem; // padding-left: 0.3rem;
  }

  button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent; //自定义边框
    outline: none;
  }

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .man_jian {
    display: inline-block; // width: 3.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn_returns {
    width: 7.05rem;
    height: 0.82rem;
    margin: 0 auto;
    position: fixed;
    bottom: 0.2rem;
    font-size: 0.36rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.4rem;
    background: #e2391c;
    z-index: 999;
  }

  .Choose_coupons_title {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
    background: #ffffff;
    border-bottom: 1px solid #cccccc;
    span {
      float: left;
      width: 50%;
      text-align: center;
      padding: 0.26rem 0;
    }
    span.active {
      color: #e2391c;
      font-weight: bold;
    }
  }

  .Choose_coupons_content {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    overflow: scroll;
    box-sizing: border-box; // top: 1rem;
    padding: 0.2rem 0.18rem 0 0.18rem;
    ul {
      li {
        margin-bottom: 0.2rem;
        .cup_box {
          background: #ffffff;
          display: flex;
          width: 100%;
          .cup_box_left {
            width: 2.32rem;
            height: 2.06rem;
            background: url("../../assets/imgs/jx.png") no-repeat;
            background-size: 100%;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 2rem;
            p:nth-child(1) {
              // padding-top: 0.4rem;
              padding-bottom: 0.1rem;
              span:nth-child(2) {
                font-size: 0.48rem;
              }
            }
          }
          .cup_box_right {
            width: 65%;
            p:nth-child(1) {
              padding-left: 0.2rem;
              font-size: 0.24rem;
              overflow: hidden;
              span:nth-child(1) {
                font-size: 0.28rem;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                padding-top: 0.28rem;
                float: left;
              }
              span:nth-child(2) {
                float: right;
                img {
                  width: 0.46rem;
                  height: 0.46rem;
                  padding: 0.16rem 0.15rem 0 0;
                }
              }
            }
            p:nth-child(2) {
              padding-left: 0.2rem;
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              padding-top: 0.2rem;
            }
            p:nth-child(3) {
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(119, 119, 119, 1);
              padding-bottom: 0.12rem;
              padding-left: 0.2rem;
              border-bottom: 1px solid #eeeeee;
            }
            p:nth-child(4) {
              padding-left: 0.2rem;
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(119, 119, 119, 1);
              .iconfont {
                float: right;
                padding-right: 0.15rem;
              }
            }
          }
        }
        .cup_box.active {
          opacity: 0.5;
        }
        .cup_box_bottom {
          background: #ebebeb;
          ul {
            padding: 0.23rem 0.26rem;
            li {
              font-size: 0.24rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(119, 119, 119, 1);
              line-height: 0.4rem;
            }
          }
        }
      }
      li.all:last-child {
        margin-bottom: 1rem;
      }
      li.all.active {
        opacity: 0.5;
      }
    }
  }

  .Choose_coupons_fotter {
    position: fixed;
    width: 100%;
    display: flex;
    background: #f4f4f4;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 500;
    z-index: 9999;
    bottom: 0;
    box-sizing: border-box;
    text-align: center; // color: rgba(255, 255, 255, 1);
    .Choose_coupons_fotter_left,
    .Choose_coupons_fotter_right {
      width: 50%;
      height: 0.98rem;
      box-sizing: border-box;
    }
    .Choose_coupons_fotter_right {
      background: #fe4646;
      color: #ffffff;
      line-height: 0.98rem;
    }
    .Choose_coupons_fotter_left {
      padding-top: 0.2rem;
      p:nth-child(1) {
        color: #777777;
      }
      p:nth-child(2) {
        span:nth-child(1) {
          color: #333333;
        }
        span:nth-child(2) {
          color: #fe4646;
        }
      }
    }
  }

  .mescroll {
    position: fixed; // top: 2rem;
    height: 100%;
    overflow: scroll;
  }

  .sub-item {
    color: #888;
  }

  .type_item,
  .couponType {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  }

  .animate {
    max-height: 9999rem;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  p {
    display: block;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .couponType {
    ul {
      li {
        padding: 0 0.37rem;
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 0.88rem;
        border-bottom: 1px solid #cccccc;
        .iconfont {
          float: right;
        }
      }
      .active {
        color: #e2391c;
      }
    }
  }

  .cou_content {
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
            background: url("../../assets/imgs/jx.png") no-repeat;
            background-size: 100%;
            text-align: center;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
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

  #coupons {
    overflow: hidden;
    margin-top: 0.2rem;
    border-bottom: 1px solid #eeeeee;
  }

  .hot {
    padding: 0.16rem 0.29rem 0.17rem 0.43rem;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    overflow: hidden;

    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #333333;
  }

  .hot_awards {
    /* width: 5.57rem; */
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0.07rem;
  }

  .hot .hot_title {
    float: left;
    padding: 0.06rem 0.16rem;
    font-size: 0.24rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(239, 0, 0, 1);
    border-radius: 0.1rem;
    margin-right: 0.31rem;
  }

  .lose_efficacy {
    /* width: 7rem; */
    width: 100%;
    height: 100%;

    text-align: center;
    padding: 4rem 0;
    background: #000000;
    opacity: 0.7;
    top: 0;
    position: fixed;
    /*
  top: 50%;
  left: 50%; */
    /* transform: translate(-50%, -50%); */
    z-index: 999;
    /* border-radius: 0.1rem; */
  }

  #lose_efficacy_text {
    position: fixed;
    display: inline-block;
    width: 5rem;
    font-size: 0.3rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 0.1rem;
    top: 50%;
    left: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
    background: #ffffff;
    color: #333333;
    text-align: center;
  }

  input:disabled {
    background-color: #ffffff;
    color: #333333;
  }

  .fr {
    float: right;
    color: #777777;
    line-height: 0.5rem;
  }

  .fl {
    float: left;
  }

  .outer {
    height: 100%;
    width: 100%;
    background-color: #f7f7f7;
  }

  .toubus {
    width: 100%;
    height: auto;
    background: #ffffff;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    padding-left: 8px;
    padding-right: 8px;
    box-sizing: border-box;
    margin-bottom: 0.32rem;
  }

  .headesws {
    width: 1.04rem;
    height: 1.04rem;
    display: block;
    margin: auto;
    border-radius: 50%;
  }

  .jingtong {
    font-size: 0.32rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: #e2391c;
    text-align: center;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jingtong span {
    width: 0.95rem;
    height: 0.32rem;
    border: 1px solid rgba(255, 77, 79, 1);
    border-radius: 0.08rem;
    display: block;
    font-size: 0.22rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(226, 57, 28, 1);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.14rem;
  }

  .money_mums {
    /* display: flex;
    justify-content: center; */
    font-size: 0.32rem;
    border: 2px solid #e5e5e5;
    padding: 0.34rem 0.28rem;
    border-radius: 10px;
    color: #333333;
    margin-bottom: 0.3rem;
    margin-top: 1rem;
  }

  .money_mums input {
    border: transparent;
    /* caret-color: #cccccc; */
    font-size: 0.4rem;
    padding-top: 0.07rem;
    width: 45%;
    color: #333333;
    font-weight: 500;
  }

  .money_mums input:focus {
    outline: none;
  }

  .money_mums .payable {
    font-size: 0.24rem;
    color: #999999;
    line-height: 0.46rem;
  }

  .fukuans {
    text-align: center;
    background-color: #fe4646;
    color: #ffffff;
    font-size: 0.32rem;
    border-radius: 10px;
    height: 0.9rem;
    line-height: 0.9rem;
    margin-top: 0.3rem;
  }

  .integral {
    font-size: 0.26rem;
    color: #333333;
    overflow: hidden;
    background-color: #fff;
    padding: 0.27rem 8px;
  }

  .integral .manJian {
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 77, 79, 1);
    display: inline-block;
    padding: 0.13rem 0.14rem;
    border: 1px solid rgba(255, 77, 79, 1);
    border-radius: 0.13rem;
    margin-right: 0.2rem;
  }

  .integral i {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    border: 1px solid #cccccc;
    float: right;
  }

  .integral .selection {
    color: #45bd8c;
    font-size: 0.3rem;
  }

  .paymentType {
    height: 5rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 11;
    transition: bottom 0.3s;
    font-size: 0.32rem;
    padding: 0.67rem 0 0;
    box-sizing: border-box;
  }

  .paymentType h3,
  .hiddenPaymentType h3 {
    color: #424242;
    font-weight: 400;
    margin-bottom: 0.75rem;
    padding: 0 0.24rem;
  }

  .paymentType h3 i,
  .hiddenPaymentType h3 i {
    float: right;
  }

  .paymentType .wxPay,
  .hiddenPaymentType .wxPay {
    color: #01af00;
    padding: 0 0.24rem 0.4rem 0.24rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .paymentType .wxPay i,
  .paymentType .zfbPay i,
  .hiddenPaymentType .wxPay i,
  .hiddenPaymentType .zfbPay i {
    font-size: 0.5rem;
  }

  .paymentType .wxPay i:last-child,
  .hiddenPaymentType .wxPay i:last-child {
    border: 1px solid #cccccc;
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    float: right;
  }

  .paymentType .zfbPay,
  .hiddenPaymentType .zfbPay {
    padding: 0 0.24rem 0.24rem;
    margin-top: 0.4rem;
    color: #00aaef;
  }

  .paymentType .zfbPay i:last-child,
  .hiddenPaymentType .zfbPay i:last-child {
    border: 1px solid #cccccc;
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    float: right;
  }

  .confirmPayment {
    width: 100%;
    text-align: center;
    padding: 0.27rem 0;
    background-color: #4dba78;
    color: #fff;
  }

  .hiddenPaymentType {
    height: 5rem;
    width: 100%;
    position: fixed;
    bottom: -5rem;
    left: 0;
    background-color: #ffffff;
    z-index: 11;
    font-size: 0.32rem;
    padding: 0.67rem 0 0;
    box-sizing: border-box;
    transition: bottom 0.3s;
  }

  .zzc {
    width: 100%;
    height: 100%;
    background-color: #4c4c4c;
    opacity: 0.8;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .tips {
    padding: 0.24rem 0.5rem;
    text-align: center;
    background-color: #4c4c4c;
    border-radius: 10px;
    position: fixed;
    opacity: 0.9;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.26rem;
    color: #fff;

    transition: all 0.3s;
    z-index: 99999999999999999999;
  }

  .Tips {
    padding: 0.24rem 0.5rem;
    text-align: center;
    background-color: #4c4c4c;
    border-radius: 10px;
    position: fixed;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.26rem;
    color: #fff;
    z-index: 999999999;
  }

  .paymentTips {
    margin-top: 10px;
    font-size: 0.26rem;
    overflow: hidden;
    padding: 0.2rem 0;
    box-sizing: border-box;
  }

  .paymentTips span {
    vertical-align: super;
  }
</style>
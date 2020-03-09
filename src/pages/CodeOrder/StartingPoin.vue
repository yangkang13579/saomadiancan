<template>
  <div :class="{ 'back':tabChange == 1 }">
    <Hot></Hot>
    <!-- 点餐 -->
    <div v-if="tabChange == 1" class="Start_title">
      <div class="Start_title_left">
        <img src="../../assets/imgs/youhuijuan.png" />
        <span>您有优惠券可领取</span>
      </div>
      <div @click="goCoupons" class="Start_title_right">
        <span>领券入口</span>
        <i class="iconfont rigth_btn">&#xe6b5;</i>

      </div>


    </div>


    <div v-show="tabChange == 1" class="spacing"></div>



    <!-- <div :class="{ 'maginTabchange': tabChange == 2 || tabChange == 3}" class="tabChange"> -->
    <div class="tabChange">
      <div :class="{ 'active': tabChange == 1}" @click="change(1)">点餐</div>
      <div :class="{ 'active': tabChange == 2}" @click="change(2)">
        评价
        <span>{{comment_count}}</span>
      </div>
      <div :class="{'active': tabChange == 3 }" @click="change(3)">商家</div>
    </div>
    <div v-if="tabChange == 1">
      <!-- <div class="Start_main">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li @click="selectMenu(index,$event)" v-for="(item,index) in goods" :key="index" :class="{'active':currentIndex==index}">
              <span>{{item.text}}</span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">

       <div v-for="(item,index) in goods" class="food-list-hook">
            <div class="right_title">{{item.text}}</div>
            <ul>
              <li v-for="(item,index) in item.goosList" :key="index">
                <div @click="goProduitDetail" class="greens">
                  <div class="greens_left">
                    <img src="../../assets/imgs/shop2.png" alt />
                  </div>
                  <div class="greens_right">
                    <p>{{item.name}}</p>
                    <p>{{item.shuoming}}</p>
                    <p>
                      <span>月售 {{item.yueshou}}</span>
                      <span>{{item.pingfen}}分</span>
                    </p>
                    <p>
                      <span>￥</span>
                      <span>{{item.price}}</span>
                      <span>起</span>
                    </p>
                    <p>
                      <img class="sub" @click.stop="NumberDiners(2)" src="../../assets/imgs/sub.png" />
                      <span>{{item.num}}</span>
                      <img class="add" @click.stop="NumberDiners(1)" src="../../assets/imgs/adds.png" />
                    </p>
                  </div>
                </div>
              </li>

            </ul>
          </div> 
   






        </div>
      </div> -->

      <div class="goods">
          <!-- <div class="menu-wrapper" ref="menuWrapper">
            <ul>
              <li v-for="(item,index) in category" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index)">
                <span class="text">
                 {{item.category_name}}
                </span>
              </li>
            </ul>
          </div>
          <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
             
                 <li class="food-list food-list-hook">

                  
                  <ul class="itemUi">
                      <li class="itemLi"  v-for="(item,index) in categoryList" :key="index">
                      
                          <div @click="goProduitDetail(item)" class="greens_left">
                            <img :src="item.picture_url" alt />
                          </div>
                          <div class="greens-right">
                            <p class="greens-right-title">{{item.goods_name}}</p>
                            <p class="greens-right-shuoming">{{item.foodinfo}}</p>
                            <p class="greens-right-pingjia">
                              <span>月售 {{item.picture}}</span>
                              <span>{{item.cost_price}}分</span>
                            </p>
                            <div class="greens-right-bot">
                              <p class="greens-right-price">
                                <span>￥</span>
                                <span>{{item.price}}</span>
                                <span>起</span>
                              </p>
                              <p class="greens-right-num">
                                <img v-show="item.count>0" class="sub" @click.stop="subHome(item)" src="../../assets/imgs/sub.png" />
                                <span v-show="item.count>0">{{item.count}}</span>
                                <img class="add" @click.stop="addHome(item)" src="../../assets/imgs/adds.png" />
                              </p>

                            </div>
                           
                          </div>
                     
                      </li>
        
                    </ul>
              </li>
            </ul>
          </div> -->
  
          <aside ref="l_list">
                      <ul>
                        <li ref="l_item" :class="{'act':index === actli}" 
              @click="changeS(index)" v-for="(item,index) in category" :key="index">
                          <p>
                            {{item.category_name}}
                            <span v-show="item.count !== 0">{{item.count !== 0 ? item.count : ''}}</span>
                          </p>
                       </li>
                     </ul>
                 </aside>
                <section class="r_list" ref="r_list">
                  <div>
                    <div v-for="(item,index) in categoryList" :key="index" ref="good">
                      <!-- <p class="title">
                        折扣
                      </p> -->
                      <ul>
                        <li class="list" >
                          <div class="list_item flex" :class="index===categoryList.length-1?'last':''">
                               <div @click="goProduitDetail(item)" class="greens_left">
                                  <img :src="item.picture_url" alt />
                                </div>
                            <div class="greens-right">
                            <p class="greens-right-title">{{item.goods_name}}</p>
                            <p class="greens-right-shuoming">{{item.foodinfo}}</p>
                            <p class="greens-right-pingjia">
                              <span>月售 {{item.sales}}</span>
                              <span>{{item.star.toFixed(1)}}分</span>
                            </p>
                            <div class="greens-right-bot">
                              <p class="greens-right-price">
                                <span>￥</span>
                                <span>{{item.price}}</span>
                                <span>起</span>
                              </p>
                              <p class="greens-right-num">
                                <img v-show="item.count>0" class="sub" @click.stop="subHome(item)" src="../../assets/imgs/sub.png" />
                                <span v-show="item.count>0">{{item.count}}</span>
                                <img class="add" @click.stop="addHome(item)" src="../../assets/imgs/adds.png" />
                              </p>

                            </div>
                           
                          </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
       </div>


      <div class="Start_fotter">
        <div @click="toCar" class="left">
          <i class="iconfont">&#xe72c;</i>
          <span v-if="nums!=0">{{nums}}</span>
        </div>
        <div class="content">
          <p>
            <span>￥</span>
            <span>{{money}}</span>
          </p>
          <p>共{{nums}}份</p>
        </div>
        <!-- 去结算 -->
        <div class="right">
          <img v-if="saveStore.length!=0" @click="goConfirm" src="../../assets/imgs/js.png" alt />
          <img v-if="saveStore.length==0"  src="../../assets/imgs/nojs.png" alt />
        </div>
      </div>

      <div v-if="isShade" @click="shade()" class="shade">
        <div class="popout">
          <div class="popoutTop">
            <img @click.top="clearn()" src="../../assets/imgs/close.png">
            <span @click.top="clearn()">清理购物车</span>
          </div>
          <div class="popoutList">
            <img v-if="saveStore.length==0" class="cart" src="../../assets/imgs/car.png" />
            <p class="cartP" v-if="saveStore.length==0">暂无菜品,快加入菜品吧！</p>
            <div v-if="saveStore.length!=0" v-for="(item,index) in saveStore" :key="index" class="popoutItem">
              <div class="popoutItem-left">
                <div class="popoutItem-top">
                  <p>{{item.goods_name}}</p>
                  <span v-if='item.cart.sku_name !== item.goods_name'>{{item.cart.sku_name}}</span>
                </div>
                <div class="popoutItem-bot">
                  <span>
                    ￥
                  </span>
                  <span>
                    {{item.cart.price}}
                  </span>
                </div>
              </div>
              <div class="popoutItem-right">
                <img class="sub" @click.stop="subHome1(item)" src="../../assets/imgs/sub.png" />
                <span>{{item.count}}</span>
                <img class="add" @click.stop="addHome2(item)" src="../../assets/imgs/adds.png" />
              </div>
            </div>
        

          </div>
        </div>
      </div>
    </div>
    <!-- 评价 -->
    <div v-if="tabChange == 2">
      <div class="discuss">
        <div class="discussTitle">
          <div class="discussTitle-left">
            <div class="discussNub">
              {{star_avgN}}
            </div>
            <div class="storeStar">
              <p>商家评分</p>
              <div class="starList">

                  <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" track-by="index"></span>



                  <!-- <img v-if="star_avg.s0>=1" src="../../assets/imgs/star01_select.png" />
                  <img v-if="star_avg.s0>=2" src="../../assets/imgs/star01_select.png" />
                  <img v-if="star_avg.s0>=3" src="../../assets/imgs/star01_select.png" />
                  <img v-if="star_avg.s0>=4" src="../../assets/imgs/star01_select.png" />
                  <img v-if="star_avg.s0>=5" src="../../assets/imgs/star01_select.png" />

                  <img v-if="star_avg.s0<1" src="../../assets/imgs/star01.png" />
                  <img v-if="star_avg.s0<2" src="../../assets/imgs/star01.png" />
                  <img v-if="star_avg.s0<3" src="../../assets/imgs/star01.png" />
                  <img v-if="star_avg.s0<4" src="../../assets/imgs/star01.png" />
                  <img v-if="star_avg.s0<5" src="../../assets/imgs/star01.png" /> -->


<!-- 
                <img src="../../assets/imgs/star_select.png" />
                <img src="../../assets/imgs/star_select.png" />
                <img src="../../assets/imgs/star_select.png" />
                <img src="../../assets/imgs/star_select.png" />
                <img src="../../assets/imgs/star_select.png" /> -->
              </div>
            </div>
          </div>
          <div class="discussTitle-right">
            <div class="composite">
              <p>环境</p>
              <span>{{star_avg.s1 | numFilter}}</span>
            </div>
            <div class="composite">
              <p>服务</p>
              <span>{{star_avg.s2 | numFilter}}</span>
            </div>
            <div class="composite">
              <p>味道</p>
              <span>{{star_avg.s3 | numFilter}}</span>
            </div>

          </div>
        </div>
        <!-- discussList -->
            <div class="discussBottom">
              <p class="notDiscuss" v-if="isdiscuss==false">暂无评论</p>
              <div v-if="isdiscuss==true" :class="[clientHeight==1?'discussList':clientHeight == 2?'discussListTwo':'discussListThere']">
                  <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text=""
                    @load="onLoad"
                  >
                  <div v-for="(item,index) in list"  class="discussItem">
                    <div class="discussItem-left">
                      <img :src="item.userinfo.face">
                    </div>
                    <div class="discussItem-right">
                      <div class="discussItem-title">
                        <!-- 客户昵称 -->
                        <div class="discussItem-name">
                          {{item.userinfo.nickname}}
                        </div>
                        <div class="discussItem-star">
                          <!-- 评分 -->
                          <div class="discussItem-star-nub">
                              <img v-if="item.star.s0>=1" src="../../assets/imgs/star01_select.png" />
                              <img v-if="item.star.s0>=2" src="../../assets/imgs/star01_select.png" />
                              <img v-if="item.star.s0>=3" src="../../assets/imgs/star01_select.png" />
                              <img v-if="item.star.s0>=4" src="../../assets/imgs/star01_select.png" />
                              <img v-if="item.star.s0>=5" src="../../assets/imgs/star01_select.png" />
        
                              <img v-if="item.star.s0<1" src="../../assets/imgs/star01.png" />
                              <img v-if="item.star.s0<2" src="../../assets/imgs/star01.png" />
                              <img v-if="item.star.s0<3" src="../../assets/imgs/star01.png" />
                              <img v-if="item.star.s0<4" src="../../assets/imgs/star01.png" />
                              <img v-if="item.star.s0<5" src="../../assets/imgs/star01.png" />
                          </div>
                          <!-- 评论时间 -->
                          <div class="discussItem-time">
                            <!-- 2019-8-26 16:56 -->
                            {{ item.create_time | formatDate }} 
                          </div>
                        </div>
                      </div>
                      <div class="discussItem-cont">
                       {{item.content}}
                      </div>
                      <div v-if="item.re_content.length!=0" class="discussItem-reply">
                        商家回复：{{item.re_content}}
                      </div>
                    </div>
                  </div>
                    <!-- <van-cell
                    v-for="item in list"
                    :key="item"
                    :title="item"
                    /> -->
              </van-list>
              </div>
            </div>
         
      </div>
    </div>

    <div class="store" v-if="tabChange == 3">
      <div class="store-new">
        <div class="store-title">
          商家信息
        </div>
        <div class="store-Img">
          <img @click="lookimg(item,index)" v-for="(item,index) in storeimg" :src="item" />
          <!-- <img src="../../assets/imgs/head.png"> -->
        </div>
        <div class="store-text">
            {{store_description}}
        </div>
      </div>

      <div class="store-adress">
        <div class="store-icon">
          <img src="../../assets/imgs/icon_adress.png" />
        </div>
        <div @click="getMap(zong)" class="store-adress-text">
          <div class="store-adress-text-top">
            {{address}}
          </div>
          <p>{{distance}}</p>
        </div>
        <div @click="callPhone(mobile)" class="store-call">
          <img src="../../assets/imgs/phone.png" />
        </div>
      </div>

      <div class="store-conts">
        <div class="store-name">
          <div class="store-name-left">
            商家名称
          </div>
          <div class="store-name-right">
            {{shopname}}
          </div>
        </div>
        <div class="store-leibie">
          <div class="store-name-left">
            商家品类
          </div>
          <div class="store-name-right">
            {{typeInfos}}
          </div>
        </div>
        <div class="store-time">
          <div class="store-name-left">
            营业时间
          </div>
          <div class="store-name-right">
            {{bstart_time}}-{{bend_time}}
          </div>
        </div>
      </div>

      <div class="store-conts-zizhi">
        <div class="store-conts-zizhi-title">
          营业资质
        </div>
        <div class="store-Img">
          <img @click="lice" :src="licenseimg" />

        </div>
      </div>

    </div>

    <!-- purchased,加购弹框 -->
    <van-popup v-model="purchasedShow" :close-on-click-overlay="false">
      <ul class="purchased">
        <li v-for="(item,index) in purchasedList.skuselect" :key="index">
          <p>属性</p>
          <van-row gutter="20">
              <!-- <van-col span="8">
                  <span  @click="catSku(item)">{{item}}</span>
                </van-col> -->
            <van-col span="8" v-for="(item1,index1) in item" :key="index1">
                <!-- <span :class="item1.select==true ? 'col':''" @click="catSku(item,item1)">{{item1}}</span> -->
              <span :class="index1 == item.colin ?'col':''"  @click="catSku(item, index, item1,index1)">{{item1}}</span>
            </van-col>
          </van-row>
        </li>
      </ul>
      <div class="boxprice">
        <span v-if='purchasedList.cart'>{{purchasedList.cart.price}}元</span>
        <button @click="addCar" class="addShoppingTrolley"></button>
      </div>
     
    </van-popup>
    <img @click="purchasedShow=false" v-show="purchasedShow" class="delimgs" src="../../assets/imgs/del.png" alt />
  </div>
</template>
<script>
  // 1:tabChange==1:点餐 的时候，优惠卷入口和spacing(一个样式)不显示
  // 2:tabChange==2:评价
  // 1:tabChange==3:商家
  
  import Vue from 'vue'
  import Hot from '../../components/hot/hot'
  import { api } from '../../components/js/api.js';
  import Better  from 'better-scroll'
  import { ImagePreview } from 'vant'
  import BMap from 'BMap';
  import wx from 'weixin-jsapi'; 
  export default {
    data() {
      return {
        hsdd:0,
        clientHeight:1,
        typeInfos:'',
        distance:'',
        shopname:'',
        address:'',
        actli: 0,
        scrollY: 0,
        arr: [0],
        flag: true,
        obj: null,
        show: false,
        item:{

        },
        colin:0,
        save:{},
        store_description:'',//商品简介
        isOpen:false, //先开始不掉地图
        money:0,
        nums:0, //查看所有菜品个数
        arrs:[], //把所有菜品Push到数组里
        category:[],  //菜品类列表
        food:{
          type:Object,
        },
        categoryList:[], //全部菜列表
        page:1,
        pageSize:10,
        // time: 1516703495241,
        list: [],
        listData:[],
        loading: false,
        finished: false,
        star_avg:[],
        id: 1,
        comment_count:0,//评价总数
        ImagePreviewDialog:'',
        bstart_time:'',
        bend_time:'',
        isShade: false,
        ins_id:'',
        marketPrice:'',
        // currentIndex: 0,
        tabChange: 1,
        isdiscuss: true, //是否有评论
        purchasedShow: false,//品类弹窗
        scrollY: 0,
        listHeight: [],
        zong:[],
        storeimg:[],  //店铺照片
        licenseimg:'', // 营业执照照片
        purchasedList: [],
        star_avgN:5,
        saveStore: []
        // purchasedList: [
        //   { name: '糖量', children: ['无糖', '无糖'] },
        //   { name: '辣椒', children: ['不放辣', '微辣', '中辣', '变态辣'] },
        //   { name: '辣椒', children: ['不放辣', '微辣', '中辣', '变态辣'] }
        // ]
      }
    },
    watch: {
      show () {
        /* eslint-disable no-new */
        if (this.show) {
          setTimeout(() => {
            new Better(this.$refs.detail, {
              click: true
            })
          })
        }
      },
      categoryList(newVal, oldVal) {
      console.log(newVal,oldVal)
       this.category = this.category.map(item => {
         let obj = item
         obj.count = 0
         for (let i = 0; i < newVal.length; i++) {
           let objA = newVal[i]
           if (obj.category_id === objA.category_id) {
            obj.count+=objA.count
           }
         }
         return obj
       })
    }
  },

    filters: {
      formatDate (value) {
          var val = JSON.parse(value)
          var date = new Date(val*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          return Y+M+D+h+m+s;
      },
      numFilter (value) {
        let realVal = ''
        if (value) {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(value).toFixed(1)
        } else {
          realVal = '--'
        }
        return realVal
      }

    },
    components: {
      Hot
    },
    mounted() {
  //     this.$nextTick(()=>{
  //       this.scroll()
  //  })
     
  

    },
    beforeDestroy() { 

    
    // window.removeEventListener('scroll');
    

    },
    beforeRouteLeave(to,from,next){ // 解决ImagePreview图片预览路由切换不隐藏的问题
        this.ImagePreviewDialog&&this.ImagePreviewDialog.close()
        next()
    },
    computed: {
      itemClasses(){
            console.log("this.star_avgN",this.star_avgN)
              let result = [];
             let score = Math.floor(this.star_avgN * 2 ) / 2;
             console.log("this.score",score)
             let hasDecimal = score % 1 !== 0;
             console.log("this.hasDecimal",hasDecimal)
             let integer = Math.floor(score);
             console.log("this.integer",integer)
             for(let i=0;i<integer;i++){
                 result.push("on");
             }
             if(hasDecimal){
                 result.push("half");
             }
             while(result.length < 5){
                result.push("off");
             }
            return result;
         }
     	/* 左侧当前索引 */
			// currentIndex() {
			// 	for(let i = 0;i < this.listHeight.length;i++){
			// 		let height1 = this.listHeight[i]
			// 		let height2 = this.listHeight[i + 1]
			// 		if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
			// 			return i
			// 		}
			// 	}
			// 	return 0
			// },
    },
    created() {
      console.log("document.body.clientHeight",document.body.clientHeight)
      this.hsdd = document.body.clientHeight;
      if(document.body.clientHeight < 590 ){
        this.clientHeight = 1;
      }else if(document.body.clientHeight > 590 && document.body.clientHeight < 690){
        this.clientHeight = 2
      }else{
        this.clientHeight = 3
      }
      this.saveStore = localStorage.getItem('saveStore') ? JSON.parse(localStorage.getItem('saveStore')) : []
      if(this.$route.query.ins_id){
        this.getAll()
        // if(localStorage.getItem("saveStore")){
        //   var gs = JSON.parse(localStorage.getItem("saveStore"))
        //   this.arrs = gs.arrs;
        //   this.nums = gs.nums;
        //   this.money = gs.money;
         

        // }else{

        // }
 

        this.ins_id = this.$route.query.ins_id;
        
        //获取菜品列表接口
        this.foodshop()

        // //获取商家信息
        // this.getStore()
        //获取评论列表
        this.onLoad()
        // this.getMap(1)


        // this.changed()
      }
     
  
      // this.$nextTick(() => {
      //   this._initScroll()
			// 	this._calculateHeight()
      // })
    },
   
    methods: {
      callPhone () {
        window.location.href = 'tel://' + this.mobile
      },
      scroll(){
        this.$nextTick(()=>{
          this.arr = [0]
          this.left = new Better(this.$refs.l_list, {
            click: true
          })
          this.rgt = new Better(this.$refs.r_list, {
            click: true,
            probeType: 3
          })
          this.$refs.good.forEach((el, index) => {
            this.arr.push(el.offsetHeight + (this.arr[index] ? this.arr[index] : 0))
          })
          this.rgt.on('scroll', (res) => {
            if (this.flag) {
              this.scrollY = Math.abs(res.y)
              for (let i = 0; i < this.arr.length; i++) {
              if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
                  this.actli = i
                  if (i === this.$refs.l_item.length - 2) {
                    this.left.scrollToElement(this.$refs.l_item[1], 100, 0, 0)
                  }
                  if (i === 2) {
                    this.left.scrollToElement(this.$refs.l_item[0], 100, 0, 0)
                  }
                }
              }
            }
          })
        })
          
      /* eslint-disable no-new */
        
    // },1000)
     
      },
      changeS (index) {
        this.flag = false
        this.actli = index
        this.rgt.scrollToElement(this.$refs.good[index], 100, 0, 0)
        setTimeout(() => {
          this.flag = true
        }, 100)
    },
    getDetails (it) {
      this.show = !this.show
      this.obj = it
    },

      // 计算总数量价格
      getAll () {
        this.nums = 0
        this.money = 0
        this.marketPrice = 0
        for (let i = 0; i < this.saveStore.length; i++) {
        
          
          let item = this.saveStore[i]
          console.log('item.cart.price',item.cart.price)
          console.log('item.cart.market_price',item.cart.market_price)
          this.nums+=item.count
          this.money += (parseFloat(item.cart.price) * item.count);
          this.marketPrice =+ (Number(item.cart.market_price) * Number(item.count))
        }
        this.money = this.money.toFixed(2)
        this.marketPrice = this.marketPrice.toFixed(2)
        localStorage.setItem('total', JSON.stringify({money: this.money, nums: this.nums,marketPrice:this.marketPrice}))
        localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
      },
      // item:代表最外层循环所有品类展示
      // item1:代表最内层当前点击的数据
      catSku(item,index,item1,index1){
        item.colin = index1
        this.purchasedList.sku_name[index] = item1
        this.purchasedList.sku_nameShow = this.purchasedList.sku_name.join(' ') + " "
        for (let i = 0; i < this.purchasedList.skuinfo.length; i++) {
          var skuInfo = this.purchasedList.skuinfo[i]
          if (skuInfo.sku_name === this.purchasedList.sku_nameShow) this.purchasedList.cart = skuInfo
        }
        this.$forceUpdate()
      },
     
        // 点击增加菜数量
      addHome(item){
        console.log('item',item)
       
        //有skuinfo有小分类的时候
        if(item.skuselect.length!=0){
          this.purchasedShow = true
          this.purchasedList = item;
          this.purchasedList.sku_name = []
          this.purchasedList.sku_name.length = this.purchasedList.skuselect.length
          this.purchasedList.skuselect = this.purchasedList.skuselect.map((item, index) => {
            this.purchasedList.sku_name[index] = item[0]
            let obj = item
            obj.colin = 0
            return obj
          })
          this.purchasedList.cart = {}
          
          this.purchasedList.sku_nameShow = this.purchasedList.sku_name.join(' ') + " "
          for (let i = 0; i < this.purchasedList.skuinfo.length; i++) {
            var skuInfo = this.purchasedList.skuinfo[i]
            if (skuInfo.sku_name === this.purchasedList.sku_nameShow) this.purchasedList.cart = skuInfo      
          }
        }
        //没有skuinfo没有小分类的时候
        else{
          if(!item.count){
            this.$set(item,"count",1)  

          }else{
            item.count++
          }
          var cartGoods = {cart: {sku_name: item.goods_name, price: item.price, sku_id: item.id,market_price:item.market_price}, id: item.id, count: 1, goods_name:item.goods_name, picture_url: item.picture_url,category_id:item.category_id }
          // this.changed()
          this.compire(cartGoods)
        }
      },
      compire(cartGoods, type) {
        for (let i = 0; i < this.saveStore.length; i++) {
          var item = this.saveStore[i]
          console.log(item.cart.sku_id, cartGoods.cart.sku_id)
          if (parseInt(item.cart.sku_id) === parseInt(cartGoods.cart.sku_id)) {
            if (type) {
              console.log('减')
              if(type === 1 && item.count === 1) {
               this.saveStore.splice(i, 1)
              } else {
                this.saveStore[i].count--
              }
              localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
              return
            }
            item.count++
            localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
            this.getAll()
            this.getListCount()
            return
          }
        }
        this.saveStore.push(cartGoods)
        localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
        this.getAll()
        this.getListCount()
      },
       // 弹窗显示加入购物车
       addCar() {
        
        this.purchasedShow = false
        var cartGoods = {cart: this.purchasedList.cart, id: this.purchasedList.id, count: 1, goods_name: this.purchasedList.goods_name, picture_url: this.purchasedList.picture_url,category_id:this.purchasedList.category_id,market_price:this.purchasedList.market_price}
        this.compire(cartGoods)
        // for (let i = 0; i < this.saveStore.length; i++) {
        //   var item = this.saveStore[i]
        //   if (item.cart.sku_id === cartGoods.cart.sku_id) {
        //     item.count++
        //     localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
        //     this.getAll()
        //     this.getListCount()
        //     return
        //   }
        // }
        // this.saveStore.push(cartGoods)
        // localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
        // this.getAll()
        // this.getListCount()
        // console.log(this.saveStore)
        
      },
      subHome1(item) {
        if(item.count > 1){
          item.count--
          
       } else {
        for(let i = 0; i < this.saveStore.length; i++) {
          let itemA = this.saveStore[i]
          if (itemA.cart.sku_id === item.cart.sku_id) {
            this.saveStore.splice(i, 1)
          }
        }
       }
       localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
       this.getAll()
       this.getListCount()
       this.$forceUpdate()
      },
       // 菜单栏单个减少数量按钮
       subHome(item){
         if (item.skuinfo.length !== 0) {
           var ary = []
          for (let i = 0; i < this.saveStore.length; i++) {
            let items = this.saveStore[i]
            if (items.id === item.id) {
              ary.push(items.cart.sku_id)
            }  
          }
          console.log(ary)
          if (ary.length == 1) {
            console.log(222222222)
              var cartGoods = {cart: {sku_name: item.sku_name, price: item.price,market_price:item.market_price, sku_id: ary[0]}, id: item.id, count: 1, goods_name:item.goods_name, picture_url: item.picture_url,category_id:item.category_id}
              this.compire(cartGoods, 1)
              this.getAll()
              this.getListCount()
              this.$forceUpdate()
            }  else {
              this.$toast('多规格商品只能去购物车删除噢')
            }
           return
        }
         
        //  this.$toast(res.msg)
        // if(item.count > 1){
          var cartGoods = {cart: {sku_name: item.goods_name, price: item.price,market_price:item.market_price, sku_id: item.id}, id: item.id, count: 1, goods_name:item.goods_name, picture_url: item.picture_url,category_id:item.category_id }
          this.compire(cartGoods, item.count)
        
          // 
          this.getAll()
          this.getListCount()
          this.$forceUpdate()
      //  }
      //  this.changed()
      },
      addHome2 (item) {
        item.count++
        this.getAll()
        this.getListCount() 
        this.$forceUpdate()
      },
      clearn(){
        this.$dialog.confirm({
                // title: '',
                message: '清空购物车？'
              }).then(() => {
                localStorage.removeItem("cookie")
                localStorage.removeItem("save")
                localStorage.removeItem("total")
                localStorage.removeItem("saveStore")
                this.category.count =0;
                this.arrs = [];
                this.nums = 0;
                this.money = 0;
                this.saveStore = []
                this.getListCount()
                localStorage.removeItem("saveStore")
                 this.category.map(item => {
                  let obj = item
                  obj.count = 0
                  // for (let i = 0; i < newVal.length; i++) {
                  //   let objA = newVal[i]
                  //   if (obj.category_id === objA.category_id) {
                  //     obj.count+=objA.count
                  //   }
                  // }
                 
                })
                for(var i=0;i<this.categoryList.length;i++){
                  if(this.categoryList[i].count){
                    this.categoryList[i].count = 0;
                  }
                }

                // on confirm
              }).catch(() => {
                // on cancel
              });
       
      },
      //监控选择菜品类及数量
      // changed(){
      //   var arr=[];
      //   var nums = 0;
      //   var money =0;
      //   for(var i=0;i<this.categoryList.length;i++){
      //     if(this.categoryList[i].count){
      //         arr.push(this.categoryList[i])
      //         nums += this.categoryList[i].count
      //         money += this.categoryList[i].count*this.categoryList[i].price
      //     }
      //   }
      //   this.arrs = arr;  // 所有的购物车数据
      //   this.nums = nums;  // 所有的菜品个数
      //   this.money = money.toFixed(2);  // 总价
      //   // var save = [];
      //   // save.push(this.arrs);
      //   // save.push(this.nums);
      //   // save.push(this.money);
      //   var save = {}
      //   save.arrs = this.arrs
      //   save.nums = this.nums
      //   save.money = this.money
      //   console.log('save',save)
      //   var saveStore = JSON.stringify(save)
      //   localStorage.setItem("saveStore", saveStore)
      // },
      getListCount () {
        if (localStorage.getItem("saveStore")) {
          const list = JSON.parse(localStorage.getItem("saveStore"))
          this.categoryList = this.categoryList.map(item => {
            let obj = item
            obj.count = 0
            for (let i = 0; i < list.length; i++) {
              if (list[i].id === obj.id) {
                obj.count += list[i].count
              }
            }
            return obj
          })
        }
      
        
      },
      
         // 获取菜品接口
      foodshop(){
        this.$toast.loading({
          message: "加载中..."
        });
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/foods",
          params: {
            // develop:1,
            ins_id:this.ins_id,
            token:token,
            pageSize:10
          }
        }).then(res => {
          console.log("菜品",res)
          this.$toast.clear(); 
          if(res.data.code == 10001){
              //评分
              this.category = res.data.responseData.category;
              let categoryArr=[];
              for(let i=0;i<this.category.length;i++){
                categoryArr.push(this.category[i].category_id)
              }
              this.categoryArr = categoryArr.toString();
              sessionStorage.setItem("categoryArr",this.categoryArr)


              this.categoryList = res.data.responseData.data;

              let constd=[];



              this.comment_count = res.data.responseData.comment_count;
              this.getListCount()
              this.$nextTick(()=>{
                    this.scroll()
              })

          }else{

          }
        
        })
      },

      shade(){
        this.isShade = false;
      },

      lookimg(imgs,index){
        this.ImagePreviewDialog = ImagePreview({
          images:this.storeimg,
          startPosition:index
        })
      },
      lice(){
        ImagePreview([
          this.licenseimg
       ]);
      },
            // 点击地图
      getMap(val) {
        // console.log("BMap",BMap)
        let token = sessionStorage.getItem('token')
        let url = encodeURIComponent(location.href.split('#')[0]) // 获取锚点之前的链
        // alert(location.href.split('#')[0])
        let data = this.$reData(
          { url: url },
          'common.wxshare/actionsqrcode',
          // 'fcd5a68409b9c3785ce866067b67d9bb'
          token
        )
        console.log("val",val)
        if(val == 1){
          this.isOpen = false
          this.totalMessage = val;
        }else{
          this.totalMessage = val;
          this.isOpen = true
        }
       
        api(data).then(res => {
          console.log("res点击地图",res)
          if (res.code == 10001) {
            let _this = this
            this.wxInitTO(res)
           
          }
        })
      },
   
      wxInitTO (res) {
      let _this = this
      wx.config({
        debug: false,
        appId: this.$appid,
        timestamp: res.responseData.timestamp,
        nonceStr: res.responseData.noncestr,
        signature: res.responseData.signature,
        jsApiList: ['checkJsApi', 'openLocation', 'getLocation'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['getLocation'],
          success: function (res) {
            // alert(JSON.stringify(res));
            // alert(JSON.stringify(res.checkResult.getLocation));
            if (res.checkResult.getLocation == false) {
              this.$toast(
                '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！'
              )
            }
          }
        }) 
        //获取位置
        wx.getLocation({
          success: function (res) {
            var tolatitude = res.latitude // 微信纬度，浮点数，范围为90 ~ -90
            var tolongitude = res.longitude // 微信经度，浮点数，范围为180 ~ -180。
            var lng = ''; // 百度经度
            var lat = ''; // 百度纬度
            var convertor = new BMap.Convertor()
            var ggPoint = new BMap.Point(tolongitude, tolatitude)
            var pointArr = []
            pointArr.push(ggPoint)
            convertor.translate(pointArr, 1, 5, function (data) {
              if (data.status === 0) {
                lng = data.points[0].lng
                lat = data.points[0].lat
               
                _this.location = lng + ',' + lat
                _this.tolongitude = Number(lng)
                _this.tolatitude = Number(lat)
               
               _this.getStore()
              }
            })
          }, 
          cancel: function (res) {
            this.$toast('用户拒绝授权获取地理位置')
          }
        })
        console.log('_this.Shoplatitude',_this.totalMessage.latitude)
        console.log('_this.Shoplongitude',_this.totalMessage.longitude)
        console.log(' _this.totalMessage', _this.totalMessage)
        //目的地位置
        if(_this.isOpen == true){
            wx.openLocation({
            latitude: Number(_this.totalMessage.latitude),
            longitude: Number(_this.totalMessage.longitude),
            scale: 18,
            name: _this.totalMessage.shopname,
            address: _this.totalMessage.address
          })
        }else{

        }
       
      })
    },
      //获取评价页面数据

      //onLoad是vant list 事件
      onLoad() {
      this.evaluate()
    },


   // 获取评论数据
      evaluate(){
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/comment_list",
          params: {
            // develop:1,
            ins_id:this.ins_id,
            token:token,
            page:this.page,
            pageSize:10
          }
        }).then(res => {
          console.log('评论1',res)
          if(res.data.code==10001){
            //评分
            this.star_avg = res.data.responseData.star_avg;
            this.star_avgN = res.data.responseData.star_avg.s0.toFixed(1);

            var page =  res.data.responseData.page;
            var totalpage = res.data.responseData.totalpage;
            console.log("page",page)
            console.log("totalpage",totalpage)
            if(page<totalpage){
              this.list.push(...res.data.responseData.data)
              this.page++
            }else{
              this.finished = true;
              this.list.push(...res.data.responseData.data)
              if(this.list.length==0){
                this.isdiscuss = false
              }
  
            }
            this.loading = false
          }else{
            this.$toast.fail("评论报错");
          }
        
        })
      },



      // 获取商户信息
      getStore(){
        this.$toast.loading({
          message: "加载中..."
        });
        console.log("百度经度1：" ,  this.tolongitude);
        console.log("百度纬度：" , this.tolatitude);
        let token = sessionStorage.getItem("token");
        console.log('token',token)
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/shopinfo",
          params: {
            // develop:1,
            ins_id:this.ins_id,
            longitude:this.tolongitude,
            latitude:this.tolatitude,
            token:token
          }
        }).then(res => {
          console.log('商户信息',res)
          this.$toast.clear(); 
          if(res.data.code == 10001){
            this.shopname = res.data.responseData.shopname;
            // document.title = this.shopname;
            // ins_id 是 店铺ID
            this.ins_id = res.data.responseData.ins_id;
            this.zong = res.data.responseData;
            // 商户营业开始时间
            this.bstart_time = res.data.responseData.bstart_time;  
            this.mobile = res.data.responseData.mobile;

            this.typeInfos =  res.data.responseData.type[0]

            // 商户简介
            this.store_description = res.data.responseData.store_description;
            // 商户关闭时间

            this.bend_time = res.data.responseData.bend_time;
            //店铺照片
            this.storeimg = res.data.responseData.storeimg
            //营业执照照片
            this.licenseimg = res.data.responseData.license_img
            //距离多远
            this.distance =  res.data.responseData.distance;
            console.log('this.license_img',this.licenseimg)
            this.address = res.data.responseData.address;

          }else{

          }
         
        })
      },


      //购物车列表增加减少
      popoutItem(index) {
        // index==1是增加按钮
        // index==2是减少按钮
        if (index == 1) {

        } else {

        }
      },
      // 首页展示页食品增加或减少
      NumberDiners(index) {
        // index==1是增加按钮
        // index==2是减少按钮
        if (index == 1) {
          this.purchasedShow = true
        } else {

        }
      },
     
      // 弹窗展示购物车列表
      toCar() {
        if (this.isShade) {
          this.isShade = false
        } else {
          this.isShade = true
        }
      },
      selectMenu(index) {
				// 消除PC端页面自带的点击事件
				
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        console.log('el',el)
				this.foodsScroll.scrollToElement(el,600)
        // this.currentIndex = index;
				
			},
    	// _initScroll() {
			// 	this.meunScroll = new BScroll(this.$refs.menuWrapper,{
			// 		click: true
			// 	})

			// 	this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
			// 		click: true,
			// 		probeType: 3
			// 	})

			// 	this.foodsScroll.on('scroll',(pos) => {
			// 		this.scrollY = Math.abs(Math.round(pos.y))
			// 	})
			// },
			// _calculateHeight() {
			// 	let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
			// 	let height = 0
      //   this.listHeight.push(height)
      //   console.log('this.listHeight',this.listHeight)
			// 	for(let i = 0; i < foodList.length; i++){
			// 		let item = foodList[i]
			// 		height += item.clientHeight
			// 		this.listHeight.push(height)
			// 	}
			// },

      goConfirm() {
        if (this.id == 0) {
          this.$router.push({
            path: '/advance'
          })
        } else {
          this.$router.push({
            path: '/confirmOrder'
          })
        }

      },
      //领卷中心
      goCoupons() {
        this.$router.push({
          path: '/leadCoupons',
          query: {
            ins_id:this.ins_id
          }
        })
      },
      // 跳转商品详情
      goProduitDetail(item) {
        console.log('itemitem23',item)
        this.$router.push({
          path: '/produitDetail',
          query: {
            id: item.id,
            ins_id:item.ins_id
          }
        })
      },
      getList () {
        let token = sessionStorage.getItem('token')
        let url = encodeURIComponent(location.href.split('#')[0]) // 获取锚点之前的链
        // alert(location.href.split('#')[0])
        let data = this.$reData(
          { url: url },
          'common.wxshare/actionsqrcode',
          token
        )
        api(data).then(res => {
          console.log("resssssssss111",res)
          if (res.code == 10001) {
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
                  console.log("resssssssss222",res)
                  var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                  var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                  // _this.location = res.longitude + "," + res.latitude;
                  // alert(_this.location)
                  var longitude = res.longitude // 微信经度
                  var latitude = res.latitude // 微信纬度
                  var lng = ''; // 百度经度
                  var lat = ''; // 百度纬度
                  var convertor = new BMap.Convertor()
                  var ggPoint = new BMap.Point(longitude, latitude)
                  var pointArr = []
                  pointArr.push(ggPoint)
                  convertor.translate(pointArr, 1, 5, function (data) {
                    console.log(data, '百度')
                    if (data.status === 0) {
                      lng = data.points[0].lng
                      lat = data.points[0].lat
                      _this.position = lng + ',' + lat
                    }
                  
                  })
                },
                cancel: function (res) {
               
                  this.$toast('用户拒绝授权获取地理位置')
                
                }
              })
            })
         
          }
        })
      
    }, 
  
      //切换首页产品，评论，商家
      change(index) {
        this.tabChange = index;
        this.list = [];
            this.page = 1;
            this.loading = true;//下拉加载中
            this.finished = false;//下拉结束
            if(this.loading){
                this.onLoad();
            }

        // 1:tabChange==1:点餐
        if (this.tabChange == 1) {
          this.$nextTick(()=>{
            // this.foodshop()
        this.scroll()
   })
          // this.$nextTick(() => {
          //   this.arr=[];
          //   this.scroll()
          //  })
       
     
  
        }
        // 2:tabChange==2:评论
        else if (this.tabChange == 2) {
          // this.foodshop()
          //  this.page = 1
          // this.list = [];
        //    this.loading= false;
        //   this.finished = false;
        //  this.onLoad()
          // this.evaluate()
          // this.loading= false;
          // this.finished = false;
          // this.page = 1
          // this.list = [];
          // this.evaluate()

        }
        // 3:tabChange==3:商家
        else if (this.tabChange == 3) {
          // this.getList()
          this.getMap(1)
          // this.getStore()
            //获取商家信息
          

        }
      }
    }
  }

</script>
<style scoped lang='less'>
    .star-item.on{
         background-image: url(../../assets/imgs/star_select.png);
         width: .24rem;
          height: .25rem;
          background-size: 100% 100%;
     }
     .star-item.half{
         background-image: url(../../assets/imgs/ban_star.png);
         width: .24rem;
          height: .25rem;
          background-size: 100% 100%;
     }
     .star-item.off{
         background-image: url(../../assets/imgs/star.png);
         width: .24rem;
          height: .25rem;
          background-size: 100% 100%;
     }
  aside{
    position: fixed;
    left: 0;
    width: 1.68rem;
    top: 2.44rem;
    bottom: 1.04rem;
    overflow: hidden;
    ul{
      li{
       height: 1.08rem;
       width: 1.4rem;
       display: table;
       background-color: #EEEEEE;
       padding: 0 0.18rem;
       box-sizing: border-box;
       p{
         display: table-cell;
         text-align: center;
         position: relative;
         /* font:200 0.24rem/0.28rem ''; */
         font-size: .24rem;
         vertical-align: middle;
         color: #333;
         span{
          position: absolute;
          top: .3rem;
          right: -.15rem;
          padding: 0rem 0.09rem;
          background: #ff4d4f;
          border-radius: 50%;
          color: #ffffff;
         }
       }
     }
     .act{
       background-color: #FFFFFF;
     }
   }
 }
 .r_list{
     position: fixed;
     left: 1.6rem;
     right: 0;
     top: 2.44rem;
     bottom: 1.04rem;
     overflow: hidden;
     .title{
       /* border-left: 3px solid #d9dde1; */
       height: 0.52rem;
       line-height:.52rem;
       font-size: .3rem;
       color:#333333;
       
       /* background-color:#f3f5f7; */
       padding-left: 0.28rem;
     }
     .flex{
       display: flex;
       justify-content: center;
       align-items: center;
     }
     .list{
       padding: 0.1rem 0.36rem 0.65rem 0.36rem;
       .greens_left {
              width: 1.88rem;
              height: 1.88rem;
              /* padding-bottom: .6rem; */
              img {
                width: 1.88rem;
                height: 1.88rem;
                border-radius: 0.16rem;
              }
            }
       /* img{
         width: 1.28rem;
         border-radius: 0.04rem;
       }
       .list_item{
         justify-content: flex-start;
         border-bottom: 1px solid rgba(7,17,27,0.1);
         padding-bottom: 0.36rem;
         position: relative;
         &>div{
           margin-left: 0.2rem;
           .name{
             font: 0.28rem/0.28rem '';
             color: rgb(7,17,27);
             margin-bottom: 0.16rem;
           }
           .des,.sale{
             font: 0.2rem/0.2rem '';
             color: rgb(147,153,159);
             margin-bottom: 0.16rem;
           }
           .sale{
             margin-bottom: 0;
             span{
               margin-left: 0.24rem;
             }
           }
           .price{
             font:700 0.2rem/0.48rem '';
             color: red;
           }
           .add{
             position: absolute;
             right: 0;
             bottom: 0.28rem;
           }
         }
       }
       .last{
         border-bottom: none;
       } */
     }
   }
   .detail{
     background-color: white;
     position: fixed;
     z-index: 299;
     left: 0;
     right: 0;
     top:0;
    bottom: 1.04rem;
    overflow: hidden;
    .bg{
      img{
        height: 7.5rem;
      }
    }
    .tit{
      &>div{
        &:nth-of-type(1){
          padding: 0.36rem;
          p{
            &:nth-of-type(1){
              font: 700 0.28rem/0.28rem '';
              margin-bottom: 0.16rem;
            }
            &:nth-of-type(2){
              font: 0.2rem '';
              color: rgb(147,153,159);
              margin-bottom: 0.36rem;
            }
            &:nth-of-type(3){
              font:700 0.28rem/0.48rem '';
              color: rgb(240,20,20);
            }
          }
        }
        &:nth-of-type(2){
          float: right;
          margin-right: 0.36rem;
          margin-top: -0.9rem;
          font: 0.2rem/0.48rem '';
          color: white;
          background-color: rgb(0,160,220);
          border-radius: 0.24rem;
          width: 1.48rem;
          height: 0.48rem;
          text-align: center;
        }
      }
    }
    .b_line{
      height: 0.36rem;
      background-color: #f3f5f7;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    .intr{
      padding: 0.36rem;
      p{
        &:nth-of-type(1){
          font: 0.28rem '';
          margin-bottom: 0.12rem;
        }
        &:nth-of-type(2){
          font:200 0.24rem/0.48rem '';
          color: rgba(77,85,93);
          min-height: 1rem;
        }
      }
    }
    .flex{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .esit{
      &>div{
        &:nth-of-type(1){
          padding: 0.36rem 0.36rem 0 0.36rem;
          &>p{
            font: 0.28rem '';
            &:nth-of-type(1){
              margin-bottom: 0.36rem;
            }
          }
          .count {
            padding:0 0 0.36rem 0;
            border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
            p {
              text-align: center;
              font: 0.24rem/0.48rem '';
              padding: 0.12rem;
              border-radius: 0.02rem;
              margin-right: 0.12rem;
              &:nth-of-type(1) {
                background-color: #00A0DC;
              }
              &:nth-of-type(2) {
                background-color: #CCECF8;
              }
              &:nth-of-type(3) {
                background-color: #E9EBEC;
              }
            }
            .choosen{
              transform: scale(1.1);
            }
          }
        }
        &:nth-of-type(2){
          font-size: 0;
          padding: 0.24rem 0.36rem;
          border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
          i{
            color: rgb(147,153,159);
            font-size: 0.48rem;
            margin-right: 0.08rem;
          }
          span{
            font: 0.24rem '';
            color: rgb(147,153,159);
          }
        }
      }
      &>ul{
        li{
          padding: 0 0.36rem;
          &>div{
            padding: 0.32rem 0;
            border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
            &>div{
              span{
                font: 0.2rem/0.24rem '';
                color: rgb(147,153,159);
                &:nth-of-type(2){
                  margin-left: 55%;
                  margin-right: 0.12rem;
                }
              }
              em{
                font-size: 0;
                img {
                  width: 0.48rem;
                  border-radius: 50%;
                }
              }
            }
            p{
              &:nth-of-type(1){
                font: 0.24rem/0.32rem '';
              }
            }
          }
        }
      }
    }
   }

  .shade {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 3;
    .popout {
      width: 100%;
      padding: 0 0 0 0;
      position: fixed;
      left: 0;
      bottom: .98rem;
      background: #fff;
      z-index: 4;
      .popoutTop {
        width: 100%;
        height: .8rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          width: .24rem;
          height: .24rem;
        }
        span {
          font-size: .24rem;
          color: #777777;
          margin-right: .23rem;
          margin-left: .15rem;
        }

      }
      .popoutList {
        width: 100%;
        padding: .2rem 0;
        max-height: 6rem;
        overflow-y: scroll;
        .cart{
          width: 2.48rem;
          height: 1.62rem;
          margin-top:1.27rem;
          margin-left:2.42rem;
        }
        .cartP{
          width: 100%;
          text-align: center;
          color: #333333;
          font-size:.3rem;
          margin-bottom: 1.64rem;
        }
        .popoutItem {
          padding: .1rem .23rem 0.2rem .23rem;
          font-size: .1rem;
          height: 1rem;
          display: flex;
          justify-content: space-between;
          .popoutItem-left {
            width: 5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .popoutItem-top {
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: flex;
              align-items: center;
              p {
                color: #333333;
                font-size: .3rem;
                font-weight: Bold;
                margin-right: .2rem;
              }
              span {
                font-size: .24rem;
                color: #777777;
              }
            }
            .popoutItem-bot {
              color: #FF4D4F;
              span:nth-of-type(1) {
                font-size: .2rem;
              }
              span:nth-of-type(2) {
                font-size: .24rem;
              }
            }
          }
          .popoutItem-right {
            display: flex;
            align-items: center;
            img {
              width: 0.4rem;
              height: 0.4rem;
            }
            span {
              padding: 0 0.22rem;
              color: #FF4D4F;
              font-size: 0.32rem;
            }

          }
        }
      }

    }
  }

  .back {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .spacing {
    width: 100%;
    height: .2rem;
    background: rgba(245, 245, 245, 1);
  }

  .discussBottom {
    .notDiscuss {
      width: 100%;
      text-align: center;
      color: #777777;
      font-size: .3rem;
      margin-top: 2.57rem;
    }
  }

  .store-icon {
    width: .83rem;
    height: 100%;
    font-size: .1rem;
  }

  .store-icon img {
    width: .39rem;
    margin-left: .3rem;
    height: .39rem;

  }

  .store-adress-text {
    width: 4.53rem;


  }

  .store-adress-text p {
    width: 100%;
    font-size: .24rem;
    color: #777777;
    white-space: nowrap;
      /*一行显示*/
      overflow: hidden;
      /*超出部分隐藏*/
      text-overflow: ellipsis;
      /*用...代替超出部分*/
  }

  .store-call {
    display: flex;
    width: 1.2rem;
    align-items: center;
    border-left: 1px solid #D9D9D9;
    height: .65rem;
    margin-top: .3rem;
    margin-left: .4rem;
  }

  .store-call img {
    width: .62rem;
    margin-left: .42rem;

  }

  .store-adress-text-top {
    width: 100%;
    color: #000000;
    font-size: .28rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: .11rem;
  }

  .store-new {
    padding: .25rem .3rem .34rem .2rem;
    width: 6.52rem;
    border-radius: .2rem;
    background: #fff;
    margin-top: .18rem;
    margin-left: .24rem;
  }

  .store-title {
    color: #000000;
    font-size: .34rem;
    font-weight: bolder;
    margin-left: .1rem;
  }

  .store-conts {
    width: 7.02rem;
    height: 2.36rem;
    background: #fff;
    border-radius: .2rem;
    margin-left: .24rem;
    margin-top: .21rem;
  }

  .store-conts-imgList {}

  .store-conts-zizhi {
    padding: 0.25rem 0.3rem 0.34rem 0.3rem;
    width: 6.42rem;
    border-radius: 0.2rem;
    /* background: #fff; */
    margin-top: 0.18rem;
    margin-left: 0.24rem;
  }

  .store-Img {
    width: 100%;
    padding: .29rem 0 0 0;
    font-size: .1rem;
  }

  .store-conts-zizhi-title {
    font-size: .3rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .store-Img img {
    width: 2.08rem;
    height: 2.08rem;
    margin-bottom: .2rem;

  }

  .store-Img img:nth-of-type(1) {
    margin-right: .06rem;
  }

  .store-Img img:nth-of-type(2) {
    margin-right: .06rem;
  }

  .store-text {
    color: #777777;
    font-size: .24rem;

  }

  .store-name,
  .store-leibie {
    width: 100%;
    height: .72rem;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .store-time {
    width: 100%;
    height: .72rem;
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
  }

  /* 商家模块：距离和打电话 */

  .store-adress {
    width: 7.02rem;
    padding: .3rem 0;
    background: #fff;
    background-size: .1rem;
    margin-top: .2rem;
    margin-left: .24rem;
    display: flex;
  }

  .discussList {
    width: 6.42rem;
    padding: .24rem .3rem;
    height: 7rem;
    overflow: scroll;
    background: #fff;
    margin-left: .24rem;
    margin-top: .29rem;
    font-size: .1rem;
    border-radius: .2rem;
  }
  .discussListTwo {
    width: 6.42rem;
    padding: .24rem .3rem;
    height: 7.7rem;
    overflow: scroll;
    background: #fff;
    margin-left: .24rem;
    margin-top: .29rem;
    font-size: .1rem;
    border-radius: .2rem;
  }
  .discussListThere {
    width: 6.42rem;
    padding: .24rem .3rem;
    height: 10rem;
    overflow: scroll;
    background: #fff;
    margin-left: .24rem;
    margin-top: .29rem;
    font-size: .1rem;
    border-radius: .2rem;
  }


  .discussItem {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: .65rem;
  }
  /* .discussItem:last-child{
    margin-bottom: 0rem !important;
  } */

  .discussItem-left {
    width: .61rem;
    height: 0.61rem;
  }

  .discussItem-left img {
    width: .61rem;
    height: 0.61rem;
  }

  .discussItem-right {
    width: 5.62rem;
    .discussItem-cont {
      width: 5.4rem;
      padding: .27rem 0;
      font-size: .26rem;
      color: #333333;
    }
    .discussItem-reply {
      width: 5.27rem;
      padding: .12rem .17rem .23rem .18rem;
      background: #F2F2F2;
      color: #777777;
      font-size: .24rem;
      border-radius: .11rem;
    }
  }

  .discussItem-title {
    width: 100%;
    height: .62rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .discussItem-star {
      width: 100%;
      height: .26rem;
      display: flex;
      justify-content: space-between;
      .discussItem-star-nub {
        width: 1.5rem;
        height: .26rem;
        img {
          width: .24rem;
          height: .25rem;
        }
      }
      .discussItem-time {
        font-size: .22rem;
        color: #777777;
      }
    }
    .discussItem-name {
      width: 1.3rem;
      color: #333333;
      font-size: .26rem;
      white-space: nowrap;
      /*一行显示*/
      overflow: hidden;
      /*超出部分隐藏*/
      text-overflow: ellipsis;
      /*用...代替超出部分*/
    }

  }

  .discussTitle {
    width: 100%;
    height: .7rem;
    padding: .32rem 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .discussTitle-left {
      display: flex;
      width: 3.47rem;
      height: .7rem;
      border-right: 1px solid #D2D2D2;
    }
    .discussTitle-right {
      width: 3.55rem;
      margin-right: .3rem;
      height: .7rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .composite {
        height: .7rem;
        width: 1.35rem;
        text-align: center;
        font-size: .1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          color: #777777;
          font-size: .26rem;
        }
        span {
          color: #333333;
          font-size: .26rem;
        }
      }
    }
  }


  .discussNub {
    font-size: .5rem;
    color: #FE2A2A;
    line-height: .7rem;
    margin-left: .5rem;
  }

  .storeStar {
    height: .7rem;
    margin-left: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
      color: #777777;
      font-size: .24rem;
    }
    .starList {
      width: 1.9rem;
      height: .27rem;
      display: flex;
      span{
        margin-right: .09rem;
      }
      img {
        width: .24rem;
        height: .25rem;
        margin-right: .09rem;
      }
    }
  }

  /* .hot {
    width: 100%;
    height: .6rem;
    background: hsla(359, 100%, 65%, .5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    font-size: .26rem;
    text-align: center;
    line-height: .6rem;
  } */

  .tabChange {
    width: 100%;
    height: .8rem;
    background: #fff;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
      font-size: .3rem;
      color: #333333;
      width: 1.68rem;
      margin-right: .3rem;
      text-align: center;
      span {
        font-size: .2rem;
      }
    }
    .active {
      color: #FF4D4F;
      font-weight: bolder;
    }
  }

  /* .maginTabchange {
    margin-top: .6rem;
  } */

  .Start_title {
    font-size: 0.24rem;
    /* margin: 0.27rem 0 0 0; */
    background: #fff;
    height: .8rem;
    padding: 0 0.24rem;
    border-bottom: 1px solid #fdfdfd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .Start_title_left {
      width: 5rem;
      height: .8rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: .34rem;
        height: .3rem;
        margin-right: .32rem;
        /* float: left;
          margin-top:.23rem; */
      }
      span {
        color: #333333;
        font-size: .3rem;
      }
    }
    .Start_title_right {
      width: 2.2rem;
      display: flex;
      height: .8rem;
      justify-content: flex-end;
      align-items: center;
      span {
        color: #777777;
        font-size: .24rem;
        margin-right: .27rem;
      }
      i {
        font-size: 0.3rem;
        color: #777777;
      }
    }
    /* .rigth_btn {
      float: right;
      font-size: 0.3rem;
      color: #777777;
      padding-top: 0.15rem;
      padding-left: 0.27rem;
    } */
    .iconfont {
      color: #ff4d4f;
      font-size: 0.5rem;
    }

    span:nth-child(4) {
      font-size: 0.24rem;
      font-family: PingFang SC;
      /* font-weight: 500; */
      color: #373737;
      float: right;
      padding-top: 0.18rem;
    }
    /* span:nth-child(2) {
      float: left;
      padding-top: 0.15rem;
      font-size: 0.3rem;
      font-family: PingFang SC;
      color: #373737;
      padding-left: 0.21rem;
    } */
    .iconfont:nth-child(1) {
      float: left;
    }
  }

  .goods {
    position:absolute;
    top:2.4rem;
    bottom:1rem;
    width: 100%;
    overflow:hidden;
    display: flex;
    justify-content: space-between;
    /* .menu-wrapper {
      width:1.6rem;
      height: 100%;
      background-color: #EEEEEE;
      ul {
        li {
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(119, 119, 119, 1);
          background: #eeeeee;
          line-height: 1rem;
          text-align: center;
          position: relative;
          .info {
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            line-height: 0;
            padding: 0.18rem 0.1rem;
            border-radius: 50%;
            color: #ffffff;
            background: #ff4d4f;
            font-size: 0.24rem;
          }
        }
        .current{
          background: #ffffff;
          color: #333333;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      height: 100%;
      .food-list {
        font-size: .1rem;
     
      .foods-wrapper-title {
        font-size: 0.28rem;
        font-family: PingFang SC;
        color: rgba(51, 51, 51, 1);
        line-height: 0.7rem;
        height: .7rem;
        padding-left: 0.2rem;
      }
      .itemUi {
        padding-left: 0.21rem;
        
        .itemLi {
         
          display: flex;
            .greens_left {
              width: 1.88rem;
              height: 1.88rem;
              padding-bottom: .6rem;
              img {
                width: 1.88rem;
                height: 1.88rem;
                border-radius: 0.16rem;
              }
            }

        }
      
      
      }
    }
    } */
  }
  .greens-right {
    padding-left: 0.2rem;
    flex: 1;
  }
  .greens-right-title{
         font-size: 0.32rem;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                padding-bottom: 0.1rem;
                width: 3.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
  }
  .greens-right-shuoming{
    font-size: 0.24rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(119, 119, 119, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
  }
  .greens-right-pingjia{
    font-size: .1rem;
    span:nth-child(1) {
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: rgba(119, 119, 119, 1);
                }
                span:nth-child(2) {
                  background: rgba(255, 182, 32, 1);
                  border-radius: 0.15rem;
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 1);
                  padding: 0 0.1rem;
                  margin-left: .2rem;
                }

  }
  .greens-right-bot{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.27rem;
  }
  .greens-right-price{
    font-size: .1rem;
    span:nth-child(1) {
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: rgba(255, 77, 79, 1);
                }
                span:nth-child(2) {
                  font-size: 0.36rem;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: rgba(255, 77, 79, 1);
                }
                span:nth-child(3) {
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: rgba(119, 119, 119, 1);
                }
  }
  .greens-right-num{
                padding-right: 0.24rem;
                display: flex;
                .sub {
                  display: inline-block;
                  width: 0.4rem;
                  height: 0.4rem;

                }
                input{
                  color: #FF4D4F;
                  font-size: .32rem;
                  width: .5rem;
                  border: 0;
                }
                span {
                  padding: 0 0.22rem;
                  color: #FF4D4F;
                  font-size: .32rem;
                }
                .add {
                  width: 0.4rem;
                  height: 0.4rem;

                }
  }

  /* .greens_right {
              padding-left: 0.2rem;
              flex: 1;
              position: relative;
              p:nth-child(1) {
                font-size: 0.32rem;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                padding-bottom: 0.1rem;
              }
              p:nth-child(2) {
                font-size: 0.24rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(119, 119, 119, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              p:nth-child(3) {
                height: .7rem;
              }
              p:nth-child(3) {
                span:nth-child(1) {
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: rgba(119, 119, 119, 1);
                }
                span:nth-child(2) {
                  background: rgba(255, 182, 32, 1);
                  border-radius: 0.15rem;
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 1);
                  padding: 0 0.1rem;
                }
              }
              p:nth-child(4) {
                position: absolute;
                bottom: 0;
                span:nth-child(1) {
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: rgba(255, 77, 79, 1);
                }
                span:nth-child(2) {
                  font-size: 0.36rem;
                  font-family: PingFang SC;
                  font-weight: bold;
                  color: rgba(255, 77, 79, 1);
                }
                span:nth-child(3) {
                  font-size: 0.24rem;
                  font-family: PingFang SC;
                  font-weight: 500;
                  color: rgba(119, 119, 119, 1);
                }
              }
              p:nth-child(5) {
                float: right;
                margin-top: 0.27rem;
                padding-right: 0.24rem;
                display: flex;
                .sub {
                  display: inline-block;
                  width: 0.4rem;
                  height: 0.4rem;

                }
                span {
                  padding: 0 0.22rem;
                  color: #FF4D4F;
                  font-size: .32rem;
                }
                .add {
                  width: 0.4rem;
                  height: 0.4rem;

                }
              }
            } */

  /* .goods{
    position:absolute;
    top:2.4rem;
    bottom:1rem;
    width: 100%;
    overflow:hidden;
    display: flex;
    justify-content: space-between;
  }
  .goods .menu-wrapper{
    width:1.6rem;
    background-color: #f3f5f7;
  }
  .goods .foods-wrapper{
    flex: 1;
  }
  .menu-item{
    display:table;
    height:1rem;
    width:100%;
    line-height:1rem;
    text-align: center;
  }
  .current{
    background: #ffffff;
    color: #333333;
  }
  .menu-item .icon{
    display: inline-block;
    width:12px;
    height:12px;
    margin-right:4px;
    background-repeat: no-repeat;
    background-size:12px 12px;
  }
  .menu-item .text{
    font-size: 12px;
    display: table-cell;
    width:56px;
    vertical-align: middle;
  }
  .right_title {
        font-size: 0.28rem;
        font-family: PingFang SC;
        color: rgba(51, 51, 51, 1);
        line-height: 0.7rem;
        padding-left: 0.2rem;
      } */

  .Start_fotter {
    height: 1rem;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    border-top: 1px solid #cccccc;
    display: flex;
    .left {
      color: #ff4d4f;
      font-size: 0.24rem;
      padding: 0.2rem 0.4rem;
      position: relative;
      .iconfont {
        font-size: 0.5rem;
      }
      span {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        padding: 0rem 0.1rem;

        background: #ff4d4f;
        border-radius: 50%;
        color: #ffffff;
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
      }
    }
    .right {
      margin-left: auto;
      padding-top: 0.1rem;
      padding-right: 0.24rem;
      width: 1.98rem;
      font-size: 0.24rem;
      height: 0.76rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .van-popup--center {
    border-radius: 0.2rem;
    width: 5.55rem;
    min-height: 4.5rem;
    .boxprice{
      width: 4.4rem;
      margin-left: .6rem;
      display:flex;
      justify-content: space-between;
      align-items: center;
        span{
          color: #FF6D6F;
          font-size:.32rem;
        }
        .addShoppingTrolley {
          background: url("../../assets/imgs/add.png") no-repeat;
          background-size: 100%;
          width: 1.98rem;
          height: 0.5rem;
          /* margin: 0 auto; */
          display: block;
          margin-top: 0.3rem;
          margin-bottom: 0.3rem;
        }
    }
    
  }

  .delimgs {
    position: fixed;
    bottom: 3rem;
    width: 0.67rem;
    height: 0.67rem;
    z-index: 2002;
    left: 50%;
    transform: translateX(-50%);
    z-index: 55555;
  }

  .purchased {
    max-height: 4.3rem;
    min-height: 4.3rem;
    padding: 0.1rem 0.32rem 0 0.44rem;
    box-sizing: border-box;
    overflow: scroll;
    li {
      padding-top: 0.5rem;
      p:nth-child(1) {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
        padding-bottom: 0.24rem;
      }
      .van-row {
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 77, 79, 1);
      }
      .van-col--8 {
        span {
          display: inline-block;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(204, 204, 204, 1);
          border-radius: 0.1rem;
          width: 100%;
          line-height: 0.5rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(51, 51, 51, 1);
        }
        .col {
          color: rgba(255, 77, 79, 1);
          display: inline-block;
          background: rgba(253, 237, 230, 1);
          border: 1px solid rgba(255, 77, 79, 1);
          border-radius: 0.1rem;
          width: 100%;
          line-height: 0.5rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .van-col--8:nth-child(n + 4) {
        margin-top: 0.2rem;
      }
    }
  }
</style>
<style scoped>
  >>>.van-popup--center {
    top: 40%;
  }
</style>
<template>
  <div class="produit">
    <div class="swiper">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(image, index) in foodimgs" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          <span v-for="(image, index) in foodimgs" :key="index" :class="{'active':current==index}"></span>
        </div>
      </van-swipe>

    </div>

    <div class="produit-name">
      <div class="title">
        {{goods_name}}
      </div>
      <div class="luneNub">
        月售
        <span>{{sales}}</span>
      </div>
      <div class="produit-name-bottom">
        <div class="produit-price">
          <span>￥</span>
          <span>{{price}}</span>
        </div>
        <div class="produit-change" v-if='details'>
          <img class="sub" v-show="details.count !== 0" @click="sub()" src="../../assets/imgs/sub.png" />
          <span v-show="details.count !== 0">{{details.count}}</span>
          <img class="add" @click="add()" src="../../assets/imgs/adds.png" />
        </div>
      </div>

    </div>

    <div v-if="foodinfo.length!=0" class="produit-jianjie">
      {{foodinfo}}
    </div>

    <div class="discussBottom">
        
      <div v-if="list.length!=0" class="discussList">
          <div v-if="list.length!=0" class="title">
              评论
            </div>
        <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
          <div v-for="(item,index) in list" class="discussItem">
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
                      <img v-if="item.star>=1" src="../../assets/imgs/star01_select.png" />
                      <img v-if="item.star>=2" src="../../assets/imgs/star01_select.png" />
                      <img v-if="item.star>=3" src="../../assets/imgs/star01_select.png" />
                      <img v-if="item.star>=4" src="../../assets/imgs/star01_select.png" />
                      <img v-if="item.star>=5" src="../../assets/imgs/star01_select.png" />

                      <img v-if="item.star<1" src="../../assets/imgs/star01.png" />
                      <img v-if="item.star<2" src="../../assets/imgs/star01.png" />
                      <img v-if="item.star<3" src="../../assets/imgs/star01.png" />
                      <img v-if="item.star<4" src="../../assets/imgs/star01.png" />
                      <img v-if="item.star<5" src="../../assets/imgs/star01.png" />
                    </div>
                  <!-- 评论时间 -->
                  <div class="discussItem-time">
                    {{item.time | formatDate}}
                  </div>
                </div>
              </div>
              <!-- <div class="discussItem-cont">
                      鸡的味道很好，分量也很足，挺好吃的。鸡的味道很好，分量也很足，挺好吃的。
                  </div>
                  <div class="discussItem-reply">
                      商家回复：亲爱的顾客，感谢你选择品尝本店的美食，谢谢您认可我们的口味和服务，我们会继续努力，为您提供更好的服务，祝您生活愉快！
                  </div> -->
            </div>
          </div>
        </van-list>
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
  export default {
    data() {
      return {
        saveStore: [],
        details: null,
        purchasedList: {},
        purchasedShow: false,
        categoryList:[],
        category:[],
        id: 0,
        list:[],
        count:0,
        loading: false,
        finished: false,
        isSub: false,
        images: [
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34729/14/3948/120618/5cbeee07Efbe17ec5/d57ddd4fbbbc09e0.jpg!cr_1125x549_0_72!q70.jpg.dpg',
          'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34423/17/5378/97852/5cbecd7bE73730c2f/76e5359d8fb3a1e1.jpg!cr_1125x549_0_72!q70.jpg.dpg'
        ],
        isdiscuss: true,
        current: 0, // 轮播到当前的小圆点
        active: 0, // 底部被选中s
        people: 0, // 用餐人数
        jianjie: '以猪排骨、杏鲍菇作为主要食材，以干辣椒、八角、丁香、姜片、盐、老抽、生抽、料酒、冰糖等作为辅料制作而成。',
        foodimgs: [],
        foodinfo: '',
        goods_name: '',
        sales:'',
        picture: '',
        price: '',
        page: 1,
        pageSize: 10
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

    },
    created() {
      if (this.$route.query.id && this.$route.query.ins_id) {
        this.saveStore = localStorage.getItem('saveStore') ? JSON.parse(localStorage.getItem('saveStore')) : []
        this.id = this.$route.query.id;
        this.ins_id = this.$route.query.ins_id;
        // 测试id:124
        console.log('this.id', this.id)
        this.init()
        this.foodshop()
       
      }
    },
    methods: {
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
      getListCount () {
        if (localStorage.getItem("saveStore")) {
          this.details.count = 0
          const list = JSON.parse(localStorage.getItem("saveStore"))
          // this.categoryList = this.categoryList.map(item => {
          //   let obj = item
          //   obj.count = 0
            for (let i = 0; i < list.length; i++) {
              if (list[i].id === this.details.id) {
                this.details.count += list[i].count
                this.$forceUpdate()
              }
            }
          //   return obj
          // })
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
            this.getListCount()
            return
          }
        }
        this.saveStore.push(cartGoods)
        localStorage.setItem("saveStore", JSON.stringify(this.saveStore))
        this.getListCount()
      },
       // 弹窗显示加入购物车
      addCar() {
        
        this.purchasedShow = false
        var cartGoods = {cart: this.purchasedList.cart, id: this.purchasedList.id, count: 1, goods_name: this.purchasedList.goods_name, picture_url: this.purchasedList.picture_url,market_price:this.purchasedList.market_price,category_id:this.purchasedList.category_id}
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
               // 获取菜品接口
     foodshop(){
        // this.$toast.loading({
        //   message: "加载中..."
        // });
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/foods",
          params: {
            // develop:1,
            ins_id:this.ins_id,
            token:token,
            pageSize:10,
          }
        }).then(res => {
          console.log('菜品',res)
          // this.$toast.clear(); 
          if(res.data.code == 10001){ 
              //评分
              this.category = res.data.responseData.category;
              // if (JSON.parse(localStorage.getItem("saveStore"))) {
              //   const list = JSON.parse(localStorage.getItem("saveStore")).arrs
              //   res.data.responseData.data = res.data.responseData.data.map(item => {
              //     let obj = item
              //     console.log(JSON.parse(localStorage.getItem("saveStore")), '222')
              //     for (let i = 0; i < list.length; i++) {
              //       if (list[i].id === obj.id) {
              //         obj.count = list[i].count
              //       }
              //     }
              //     return obj
              //   })
              // }
            
              this.categoryList = res.data.responseData.data;
              console.log(this.categoryList, '1111111')

          }else{

          }
        
        })
      },

      onLoad() {
        this.init()
      },
      sub() {
        var item = this.details
        if (item.skuinfo.length !== 0) {
           var ary = []
          for (let i = 0; i < this.saveStore.length; i++) {
            let items = this.saveStore[i]
            if (items.id === item.id) {
              ary.push(items)
            }  
          }
          console.log(ary)
          if (ary.length == 1) {
            console.log(222222222)
              var cartGoods = {cart: {sku_name: ary[0].cart.sku_name, price: ary[0].cart.price, sku_id: ary[0].cart.sku_id}, id: item.id, count: 1, goods_name:item.goods_name, picture_url: item.picture_url,market_price:item.market_price,category_id:item.category_id }
              this.compire(cartGoods, 1)
              this.getListCount()
              this.$forceUpdate()
            }  else {
              this.$toast('多规格商品只能去购物车删除噢')
            }
           return
        }
         
        //  this.$toast(res.msg)
        // if(item.count > 1){
          var cartGoods = {cart: {sku_name: item.goods_name, price: item.price, sku_id: item.id}, id: item.id, count: 1, goods_name:item.goods_name, picture_url: item.picture_url,market_price:item.market_price,category_id:item.category_id }
          this.compire(cartGoods, item.count)
        
          // 
          this.getListCount()
          this.$forceUpdate()
      
      },
      add() {
        // this.purchasedShow = true
        var item = this.details
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
        else{
          if(!item.count){
            this.$set(item,"count",1)  

          }else{
            item.count++
          }
          var cartGoods = {cart: {sku_name: item.goods_name, price: item.price, sku_id: item.id}, id: item.id, count: 1, goods_name:item.goods_name, picture_url: item.picture_url,market_price:item.market_price,category_id:item.category_id }
          this.compire(cartGoods)
        }
        
        
      },
      //监控选择菜品类及数量
      change(){
        var arr=[];
        var nums = 0;
        var money =0;
        for(var i=0;i<this.categoryList.length;i++){
         
          // if(this.categoryList[i].count>0){
          //   if(this.categoryList[i].id == this.id){
          //      console.log('this.categoryList[i].count333', this.categoryList[i].count)
          //       this.categoryList[i].count = this.count;
          //       arr.push(this.categoryList[i])
          //       nums += this.categoryList[i].count
          //       money += this.categoryList[i].count*this.categoryList[i].price
          //   }else{
          //      arr.push(this.categoryList[i])
          //       nums += this.categoryList[i].count
          //       money += this.categoryList[i].count*this.categoryList[i].price
          //   }
              
          // }
          if(this.categoryList[i].id == this.id){
            this.categoryList[i].count = this.count;
            if(this.categoryList[i].count>0){
                arr.push(this.categoryList[i])
                nums += this.categoryList[i].count
                money += this.categoryList[i].count*this.categoryList[i].price
            }
          }else{
            if(this.categoryList[i].count>0){
                arr.push(this.categoryList[i])
                nums += this.categoryList[i].count
                money += this.categoryList[i].count*this.categoryList[i].price
            }
            }
        }
        this.arrs = arr;  // 所有的购物车数据
        this.nums = nums;  // 所有的菜品个数
        this.money = money.toFixed(2);  // 总价
        var save = {}
        save.arrs = this.arrs
        save.nums = this.nums
        save.money = this.money
        console.log('save',save)
        var saveStore = JSON.stringify(save)
        localStorage.setItem("saveStore", saveStore)
      },

        
       
      init() {
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/foodetial",
          params: {
            // develop: 1,
            id: this.id,
            page: this.page,
            pageSize: 10,
            token: token
          }
        }).then(res => {
          console.log('商品详情', res)
          if (res.data.code == 10001) {
            this.details = res.data.responseData
            this.details.count = 0 
            if (localStorage.getItem('saveStore')) {
              for (let i = 0; i < JSON.parse(localStorage.getItem('saveStore')).length; i++) {
              let item = JSON.parse(localStorage.getItem('saveStore'))[i]
              if(this.details.id === item.id) {
                this.details.count+=item.count
              }
            }
            }
           
            this.foodimgs = res.data.responseData.foodimgs;
            this.foodinfo = res.data.responseData.foodinfo;
            this.goods_name = res.data.responseData.goods_name;
            this.sales = res.data.responseData.sales;
            this.price = res.data.responseData.price;
            var page =  res.data.responseData.comment.page;
            var totalpage = res.data.responseData.comment.totalpage;
            let id =  res.data.responseData.id;
            
            // if (JSON.parse(localStorage.getItem("saveStore"))) {
             
            //     const list = JSON.parse(localStorage.getItem("saveStore")).arrs
            //       for (let i = 0; i < list.length; i++) {
            //         if (list[i].id === id) {
            //           this.count = list[i].count
            //           this.isSub = true;
            //         }
            //       }
       
          
            //   }

            console.log("page",page)
            console.log("totalpage",totalpage)
            if(page<totalpage){
              this.list.push(...res.data.responseData.comment.data)
              this.page++
            }else{
              this.finished = true;
              this.list.push(...res.data.responseData.comment.data)
            }
            this.loading = false

          } else {
            this.$toast.fail("菜详情报错");
          }

        })
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
          this.isSub = true
          this.people++
        } else {
          // 减少
          if (this.people <= 1) {
            this.isSub = false
            return
          } else {
            this.isSub = true
            this.people--
          }

        }
      },
    },


  }

</script>
<style lang='less' scoped>
  .produit {
    padding: 0.1rem 0.24rem;
  }

  .produit-banner {
    width: 7.02rem;
    height: 3.51rem;
  }

  .produit-name {
    padding: 0.33rem 0.3rem 0.33rem 0.3rem;
    width: 6.42rem;
    border-radius: 0.2rem;
    background: #fff;
    margin-top: 0.2rem;
    .title {
      color: #000000;
      font-size: .36rem;
      font-weight: bolder;
    }
    .luneNub {
      color: #777777;
      font-size: .24rem;
      margin-top: .1rem;
    }
    .produit-name-bottom {
      margin-top: .22rem;
      display: flex;
      font-size: .1rem;
      justify-content: space-between;
      .produit-price {
        color: #FF4D4F;
        span:nth-of-type(1) {
          font-size: .24rem
        }
        span:nth-of-type(2) {
          font-size: .3rem
        }
      }
      .produit-change {
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
      }
    }
  }

  .produit-jianjie {
    padding: 0.33rem 0.3rem 0.33rem 0.3rem;
    width: 6.42rem;
    border-radius: 0.2rem;
    background: #fff;
    margin-top: 0.2rem;
    color: #777777;
    font-size: .26rem;

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

  .discussList {

    width: 6.42rem;
    padding: .24rem .3rem;
    background: #fff;
    margin-top: .29rem;
    /* margin-left: .24rem; */
    font-size: .1rem;
    border-radius: .2rem;
    .title{
      color: #000000;
      font-size: .36rem;
      font-weight: bolder;
      margin-bottom:.3rem;
    }
  }

  .discussItem {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: .4rem;
  }

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
      width: 3.42rem;
      height: .7rem;
    }
    .discussTitle-right {
      width: 4.05rem;
      height: .7rem;
      border-left: 1px solid #D2D2D2;
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






  .swiper {
    /* width: 100%; */
    width: 7.02rem;
    height: 3.51rem;
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
    bottom: 2rem;
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
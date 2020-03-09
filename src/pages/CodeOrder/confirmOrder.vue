<template>
  <div class="confirm">
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

    <div class="confirmCont">
      <div class="confirmCont-title">
        核对订单信息
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
                <img class="sub"  @click="sub(item,index)" src="../../assets/imgs/sub.png" />
                <span>{{item.count}}</span>
                <img class="add" @click="add(item)" src="../../assets/imgs/adds.png" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="store-conts">
      <div class="store-name">
        <div class="store-name-left">
          优惠活动
        </div>
        <div class="store-name-right">
          <span>暂无使用优惠卷</span>
          <i class="iconfont rigth_btn">&#xe6b5;</i>
        </div>
      </div>
      <div class="store-leibie">
        <div class="store-name-left">
          您有5积分,可为您立省1元
        </div>
        <div @click="check(index)" class="store-name-right">
          <img v-show="index==1" src="../../assets/imgs/iconSucess.png" />
          <img v-show="index==0" src="../../assets/imgs/iconnone.png" />
        </div>
      </div>
      <div class="store-leibie">
        <div class="store-name-left">
          订单备注
        </div>
        <div @click="goRemark" class="store-name-right">
          <p v-if="isText==false">口味、偏好</p>
          <p v-if="isText==true">{{text}}</p>
          <i class="iconfont rigth_btn">&#xe6b5;</i>

        </div>
      </div>
      <div class="store-time">
        <div class="store-name-left">
          开具发票
        </div>
        <div class="store-name-right">
          请到收银台开具
        </div>
      </div>
    </div>

    

    <div class="Start_fotter">
      <div @click="goStar" class="left">
        <i class="iconfont">&#xe72c;</i>
        <span>{{nums}}</span>
      </div>
      <div class="content">
          <p>
            <span>￥</span>
            <span>{{money}}</span>
          </p>
          <p>￥{{money}}</p>
        </div>
      <!-- 去结算 -->
      <div class="right">
        <img src="../../assets/imgs/js.png" alt />
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        isText:false,
        index: 1,
        zhuo: 14,
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
      this.init()
      // sessionStorage.setItem("deskinfo", deskinfo);
     if(JSON.parse(localStorage.getItem("saveStore"))){
       this.getAll()
     }
      
    },
    methods: {
      init(){
        
        if(this.$store.getters.text){
          console.log("this.$store.getters",this.$store.getters.text)
          this.isText = true
          this.text = this.$store.getters.text
        }else{
          this.isText = false
        }
        if(localStorage.getItem("saveStore")){
          let saveStore = JSON.parse(localStorage.getItem("saveStore"))
          this.saveStore = saveStore;
          this.getAll()
        }
        if(sessionStorage.getItem("people")){
           this.people = sessionStorage.getItem("people");
           console.log('peoplepeople',this.people)
        }
        if(sessionStorage.getItem("qr")){
           this.qr = sessionStorage.getItem("qr");
           console.log('qr',this.qr)
        }
        if(sessionStorage.getItem("shopname")){
           this.shopname = sessionStorage.getItem("shopname");
           console.log('shopname',this.shopname)
        }
        if(sessionStorage.getItem("deskinfo")){
           let deskinfo = JSON.parse(sessionStorage.getItem("deskinfo"));
           this.deskinfo = deskinfo;
           this.zhuo = deskinfo.areaname + deskinfo.deskname
           console.log('deskinfo',this.zhuo)
        }

      },
      getAll () {
        this.nums = 0
        this.money = 0
        this.marketPrice = 0
        for (let i = 0; i < this.saveStore.length; i++) {
          let item = this.saveStore[i]
          this.nums+=item.count
          this.money += (parseFloat(item.cart.price) * item.count);
          this.marketPrice =+ (Number(item.cart.market_price) * Number(item.count))
        }
        this.money = this.money.toFixed(2)
        this.marketPrice = this.marketPrice.toFixed(2)
        localStorage.setItem('total', JSON.stringify({money: this.money, nums: this.nums,marketPrice:this.marketPrice}))
        localStorage.setItem("saveStore", JSON.stringify(this.saveStore))

        this.save = {}

        let saveStore = JSON.parse(localStorage.getItem("saveStore"))
        let total = JSON.parse(localStorage.getItem("total"))
        this.save.saveStore = saveStore;
        this.save.total = total;
        this.save.shopname = this.shopname;
        this.save.deskinfo = this.deskinfo;
        
        localStorage.setItem("save", JSON.stringify(this.save))
        console.log('save',this.save)
      },
      sub(item, index) {
        if(item.count >1){
          item.count--
       } else {
            this.$dialog.confirm({
                // title: '删除',
                message: '删除该菜品吗？'
              }).then(() => {
                this.saveStore.splice(index, 1)
                this.getAll()
                this.$forceUpdate()
                // on confirm
              }).catch(() => {
                // on cancel
              });

        
       }
       this.$forceUpdate()
        console.log(this.saveStore)
        localStorage.setItem('saveStore', JSON.stringify(this.saveStore))
        this.getAll()
      //  this.change()
      },
      add(item) {
        console.log("item",item)
        item.count++
        this.$forceUpdate()
        console.log(this.saveStore)
        localStorage.setItem('saveStore', JSON.stringify(this.saveStore))
        this.getAll()
        
      },

      // 跳转购物车
      goStar(){
        this.$router.go(-1);
      },
     
      check(index) {
        if (index == 1) {
          this.index = 0
        } else {
          this.index = 1
        }
      },
      goRemark(){
        this.$router.push({
          path:'/remark'
        })
      }

    },


  }

</script>
<style lang='less' scoped>
  .confirm {
    padding: 0 .24rem .5rem .24rem;
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

  .confirmCont {
    width: 6.42rem;
    padding: 0.3rem .3rem .26rem .3rem;
    background: #fff;
    border-radius: .1rem;
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
              align-items: center;
              .sub {
                width: 0.4rem;
                height: 0.4rem;
              }
              .add {
                width: 0.4rem;
                height: 0.4rem;
              }
              span {
                padding: 0 0.32rem;
                color: #FF4D4F;
                font-size: .32rem;
              }
            }
          }
        }
      }
    }
  }

  .orderItem:last-child{
    margin-bottom:0rem !important;
  
  }

  .Start_fotter {
    background: #fff;
    height: 0.98rem;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
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
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
        text-decoration: line-through;
        padding-bottom: 0.1rem;
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

  /* 订单信息模块 */

  .store-conts {
    height: 3.22rem;
    width: 100%;
    border-radius: .1rem;
    background: #fff;
    border-radius: .2rem;
    margin-top: .21rem;
    margin-bottom: 1rem;
  }

  .store-conts-imgList {}

  .store-conts-zizhi {
    width: 6.42rem;
    border-radius: 0.2rem;
    margin-top: 0.18rem;
  }

  .store-name,
  .store-leibie {
    width: 100%;
    height: .8rem;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .store-time {
    width: 100%;
    height: .8rem;
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
    display: flex;
    width:3rem;
    justify-content: flex-end;
    align-items: center;
    color: #777777;
    font-size: .24rem;
    margin-right: .2rem;
    p {
      width: 2.4rem;
      text-align: right;
      margin-right: .05rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    i {
      /* margin-top: .1rem; */
    }
    img {
      width: .3rem;
      height: .31rem;
    }
  }
</style>
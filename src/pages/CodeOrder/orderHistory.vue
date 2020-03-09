<template>
  <div class="history">
   <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
      <div v-for="(item,index) in list" :key="index" @click="goList(item)" class="hisList" v-if="item.pay_status==2">
    <!-- <div v-if="item.pay_status==2"  v-for="(item,index) in list" :key="index" @click="goList" class="hisList"> -->

      <div class="hisList-title">
        <p>{{item.orderinfo.shopname}}</p>
        <span>{{item.create_time | formatDate}}</span>
      </div>
      <div class="cent">
        <div class="centLeft">
            <img v-if="item.orderinfo.saveStore" :src="item.orderinfo.saveStore[0].picture_url" alt />
        </div>
        <div class="centRight">
          <div v-if="item.orderinfo.saveStore" class="rightName">{{item.orderinfo.saveStore[0].goods_name}}</div>
          <div v-if="item.orderinfo.saveStore" class="rightGui">{{item.orderinfo.saveStore[0].cart.sku_name}}</div>
          <div class="number">
            <div class="numberLeft">
              <p v-if="item.orderinfo.saveStore">￥{{item.orderinfo.saveStore[0].cart.price}}</p>
              <span v-if="item.orderinfo.saveStore">X {{item.orderinfo.saveStore[0].count}}份</span>
            </div>
            <div @click.stop="goEvaluate(item)" v-if="item.comment_status==1" class="numberRight">
              <img src="../../assets/imgs/pingjia.png" />
            </div>
            <div @click.stop="look(item)" v-if="item.comment_status==2" class="text">
                查看评价
            </div>
          </div>
        </div>

      </div>

  </div>
  </van-list>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list:[],
        page:1,
        loading: false,
        finished: false,
        // list: [
        //   {
        //     name: '沙县小吃',
        //     time: '2019-09-18 12:14',
        //     orderName: "红烧排骨",
        //     guige: '微辣/规格2',
        //     price: 15,
        //     num: 5,
        //     status: 1
        //   },
        //   {
        //     name: '沙县小吃',
        //     time: '2019-09-18 12:14',
        //     orderName: "红烧排骨",
        //     guige: '微辣/规格2',
        //     price: 15,
        //     num: 5,
        //     status: 2
        //   }
        // ]

      }
    },
    // mounted() {
    //   if (window.history && window.history.pushState) {
    //     history.pushState(null, null, document.URL);
    //     window.addEventListener('popstate', this.goBack, false);
    //   }
    // },
    // destroyed() {
    //   window.removeEventListener('popstate', this.goBack, false);
    // },
    created() {
      // this.init()
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
      }
    },
    methods: {
      // goBack() {

      // this.$router.replace({ 
      //   path: '/StartingPoin',
      //     query:{
      //       ins_id:this.ins_id
      //     }
      //   })

      // },
      onLoad() {
        this.init()
      },
      init(){
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/order_list",
          params: {
            develop:1,
            token:token,
            pageSize:10,
            page:this.page
          }
        }).then(res => {
          console.log('评价历史',res)
          // pay_status :2已支付  0未支付
          // comment_status： 2 已评价  1未评价
 
          if(res.data.code == 10001){
              //评分
            let page =  res.data.responseData.page;
            let totalpage = res.data.responseData.totalpage;

            console.log("page",page)
            console.log("totalpage",totalpage)
            if(page<totalpage){
              this.list.push(...res.data.responseData.data)
              this.page++
            }else{
              this.finished = true;
              this.list.push(...res.data.responseData.data)
            }
            this.loading = false
            

          }else{

          }
        
        })


      },
     
      look(item){
        console.log('item',item)
        this.$router.push({
          path:'/historyEvaluate',
          query: {
            order_id:item.id
          }
        })
      },
      goEvaluate(item) {
        console.log(item)
        sessionStorage.setItem("item",JSON.stringify(item))
        this.$router.push({
          path:'/evaluate'
        })
       
      },
      goList(item) {
        console.log('item',item)
        this.$router.push({
          path:'/historyDetail',
          query: {
            order_id:item.id
          }
        })
      
      }

    },


  }

</script>
<style lang='less' scoped>
  .history {
    width: 7.02rem;
    height: auto;
    padding: .2rem .24rem;
    .hisList {
      width: 6.42rem;
      padding: .25rem 0.3rem;
      background: #fff;
      border-radius: .14rem;
      margin-bottom: .2rem;
    }
  }

  .hisList-title {
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .3rem;
    p{
      color:#333333;
      font-size:.28rem;
      font-weight:bold;
    }
    span{
      color: #777777;
      font-size: .24rem;
    }
  }
  .cent{
    width: 100%;
    height: 1.65rem;
    display: flex;
    justify-content: space-between;
  }
  .centLeft{
    width: 1.65rem;
    height: 1.65rem;
    img{
      width:1.64rem;
      height: 1.64rem;
    }
  }
  .centRight{
    width: 4.58rem;
    height: 1.7rem;
  }
  .rightName{
    width: 100%;
    height: .35rem;
    font-size: .28rem;
    color: #333333;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rightGui{
    width: 100%;
    font-size: .24rem;
    margin-top: .25rem;
    color: #777777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .number{
    display: flex;
    justify-content: space-between;
    margin-top: .25rem;
  }
  .numberLeft{
    display: flex;
    justify-content: flex-start;
  }
  .numberLeft p{
    color: #333333;
    font-size: .24rem;
    margin-right: .3rem;
    line-height: .7rem;
  }
  .numberLeft span{
    color: #777777;
    font-size: .24rem;
    line-height: .7rem;
  }
  .numberRight{
    width: 1.5rem;
    height: .5rem;
    font-size: .1rem;
    img{
      width:1.5rem;
      height: .5rem;
    }
  }
  .text{
    width: 1.5rem;
    height: .5rem;
    border:1px solid rgba(255,77,79,1);
    border-radius:.25rem;
    text-align: center;
    line-height: .5rem;
    font-size: .24rem;
    color: #FF4D4F;
  }
  
</style>
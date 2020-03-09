<template>
  <div class="evaluate">
    <div class="title">
      <div class="titleTop">
        <div class="titleImg">
          <img :src="order_detial.door_head_img" />
        </div>
        <div class="titleCen">
          <p>{{order_detial.name}}</p>
          <div class="star">
            <img v-if="star.s0>=1" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s0>=2" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s0>=3" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s0>=4" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s0>=5" src="../../assets/imgs/star_select.png" />

            <img v-if="star.s0<1" src="../../assets/imgs/star.png" />
            <img v-if="star.s0<2" src="../../assets/imgs/star.png" />
            <img v-if="star.s0<3" src="../../assets/imgs/star.png" />
            <img v-if="star.s0<4" src="../../assets/imgs/star.png" />
            <img v-if="star.s0<5" src="../../assets/imgs/star.png" />
          </div>
        </div>
        <div class="starNum">
          {{star.s0}}分
        </div>
      </div>

      <div class="titleBot">
        <div class="starHj">
          <span>就餐环境</span>
          <div class="star">
            <!-- <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" /> -->
            <img v-if="star.s1>=1" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s1>=2" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s1>=3" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s1>=4" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s1>=5" src="../../assets/imgs/star_select.png" />

            <img v-if="star.s1<1" src="../../assets/imgs/star.png" />
            <img v-if="star.s1<2" src="../../assets/imgs/star.png" />
            <img v-if="star.s1<3" src="../../assets/imgs/star.png" />
            <img v-if="star.s1<4" src="../../assets/imgs/star.png" />
            <img v-if="star.s1<5" src="../../assets/imgs/star.png" />
          </div>
        </div>
        <div class="starHj">
          <span>服务态度</span>
          <div class="star">
            <img v-if="star.s2>=1" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s2>=2" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s2>=3" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s2>=4" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s2>=5" src="../../assets/imgs/star_select.png" />

            <img v-if="star.s2<1" src="../../assets/imgs/star.png" />
            <img v-if="star.s2<2" src="../../assets/imgs/star.png" />
            <img v-if="star.s2<3" src="../../assets/imgs/star.png" />
            <img v-if="star.s2<4" src="../../assets/imgs/star.png" />
            <img v-if="star.s2<5" src="../../assets/imgs/star.png" />
          </div>
        </div>
        <div class="starHj">
          <span>菜品品质</span>
          <div class="star">
            <img v-if="star.s3>=1" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s3>=2" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s3>=3" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s3>=4" src="../../assets/imgs/star_select.png" />
            <img v-if="star.s3>=5" src="../../assets/imgs/star_select.png" />

            <img v-if="star.s3<1" src="../../assets/imgs/star.png" />
            <img v-if="star.s3<2" src="../../assets/imgs/star.png" />
            <img v-if="star.s3<3" src="../../assets/imgs/star.png" />
            <img v-if="star.s3<4" src="../../assets/imgs/star.png" />
            <img v-if="star.s3<5" src="../../assets/imgs/star.png" />
          </div>
        </div>

      </div>
    </div>

    <div class="text">
      <div class="textCai">
        {{order_detial.content}}
      </div>
      <p>匿名</p>
    </div>


    <div class="titleBotTwo">
      <div v-for="item in star_detial" class="starHj">
        <p>{{item.goods_name}}</p>
        <div class="star">
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
      </div>
      <!-- <div class="starHj">
        <p>西红柿</p>
        <div class="star">
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star.png" />
        </div>
      </div>
      <div class="starHj">
        <p>热干面多大都</p>
        <div class="star">
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star_select.png" />
          <img src="../../assets/imgs/star.png" />
        </div>
      </div> -->

    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        order_detial:[],
        star_detial:[],
        star:{}
      }
    },

    created() {
      if(this.$route.query.order_id){
        this.order_id = this.$route.query.order_id;
        this.init()
      }
    },
    methods: {
      init(){
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/comment_star_detial",
          params: {
            token:token,
            order_id:this.order_id,
           
          }
        }).then(res => {
          console.log('查看评价',res)
          if(res.data.code == 10001){
            this.order_detial = res.data.responseData.order_detial;
            this.star = JSON.parse(this.order_detial.star);
            this.star_detial = res.data.responseData.star_detial;
            console.log('this.star',this.star_detial)


          }else{

          }
        })


      }


    },


  }

</script>
<style lang='less' scoped>
  .evaluate {
    width: 7.02rem;
    margin-left: .24rem;
    height: auto;
    .title {
      width: 6.52rem;
      padding: .3rem .25rem;
      background: rgba(255, 255, 255, 1);
      border-radius: .1rem;
      .titleTop {
        width: 100%;
        height: .81rem;
        display: flex;
        /* justify-content: space-between; */
        .titleImg {
          width: .8rem;
          height: .8rem;
          font-size: .1rem;
          img {
            width: .8rem;
            height: .8rem;
          }
        }
        .titleCen {
          width: 3.3rem;
          height: .81rem;
          margin-left: .6rem;
          P {
            color: #333333;
            font-size: .26rem;
          }
          .star {
            width: 100%;
            height: .5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: .4rem;
              height: .4rem;
              margin-right:.1rem;
            }
          }
        }
        .starNum {
          color: #333333;
          font-size: .3rem;
          height: .8rem;
          line-height: 1.3rem;
          margin-left: .7rem;
        }
      }
      .titleBot {
        width: 100%;
        height: 1.78rem;
        margin-top: .65rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .starHj {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: .45rem;
          span {
            color: #333333;
            font-size: .28rem;
          }
          .star {
            width: 3.3rem;
            height: .45rem;
            margin-left: .28rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: .4rem;
              height: .4rem;
            }
          }
        }
      }
    }
  }
  .text{
    width: 6.52rem;
    margin-top: .2rem;
    padding: 0.3rem 0.25rem 0 .25rem;
    background: #ffffff;
    border-radius: 0.1rem;
    .textCai{
      font-size: .26rem;
      color: #333333;
      padding-bottom: .6rem;
      border-bottom: 1px solid rgba(238,238,238,1);
     }
    p{
      width:100%;
      height: .8rem;
      line-height:.8rem;
      font-size:.28rem;
      color:#333333;
    }
  }
 
  .titleBotTwo{
    width: 6.52rem;
    margin-top: .2rem;
    padding: 0.2rem .25rem;
    background: #ffffff;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .starHj {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: .85rem;
          p {
            color: #333333;
            font-size: .28rem;
            width: 1.3rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .star {
            width: 3.3rem;
            height: .45rem;
            margin-left: .28rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: .4rem;
              height: .4rem;
            }
          }
        }
  }
</style>
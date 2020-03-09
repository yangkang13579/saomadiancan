<template>
  <div class="evaluate">
    <div class="title">
      <div class="titleTop">
        <div class="titleImg">
          <img src="https://yidianhulian-test1.oss-cn-shanghai.aliyuncs.com/upload/Businessdoor/20190724/156393884953.jpg" />
        </div>
        <div class="titleCen">
          <p>{{store.orderinfo.shopname}}</p>
          <div class="star">
            <!-- <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" />
            <img src="../../assets/imgs/star_select.png" /> -->
            <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" track-by="index"></span>
           
          </div>
        </div>
        <div class="starNum">
          {{fen}}分
        </div>
      </div>

      <div class="titleBot">
        <div class="starHj">
          <span>就餐环境</span>
          <div class="star">
            <van-rate
              v-model="value1"
              :size="20"
              @change="change1"
              gutter="10px"
              color="#FFAE21"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
        <div class="starHj">
          <span>服务态度</span>
          <div class="star">
              <van-rate
                v-model="value2"
                :size="20"
                @change="change2"
                gutter="10px"
                color="#FFAE21"
                void-icon="star"
                void-color="#eee"
              />
            </div>
        </div>
        <div class="starHj">
          <span>菜品品质</span>
          <div class="star">
            <van-rate
              v-model="value3"
              @change="change3"
              :size="20"
              gutter="10px"
              color="#FFAE21"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>

      </div>
    </div>

    <div class="text">
      <div class="textCai">
        <textarea v-model="cent" placeholder="宝贝满足你的期待吗？请说出它的优点和美中不足"></textarea>
      </div>
      <!-- <div class="niname">
            <div class="store-name-right">
              <img @click="check(1)" v-show="indexs==1" src="../../assets/imgs/iconSucess.png" />
              <img @click="check(0)" v-show="indexs==0" src="../../assets/imgs/iconnone.png" />
            </div>
           <span>匿名</span>
       </div> -->
    </div>


    <div class="titleBotTwo">
        <div v-for="(item,index) in store.orderinfo.saveStore" class="starHj">
            <p>{{item.goods_name}}</p>
            <div class="star">
                <van-rate
                @change="change4(item)"
                v-model="item.value4"
                :size="20"
                gutter="10px"
                color="#FFAE21"
                void-icon="star"
                void-color="#eee"
              />
            </div>
        </div>
      <!-- <div class="starHj">
        <p>红烧排骨</p>
        <div class="star">
            <van-rate
            v-model="value4"
            :size="20"
            gutter="10px"
            color="#FFAE21"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
      <div class="starHj">
        <p>西红柿</p>
        <div class="star">
            <van-rate
              v-model="value5"
              :size="20"
              gutter="10px"
              color="#FFAE21"
              void-icon="star"
              void-color="#eee"
            />
        </div>
      </div>
      <div class="starHj">
        <p>热干面多大都</p>
        <div class="star">
            <van-rate
              v-model="value6"
              :size="20"
              gutter="10px"
              color="#FFAE21"
              void-icon="star"
              void-color="#eee"
            />
        </div>
      </div> -->

    </div>

    <div @click="titleBtn()" class="titleBtn">
      <img src="../../assets/imgs/btnSub.png" />
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        score: 4,
        indexs:1,
        star_list:[],
        star:{},
        cent:'',
        value0:5,
        value1: 5,
        value2: 5,
        value3: 5,
        // value4: 5,
        value5: 5,
        store: null,
        value6: 5,
        fen:5,
      }
    },
    computed:{ //计算属性
        itemClasses(){
            console.log("this.fen",this.fen)
              let result = [];
             let score = Math.floor(this.fen * 2 ) / 2;
             let hasDecimal = score % 1 !== 0;
             let integer = Math.floor(score);
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
     },
    watch: {
      'store.orderinfo.saveStore': {
         handler: function() {
            //do something
            console.log(55555)
         },
     }
     
    },
    created() {
      // console.log('22', this.$store.getters.text)
        if(sessionStorage.getItem("ins_id")){
          this.ins_id = sessionStorage.getItem("ins_id")
        }
        if(sessionStorage.getItem("item")){
          this.store = JSON.parse(sessionStorage.getItem("item"));
          console.log('this.store',this.store)


          let star_list=[];
          for(let i=0;i<this.store.orderinfo.saveStore.length;i++){
            let star_save={}
             star_save.goods_id = this.store.orderinfo.saveStore[i].id;
             star_save.star = 5;
             star_list.push(star_save)
          }
          this.store.orderinfo.saveStore = this.store.orderinfo.saveStore.map(item => {
            let obj = item
            obj.value4 = 5
            return obj
          })
          this.star_list = star_list
          console.log('star_list',star_list)
        }
        this.onChange()
        


      
    },
    methods: {
      check(indexs){
        if(indexs==1){
          this.indexs=0
        }else{
          this.indexs=1
        }
        console.log("indexs",indexs)
        
      },
      onChange(){
        this.fen = Number(Number(this.value1+this.value2+this.value3)/3).toFixed(1)
        let self =this;
        // self.itemClasses()
      },
      change(){
        console.log(this.value0)
        this.value0 = this.value0
        this.onChange()
      },
      change1(){
        console.log(this.value1)
        this.value1 = this.value1
        this.onChange()
      },
      change2(){
        console.log(this.value2)
        this.value2 = this.value2
        this.onChange()
      },
      change3(){
        console.log(this.value3)
        this.value3 = this.value3
        this.onChange()
      },
      change4(item){
        console.log(item)
        console.log('this.store.orderinfo.saveStore',this.store.orderinfo.saveStore)
        // let listfor = [];
        // let sf ={}
        // sf.goods_id = item.id;
        // sf.star = item.value4;
        // listfor.push(sf)
        // console.log('listfor',listfor)
        // for(let i=0;i<this.store.orderinfo.saveStore.length;i++){
        //     let star_save={}
        //      star_save.goods_id = this.store.orderinfo.saveStore[i].id;
        //      star_save.star = 5;
        //      star_list.push(star_save)
        //   }
        this.$forceUpdate()
      },
      titleBtn(){
        let token = sessionStorage.getItem("token");
        // this.cent
        let star = {}
        star.s1 = this.value1;
        star.s2 = this.value2;
        star.s3 = this.value3;
        
        this.star = star;
        console.log('this.store.orderinfo.saveStore',this.store.orderinfo.saveStore)

        let star_list = []
        for(let i=0;i<this.store.orderinfo.saveStore.length;i++){
            let star_save={}
             star_save.goods_id = this.store.orderinfo.saveStore[i].id;
             star_save.star = this.store.orderinfo.saveStore[i].value4;
             star_list.push(star_save)
          }
          console.log("this.star_list原来",star_list)

        
        

        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/comment_do",
          params: {
            token:token,
            star:this.star,
            order_id:this.store.id,
            ins_id:this.ins_id,
            is_anonymous:this.indexs,
            content:this.cent,
          }
        }).then(res => {
          console.log('上曾评价',res)
          if(res.data.code == 10001){

          }else{

          }
        })
      
         this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/comment_star",
          params: {
            token:token,
            order_id:this.store.id,
            star_list:JSON.stringify(star_list)
          }
        }).then(res => {
          console.log('星星接口',res)
          if(res.data.code == 10001){
             this.$toast('评价成功')
             let self = this;
             setTimeout(function(){
              self.$router.go(-1)
             },1000)
             

          }else{
            this.$toast(res.msg)
          }
        })

      },





      init(){
        let token = sessionStorage.getItem("token");
        this.$axios({
          method: 'get',
          url: "api/apiv2/foodshop/comment_star_detial",
          params: {
            token:token,
            order_id:this.order_id
          }
        }).then(res => {
          console.log('init',res)
          if(res.data.code == 10001){
              //评分
           
          
            

          }else{

          }
        
        })


      },
     
    },


  }

</script>
<style lang='less' scoped>
    .star-item.on{
         background-image: url(../../assets/imgs/star_select.png);
         width: .4rem;
          height: .4rem;
          background-size: 100% 100%;
     }
     .star-item.half{
         background-image: url(../../assets/imgs/ban_star.png);
         width: .4rem;
          height: .4rem;
          background-size: 100% 100%;
     }
     .star-item.off{
         background-image: url(../../assets/imgs/star.png);
         width: .4rem;
          height: .4rem;
          background-size: 100% 100%;
     }
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
      border-bottom: 1px solid rgba(238,238,238,1);
      textarea{
        width: 100%;
        outline: none;
        height: auto;
        font-size: .26rem;
        border: 0;
        padding-bottom: .6rem;
      }
     }
    .niname{
      width:100%;
      height: .8rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      line-height:.8rem;
      font-size:.28rem;
      color:#333333;
      .store-name-right{
        width: .31rem;
        height: .31rem;
        margin-right:.2rem;
        display:flex;
        img{
          width: .31rem;
          height: .31rem;
        }
      }
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
  .titleBtn{
    width: 4.8rem;
    height: .81rem;
    margin-left: 1.1rem;
    margin-top: .9rem;
    img{
      width: 4.8rem;
    height: .81rem;
    }
  }
</style>
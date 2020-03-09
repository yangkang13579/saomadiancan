<template>
  <div class="remark">
    <div class="write">
      <textarea  v-model="text" placeholder="请备注您的口味喜好：例如不要葱、不要蒜">
      </textarea>

      <div class="btn">
        <img v-show="!isShow" src="../../assets/imgs/nowancheng.png" />
        <img @click="wancheng" v-show="isShow" src="../../assets/imgs/wancheng.png" />
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        text:'',
        isShow:false
      }
    },
    watch: {
      text(newVal, oldVal) {
        console.log('newVal',newVal)
        this.text = newVal
        if(this.text.length!=0){
          this.isShow = true
        }else{
          this.isShow = false
        }
      },
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        this.text = this.$store.getters.text;
        console.log('this.text',this.$store.getters)
      },
      wancheng(){
        this.$store.dispatch('setRemark', this.text);//vuex存储起来
        setTimeout(()=>{
          this.$router.back()
        },500)
      }
      
    },


  }

</script>
<style lang='less' scoped>
  .remark {
    padding: 0 .24rem .5rem .24rem;
    width: 7.02rem;
  }
  .write{
    width:6.62rem;
    height: 2.98rem;
    margin-top: .2rem;
    background: #fff;
    padding: .18rem .2rem;

  }
  textarea{
    width: 100%;
    height: 100%;
    outline: none;
    border: 0;
    font-size: .24rem;
  }
  .btn{
    width: 100%;
    height: .81rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    img{
      width:4.8rem;
      height: .8rem;
    }
  }

</style>
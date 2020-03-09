<template>
  <div v-if="isdraw" class="hot">
       <p>
          Hot
        </p>
        <div>
            <marquee direction="left">{{hot}}</marquee>
        </div>
      
    <!-- {{hot}} -->
  </div>
</template>
<script>
  export default {
    name:'hot',
    data() {
      return{
        hot: '',
        isdraw:false,
      }
    },
    created() {
        this.isdraw = this.$store.getters.isdraw;
        this.hot = this.$store.getters.hot;
        console.log('this.hot1111111111111',this.$store.getters)
    },
    mounted() {
      
    },
    methods: {
      
    },

  }
</script>
<style lang='less' scoped>
  .hot {
    width: 100%;
    height: .6rem;
    background: hsla(359, 100%, 65%, .5);
    white-space: nowrap;
    /*一行显示*/
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /*用...代替超出部分*/
    color: #fff;
    font-size: .26rem;
    text-align: center;
    line-height: .6rem;
    display: flex;
    align-items: center;
  }
  .hot p{
    width: .55rem;
  height: .35rem;
  text-align: center;
  line-height: .35rem;
  font-size: .23rem;
  background: #FF4D4F;
  color: #fff;
  margin-left:.3rem;
  border-radius: .04rem;
  }
  .hot div{
  width: 5.7rem;
  height: .6rem;
  margin-left: .2rem;
  /* margin-right: .4rem; */
  text-align: left;
  line-height: .6rem;
  font-size: .26rem;
  color: #fff;
}


</style>
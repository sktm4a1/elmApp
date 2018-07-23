<template>
  <div id="app">
      <my-header :seller="seller"></my-header>
      <div class="nav">
        <div class="nav-items">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="nav-items">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="nav-items">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
export default {
  name: 'App',
  data() {
    return {
      seller:{}
    }
  },
  created() {
    this.$http.get('/api/seller').then(res => {
            if(res.data.errno == 0){
              this.seller = res.data.data;
            }
    }, res => {
      alert('error!');
    })
  },
  components:{
    myHeader:header
  }
}
</script>

<style>
#app .nav{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
}
.nav-items{
  flex: 1;
}
.router-link-exact-active ,.router-link-active {
  color: #FF000F;
}
</style>

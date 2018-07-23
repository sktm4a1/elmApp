import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../components/goods/goods.vue';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller.vue';

Vue.use(VueRouter);
const routes =[
	{path:'/',redirect:'/goods'},
    {path:'/goods',component:Goods},
    {path:'/ratings',component:ratings},
    {path:'/seller',component:seller}
]
const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes
})

export default router

<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuwrapper">
			<ul>
				<li v-for="(item,i) in goods" class="menu-item" :class="{'current':currentIndex==i}" @click="selectMenu(i,$event)">
					<span class="text">
						<i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodswrapper">
			<ul>
				<li v-for="item in goods" class="foodList">
					<h3 class="foodTitle">{{item.name}}</h3>
					<ul>
						<li v-for="food in item.foods" class="foodItem">
							<div class="foodImg">
								<img :src="food.icon">
							</div>
							<div class="foodContent">
								<h2>{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="nowPrice"><i>￥</i>{{food.price}}</span><span v-show="food.oldPrice" class="oldPrice"><i>￥</i>{{food.oldPrice}}</span>
								</div>
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods"></shopcart>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import shopcart from '../shopcart/shopcart.vue'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'

	export default {
		data() {
			return {
				goods:[],
				classMap:[],
				listHeight:[],
				scrollY:0,
				foodsList:[]
			}
		},
		computed: {
			currentIndex() {
				for(let i=0,len = this.listHeight.length;i<len;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2||(this.scrollY<=height2 && this.scrollY>=height1)){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach( good => {
					good.foods.forEach(food => {
						if (food.count)
							foods.push(food);
					});
				});
				return foods;
			}
		},
		props:['seller'],
		methods:{
			initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuwrapper,{
					click:true
				});
				this.goodsScroll = new BScroll(this.$refs.goodswrapper,{
					//传参：希望scroll在滚动的时候能实时告诉我们滚动的位置（滚动和动画都能探测到）
					//http://ustbhuangyi.github.io/better-scroll/doc/options.html#resizepolling
					probeType:3,
					click:true   
				});
				this.goodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));//滚动时候实时获得y轴距离
				})
			},
			calculateHeight() {
				this.foodsList = this.$refs.goodswrapper.getElementsByClassName('foodList');
				// console.log(foodsList);//foodsList是个伪数组所以不能直接遍历
				//let fl = Array.from(foodsList);
				// console.log(this.foodsList);//[]
				// console.log(this.foodsList.length);//0
				let height = 0; //初始高度为0
				this.listHeight.push(height);
				/*Array.prototype.forEach.call(foodsList,item => {
					height += item.clientHeight;
					this.listHeight.push(height);
				});*/
				for(var i=0;i<this.foodsList.length;i++){
					height+=this.foodsList[i].clientHeight;
					// console.log(height);
					this.listHeight.push(height);
				}
			},
			selectMenu(i,event) {
				// console.log(i+':'+event.target);
				if(!event._constructed){
					return;
				}
				this.foodsList = this.$refs.goodswrapper.getElementsByClassName('foodList');
				let el = this.foodsList[i];
				this.goodsScroll.scrollToElement(el,300);
			}
		},
		created() {
			this.$http.get('/api/goods').then(res => {
				if(res.body.errno == 0){
					this.goods = res.body.data;
					this.$nextTick(() => {
					this.initScroll();
					this.calculateHeight();//千万不能写在mounted里面，获取不到dom
				});
				}
			},res => {
				alert('error:'+res);
			});
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		mounted() {
			
		},
		components:{
			shopcart,
			cartcontrol
		}
	};
</script>
<style>
	.goods {
		position: absolute;
		width: 100%;
		top: 175px;
		bottom: 46px;
		display: flex;
		overflow: hidden;
	}
	.goods .menu-wrapper {
		/*flex等分 缩放 固定占位*/
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu-wrapper .menu-item {
		display: table;
		width: 56px;
		padding: 0 12px;
		height: 54px;
		line-height: 14px;
	}
	.menu-item .icon {
		 display: inline-block;
		 vertical-align: top;
		 width: 12px;
		 height: 12px;
		 margin-right: 2px;
	}
	.decrease {
		background: url('../../../resource/img/decrease_3@2x.png') no-repeat center/cover;
	}
	.discount {
		background: url('../../../resource/img/discount_3@2x.png') no-repeat center/cover;
	}
	.guarantee {
		background: url('../../../resource/img/guarantee_3@2x.png') no-repeat center/cover;
	}
	.invoice {
		background: url('../../../resource/img/invoice_3@2x.png') no-repeat center/cover;
	}
	.special {
		background: url('../../../resource/img/special_3@2x.png') no-repeat center/cover;
	}
	.menu-item .text {
		display: table-cell;
		width: 56px;
		/* color: rgb(240, 20, 20); */
		vertical-align: middle;
		text-align: center;
		font-size: 12px;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	.menu-item:last-child .text {
		border-bottom: none;
	}
	.goods .goods-wrapper {
		flex: 1;
	}
	.goods-wrapper .foodTitle {
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		font-size: 12px;
		border-left: 2px solid #d9dde1;
		color: rgb(147, 153, 159);
		background: #f3f5f7;
	}
	.goods-wrapper .foodItem {
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	.goods-wrapper .foodItem:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}
	.foodItem .foodImg {
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.foodImg img {
		width: 57px;
		height: 57px;
	}
	.foodContent {
		flex: 1;
		position: relative;
	}
	.foodContent h2 {
		font-size: 14px;
		color: rgb(7, 17, 27);
		line-height: 14px;
		margin: 2px 0 8px 0;
	}
	.foodContent .desc {
		margin-bottom: 8px;
		font-size: 12px;
		line-height: 12px;
		color: rgb(147, 153, 159);
	}
	.foodContent .extra {
		font-size: 12px;
		line-height: 12px;
		color: rgb(147, 153, 159);
	}
	.foodContent .extra span {
		margin-right: 12px;
	}
	.foodContent .price {
		font-weight: 700;
		line-height: 24px;
	}
	.price .nowPrice {
		color: rgb(240, 20, 20);
		font-size: 14px;
		margin-right: 8px;
	}
	.price .oldPrice {
		font-size: 12px;
		color: rgb(147, 153, 159);
		text-decoration: line-through;
	}
	.price i {
		font-weight: normal;
		font-style: normal;
		font-size: 12px;
	}
	.cartcontrol {
		position: absolute;
		bottom: -5px;
		right: 0;
		z-index: 5;
	}
	/*滚动menu高亮*/
	.current {
		font-weight: 700;
		background: #fff;
		margin-top: -1px;
		z-index: 2;
	}
	.current .text {
		border: none;
	}
</style>
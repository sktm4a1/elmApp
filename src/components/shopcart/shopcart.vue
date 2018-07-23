<template>
	<div class="shopcart">
		<div class="content">
			<div class="contentLeft">
				<div class="logoWrapper">
					<div class="logo" :class="{'logoHighLight':totalCount>0}">
						<span class="fa fa-shopping-cart" :class="{'fontHighLight':totalCount>0}"></span>
					</div>
					<div class="selectCount" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'priceHighLight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="contentRight" :class="{'descHighLight':totalPrice>=minPrice}">{{priceDesc}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			deliveryPrice:{
				type:Number,
				default() { 
					return 0;
				}
			},
			minPrice:{
				type:Number,
				default() {
					return 0;
				}
			},
			selectFoods:{
				type:Array,
				default() {
					return [];
				}
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach(item => {
					total += item.price * item.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach(item => {
					count += item.count;
				});
				return count;
			},
			priceDesc() {
				if(this.totalPrice===0){
					return `￥${this.minPrice}起送`;
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}起送`;
				}else {
					return '去结算';
				}
			}
		}
	}
</script>
<style>
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 3;
		width: 100%;
		height: 48px;
		/* background: #000; */
	}
	.shopcart .content {
		background: #141d27;
		display: flex;
	}
	.shopcart .content .contentLeft {
		flex: 1;
		font-size: 0;
	}
	.contentLeft .logoWrapper {
		display: inline-block;
		vertical-align: top;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		background: #141d27;
		border-radius: 50%;
	}
	.selectCount {
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 10px;
		font-weight: 700;
		color: #fff;
		background: rgb(240, 20, 20);
		box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
	}
	.logoWrapper .logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		text-align: center;
		background: #2b343c;
	}
	.logoWrapper .logoHighLight {
		background: rgb(0,160,220);
	}
	.logoWrapper .logo .fa-shopping-cart {
		line-height: 44px;
		color: #80858a;
		font-size: 24px;
	}
	.logoWrapper .logo .fontHighLight {
		color: #fff;
	}
	.contentLeft .price {
		display: inline-block;
		vertical-align: top;
		margin-top: 12px;
		line-height: 24px;
		padding-right: 12px;
		box-sizing: border-box;
		border-right: 1px solid rgba(255,255,255,.1);
		font-size: 16px;
		font-weight: 700;
		color: rgba(255, 255, 255, .4);
	}
	.contentLeft .priceHighLight {
		color: #fff;
	}
	.contentLeft .desc {
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		font-size: 12px;
		color: rgba(255, 255, 255, .4);
		margin: 12px 0 0 12px;
	}
	.shopcart .content .contentRight {
		flex: 0 0 105px;
		width: 105px;
		font-size: 12px;
		color: rgba(255, 255, 255, .4);
		font-weight: 700;
		line-height: 48px;
		text-align: center;
	}
	.shopcart .content .descHighLight {
		color: #fff;
		background: #00b43c;
	}
</style>
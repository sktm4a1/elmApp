<template>
	<div class="cartcontrol">
		<transition name="cart">
			<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
				<div class="inner fa fa-minus-circle"></div>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add fa fa-plus-circle" @click="addCart($event)"></div>
	</div>
</template>
<script>
	import Vue from 'vue';

	export default {
		props:{
			food:{
				type:Object
			}
		},
		created() {

		},
		methods:{
			addCart(event) {
				if(!event._constructed){
					return;
				}
				if(!this.food.count)
					Vue.set(this.food,'count',1);
				else
					this.food.count++;
				this.$emit('cart-add',event.target);
			},
			decreaseCart(event) {
				if(!event._constructed)
					return;
				this.food.count--;
			}
		}
	}
</script>
<style>
	.cartcontrol .cart-decrease {
		display: inline-block;
		padding: 6px;
	}
	.cartcontrol .cart-decrease .inner{
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
	.cart-enter,.cart-leave-to {
		opacity: 0;
		transform: translate3d(24px, 0, 0);
	}
	.cart-enter {
		transform: rotate(180deg);
	}
	.cart-enter-active,.cart-leave-active {
		transition: all .4s ease;
	}
	.cartcontrol .cart-count {
		display: inline-block;
		vertical-align: top;
		margin-top: 6px;
		line-height: 24px;
		font-size: 14px;
		color: rgb(147, 153, 159);

	}
	.cartcontrol .cart-add  {
		display: inline-block;
		padding: 6px;
		font-size: 24px;
		color: rgb(0,160,220);
		line-height: 24px;
	}
</style>
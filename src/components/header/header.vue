<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="supports-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<span class="font"> > </span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-arrow-right"> &gt; </i>
		</div>
		<div class="bg-image">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition>
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="detail-title">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="discount-title">
							<div class="line"></div>
							<div class="discount-text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supportsAll" v-if="seller.supports">
							<li class="supports-item" v-for="(item,i) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[i].type]"></span>
								<span class="text">{{seller.supports[i].description}}</span>
							</li>
						</ul>
						<div class="discount-title">
							<div class="line"></div>
							<div class="discount-text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletinContent">
							<p class="bulletinText">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="detailShow=false">
					<span class="detail-close-icon">×</span>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import star from '../stars/star';
	export default {
		data() {
			return {
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow = true;
			}
		},
		props:['seller'],
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		components:{
			star
		}
	}
</script>
<style>
	.header {
		background-color: rgba(7, 17, 27, .3);
		color: #fff;
		font-family: Microsoft Yahei;
		overflow: hidden;
		position: relative;
	}
	.header .content-wrapper {
		padding: 24px 12px 18px 24px;
		font-size: 0;
		position: relative;
	}
	.avatar {
		vertical-align: top;
	}
	.avatar img {
		border-radius: 2px;
	}
	.content-wrapper .avatar,.content-wrapper .content {
		display: inline-block;
	}
	.content-wrapper .content {
		margin-left: 16px;
		font-size: 14px;
	}
	.title {
		padding: 2px 0 8px 0;
	}
	.title .brand {
		display: inline-block;
		width: 30px;
		height: 18px;
		background: url('../../../resource/img/brand@2x.png') no-repeat center/cover;
		vertical-align: top;
	}
	.title .name {
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	.description {
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
		margin-bottom: 10px;
	}
	.supports .icon {
		 display: inline-block;
		 padding: 0 4px 2px 0;
		 width: 12px;
		 height: 12px;
		 vertical-align: top;
	}
	.decrease {
		background: url('../../../resource/img/decrease_1@2x.png') no-repeat center/cover;
	}
	.discount {
		background: url('../../../resource/img/discount_1@2x.png') no-repeat center/cover;
	}
	.guarantee {
		background: url('../../../resource/img/guarantee_1@2x.png') no-repeat center/cover;
	}
	.invoice {
		background: url('../../../resource/img/invoice_1@2x.png') no-repeat center/cover;
	}
	.special {
		background: url('../../../resource/img/special_1@2x.png') no-repeat center/cover;
	}
	.text {
		font-weight: 200;
		font-size: 12px;
		line-height: 12px;
	}
	.supports-count {
		background: rgba(0, 0, 0, .2);
		font-size: 10px;
		font-weight: 200;
		position: absolute;
		right: 12px;
		bottom: 15px;
		padding: 0 8px;
		border-radius: 14px;
		height: 24px;
		line-height: 24px;
		text-align: center;
	}
	.count {
		padding-right: 2px;
	}
	.bulletin-wrapper {
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		background-color: rgba(7, 17, 27, .2);
	}
	.bulletin-title {
		display: inline-block;
		margin-top: 8px;
		vertical-align: top;
		width: 22px;
		height: 12px;
		background: url('../../../resource/img/bulletin@2x.png') no-repeat center/cover;
	}
	.bulletin-text {
		font-size: 10px;
		font-weight: 200;
		vertical-align: top;
	}
	.icon-arrow-right {
		position: absolute;
		right: 10px;
		top: 0px;
		font-style: normal;
	}
	.bg-image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		filter: blur(10px);
	}
	.detail {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
		top: 0;
		left: 0;
		background: rgba(7, 17, 27, .8);
	}
	.clearfix::after {
		display: block;
		content: "";
		clear: both;
	}
	.detail-wrapper {
		min-height: 100%;
		width: 100%;
	}
	.detail-main {
		margin-top: 64px;
		padding-bottom: 64px;
	}
	.detail-title {
		text-align: center;
		line-height: 16px;
		font-size: 16px;
		font-weight: 700;
	}
	.detail-close {
		position: relative;
		text-align: center;
		font-size: 32px;
		color: rgba(255,255,255,.5);
		width: 32px;
		height: 32px;
		margin: -128px auto 0 auto;
		clear: both;
	}
	/*星星组件样式*/
	.star-wrapper {
		text-align: center;
		margin-top: 16px;
		padding: 2px 0;
	}
	/*优惠信息*/
	.discount-title {
		width: 80%;
		display: flex;
		margin: 28px auto 24px auto;
	}
	.discount-title .line {
		flex: 1;
		position: relative;
		top: 7px;
		height: 1px;
		background: rgba(255, 255, 255, .2);
	}
	.discount-text {
		margin: 0 12px;
		font-size: 14px;
		font-weight: 700;
	}
	/*全部优惠*/
	.supportsAll {
		width: 80%;
		margin: 0 auto;
	}
	.supportsAll .supports-item {
		padding: 0 12px;
		margin-bottom: 12px;
	}
	.supportsAll .supports-item:last-child {
		margin-bottom: 0;
	}
	.supportsAll .supports-item .icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		margin-right: 6px;
		/* background-size: 16px 16px;
		background-repeat: no-repeat; */
	}
	.supportsAll .decrease {
		background: url('../../../resource/img/decrease_2@2x.png') no-repeat center/cover;
	}
	.supportsAll .discount {
		background: url('../../../resource/img/discount_2@2x.png') no-repeat center/cover;
	}
	.supportsAll .guarantee {
		background: url('../../../resource/img/guarantee_2@2x.png') no-repeat center/cover;
	}
	.supportsAll .invoice {
		background: url('../../../resource/img/invoice_2@2x.png') no-repeat center/cover;
	}
	.supportsAll .special {
		background: url('../../../resource/img/special_2@2x.png') no-repeat center/cover;
	}
	.supportsAll .supports-item .text {
		line-height: 16px;
		vertical-align: top;
	}
	.bulletinContent {
		width: 80%;
		margin: 0 auto;
	}
	.bulletinContent .bulletinText {
		padding: 0 12px;
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
	}
	/*过渡动画*/
	.v-enter,
	.v-leave-to{
		opacity: 0;
		background: rgba(7, 17, 27, 0);
	}
	.v-enter-active,
	.v-leave-active{
		transition: all .5s ease;
	}
</style>
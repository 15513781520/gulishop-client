<template>
	<!--banner轮播-->
	<div class="swiper-container" :ref="bannerRef">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="banner in bannerList"
				:key="banner.id"
			>
				<img :src="banner.imgUrl" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
	//引入 swiper 的js
	import Swiper from "swiper";

	export default {
		name: "Banner",
		props: ["bannerList","bannerRef"],
		watch: {
			//监视 bannerList 的改变，当它发生改变时去 new Swiper
			bannerList: {
                immediate:true, //添加这个配置是为了照顾到 floor 组件，因为他的数据不会发生改变
				handler() {
					//$nextTick 方法是组价实例身上的一个方法，该方法会在最近的一个页面更新完成是调用传入的回调函数
					//我们可以利用 $nextTick 方法的这一特点 让 new Swiper 在合适的时刻执行
					this.$nextTick(function () {
						new Swiper(this.$refs[this.bannerRef], {
							loop: true, // 循环模式选项
							//是否开启自动轮播
							autoplay: {
								delay: 2000, //自动轮播的停留时间
							},
							// 如果需要分页器
							pagination: {
								el: ".swiper-pagination",
							},

							// 如果需要前进后退按钮
							navigation: {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							},
						});
					});
				},
			},
		},
	};
</script>

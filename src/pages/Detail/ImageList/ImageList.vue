<template>
	<div class="swiper-container" ref="skuImgList">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="(img, index) in skuImageList"
				:key="img.id"
			>
				<img
					:class="{ active: defaultIndex === index }"
					:src="img.imgUrl"
					@click="changeIndex(index)"
				/>
			</div>
		</div>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script>
	import Swiper from "swiper";
	export default {
		name: "ImageList",
		props: ["skuImageList"],
		data() {
			return {
				defaultIndex: 0,
			};
		},
		methods: {
			//点击缩略图切换高亮的事件回调
			changeIndex(index) {
				//参考值思想
				this.defaultIndex = index;
				this.$bus.$emit("changeIndex", index);
			},
		},
		watch: {
			//监视 bannerList 的改变，当它发生改变时去 new Swiper
			skuImageList: {
				immediate: true, //添加这个配置是为了照顾到 floor 组件，因为他的数据不会发生改变
				handler() {
					//$nextTick 方法是组价实例身上的一个方法，该方法会在最近的一个页面更新完成是调用传入的回调函数
					//我们可以利用 $nextTick 方法的这一特点 让 new Swiper 在合适的时刻执行
					this.$nextTick(function () {
						new Swiper(this.$refs.skuImgList, {
							//每组图片的数量
							slidesPerView: 3,
							//每次切换的张数
							slidesPerGroup: 2,
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

<style lang="less" scoped>
	.swiper-container {
		height: 56px;
		width: 412px;
		box-sizing: border-box;
		padding: 0 12px;

		.swiper-slide {
			width: 56px;
			height: 56px;

			img {
				width: 100%;
				height: 100%;
				border: 1px solid #ccc;
				padding: 2px;
				width: 50px;
				height: 50px;
				display: block;

				&.active {
					border: 2px solid #f60;
					padding: 1px;
				}
			}
		}

		.swiper-button-next {
			left: auto;
			right: 0;
		}

		.swiper-button-prev {
			left: 0;
			right: auto;
		}

		.swiper-button-next,
		.swiper-button-prev {
			box-sizing: border-box;
			width: 12px;
			height: 56px;
			background: rgb(235, 235, 235);
			border: 1px solid rgb(204, 204, 204);
			top: 0;
			margin-top: 0;
			&::after {
				font-size: 12px;
			}
		}
	}
</style>
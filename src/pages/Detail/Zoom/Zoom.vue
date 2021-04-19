<template>
	<div class="spec-preview">
		<img :src="imgInfo.imgUrl" />
		<div class="event" @mousemove="move"></div>
		<div class="big">
			<img :src="imgInfo.imgUrl" ref="bigImg"/>
		</div>
		<div class="mask" ref="mask"></div>
	</div>
</template>

<script>
	export default {
		name: "Zoom",
		props: ["skuImageList"],
		data() {
			return {
				defaultIndex: 0,
			};
		},
		computed: {
			//当前显示的图片信息对象
			imgInfo() {
				//防止图片列表是undefined，点 . 当前图片信息对象 的时候回家报错，做空对象的修正
				return this.skuImageList[this.defaultIndex] || {};
			},
		},
		methods: {
			//鼠标在图片上移动的事件
			move(event) {
				// 从 $refs 对象中解构 mask元素 、 bigImg 元素
				const {mask,bigImg} = this.$refs
				//声明一个变量来保存一会要设置给 mask 的水平偏移量
				let maskX = event.offsetX - mask.offsetWidth / 2
				//声明一个变量来保存一会要设置给 mask 的垂直偏移量
				let maskY = event.offsetY - mask.offsetHeight / 2

				//边界限定，小于最小值等于最小值，大于最大值等于最大值
				if(maskX < 0){
					maskX = 0
				}else if(maskX > mask.clientWidth){
					maskX = mask.clientWidth
				}
				if(maskY < 0){
					maskY = 0
				}else if(maskY > mask.clientHeight){
					maskY = mask.clientHeight
				}

				//修改 mask 的水平 和 垂直偏移量
				mask.style.left = maskX + 'px'
				mask.style.top = maskY + 'px'

				//修改大图的偏移量,大图应该向蒙版的反方向移动蒙版的两倍距离
				bigImg.style.left = maskX * -2 + 'px'
				bigImg.style.top = maskY * -2 + 'px'
			},
		},
		mounted() {
			//在全局事件总线上绑定事件，事件触发时，将 data 中的 索引 修改为传递来的索引，实现图片切换
			this.$bus.$on("changeIndex", (index) => (this.defaultIndex = index));
		},
	};
</script>

<style lang="less">
	.spec-preview {
		position: relative;
		width: 400px;
		height: 400px;
		border: 1px solid #ccc;

		img {
			width: 100%;
			height: 100%;
		}

		.event {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 998;
		}

		.mask {
			width: 50%;
			height: 50%;
			background-color: rgba(0, 255, 0, 0.3);
			position: absolute;
			left: 0;
			top: 0;
			display: none;
		}

		.big {
			width: 100%;
			height: 100%;
			position: absolute;
			top: -1px;
			left: 100%;
			border: 1px solid #aaa;
			overflow: hidden;
			z-index: 998;
			display: none;
			background: white;

			img {
				width: 200%;
				max-width: 200%;
				height: 200%;
				position: absolute;
				left: 0;
				top: 0;
			}
		}

		.event:hover ~ .mask,
		.event:hover ~ .big {
			display: block;
		}
	}
</style>
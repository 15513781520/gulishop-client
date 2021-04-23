<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div
				class="cart-body"
				v-for="(shopCart, index) in shopCartList"
				:key="index"
			>
				<ul
					class="cart-list"
					v-for="cartInfo in shopCart.cartInfoList"
					:key="cartInfo.id"
				>
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							:checked="cartInfo.isChecked"
							@change="changeOneCheck(cartInfo)"
						/>
					</li>
					<li class="cart-list-con2">
						<img :src="cartInfo.imgUrl" />
						<div class="item-msg">
							{{ cartInfo.skuName }}
						</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{ cartInfo.skuPrice.toFixed(2) }}</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:;" class="mins" @click="changeSkuNum(cartInfo,-1)">-</a>
						<input
							autocomplete="off"
							type="text"
							:value="cartInfo.skuNum"
							minnum="1"
							class="itxt"
							@change="changeSkuNum(cartInfo,$event.target.value*1 - cartInfo.skuNum)"
						/>
						<a href="javascript:;" class="plus" @click="changeSkuNum(cartInfo,1)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{
							(cartInfo.skuPrice * cartInfo.skuNum).toFixed(2)
						}}</span>
					</li>
					<li class="cart-list-con7">
						<a href="javascript:;" class="sindelet" @click="deleteOneSku(cartInfo)">删除</a>
						<br />
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" v-model="ischeckAll" />
				<span>全选</span>
			</div>
			<div class="option">
				<a href="#javascript:;" @click="deleteMoreSku">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">
					已选择
					<span style="color: #e1251b; font-size: 16px">
						{{ totalNum }} </span
					>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice.toFixed(2) }}</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" to="/trade">结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "ShopCart",
		computed: {
			//将 vuex 中的数据映射到组件
			...mapState({
				shopCartList: (state) => state.shopcart.shopCartList,
			}),
			//计算已选择的商品总数
			totalNum() {
				return this.shopCartList.reduce((preVal, item) => {
					return (
						preVal +
						item.cartInfoList.reduce((preValue, current) => {
							return (
								preValue + (current.isChecked ? current.skuNum : 0)
							);
						}, 0)
					);
				}, 0);
			},
			//计算已选择的商品总价
			totalPrice() {
				return this.shopCartList.reduce((preVal, item) => {
					return (
						preVal +
						item.cartInfoList.reduce((preValue, current) => {
							return (
								preValue +
								(current.isChecked
									? current.skuNum * current.skuPrice
									: 0)
							);
						}, 0)
					);
				}, 0);
			},
			//读取 / 修改 全选全不选复选框的计算属性
			ischeckAll: {
				//计算 全选全不选复选框 的 checked 属性值
				get() {
					return this.shopCartList.every((item) =>
						item.cartInfoList.every((current) => current.isChecked)
					);
				},
				//发送请求修改 全选全不选复选框的 状态,其实就是将每一个商品的状态和全选全不选复选框的状态同步
				async set(value){
					let isChecked = value ? 1 : 0
					//将 checked 值和修改后的值不一样的值的商品 id 收集到一个数组中
					let skuIds = []
					this.shopCartList.forEach((item) => {
						item.cartInfoList.forEach((current) => {
							if(current.isChecked !== isChecked) skuIds.push(current.skuId)
						})
					})
					try {
						await this.$store.dispatch('changeMoreCheck',{isChecked,skuIds})
						alert('批量修改商品选中状态成功')
						this.getShopCartList()
					} catch (error) {
						alert('批量修改商品选中状态失败')
						this.getShopCartList()
					}
				}
			},
		},
		methods: {
			getShopCartList() {
				this.$store.dispatch("getShopCartList");
			},
			//当用户想要修改商品数量时的事件回调
			//接受两个参数，被修改的商品对象，修改前和修改后的变化量
			async changeSkuNum(cartInfo,disNum){
				//判断修改后的值是否合法，如果不合法将 修改后的值 修正为1，由于我们给服务器传递的是变化量
				//所以想要将 修改后的值 修正为1，就需要将 变动量修改为 1 - 修改前的量
				//修改后的值 = 修改前的值 + 变动量
				//如果需要修正，变动量 + 修改前的值 = 1
				//修正后的变动量 = 1 - 修改前的值
				if(disNum + cartInfo.skuNum < 1 || isNaN(disNum)){
					disNum = 1- cartInfo.skuNum
				}
				try {
					await this.$store.dispatch('addOrUpdateShopCart',{skuId:cartInfo.skuId,skuNum:disNum})
					alert(cartInfo.skuName + ' -- 数量修改成功')
					this.getShopCartList()
				} catch (error) {
					alert(cartInfo.skuName + ' -- 数量修改失败')
				}
			},
			//单个商品点击复选框修改选中状态的事件回调
			async changeOneCheck(cartInfo){
				let isChecked = cartInfo.isChecked ? 0 : 1
				try {
					await this.$store.dispatch('changeOneCheck',{skuId:cartInfo.skuId,isChecked})
					alert('修改' + cartInfo.skuName + '选中状态成功')
					this.getShopCartList()
				} catch (error) {
					alert('修改' + cartInfo.skuName + '选中状态失败')
				}
			},
			//删除单个商品的事件回调
			async deleteOneSku(cartInfo){
				try {
					await this.$store.dispatch('deleteOneSku',cartInfo.skuId)
					alert(cartInfo.skuName + '删除成功')
					this.getShopCartList()
				} catch (error) {
					alert(cartInfo.skuName + '删除失败')
				}
			},
			//删除已选中商品的事件回调
			async deleteMoreSku(){
				//声明一个数组用来保存 要被删除的商品id
				let skuIds = []
				//遍历数组将选中状态的商品的id添加到数组中
				this.shopCartList.forEach(item => {
					item.cartInfoList.forEach(current => {
						if(current.isChecked) skuIds.push(current.skuId)
					})
				})
				try {
					//发送请求删除商品
					await this.$store.dispatch('deleteMoreSku',skuIds)
					alert('删除已选中商品成功')
					this.getShopCartList()
				} catch (error) {
					lert('删除已选中商品失败')
				}
			}
		},
		mounted() {
			this.getShopCartList();
		},
	};
</script>

<style lang="less" scoped>
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				& > div {
					float: left;
				}

				.cart-th1 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th2 {
					width: 25%;
				}

				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6 {
					width: 12.5%;
				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					& > li {
						float: left;
					}

					.cart-list-con1 {
						width: 15%;
					}

					.cart-list-con2 {
						width: 35%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}

					.cart-list-con3 {
						width: 20.8333%;

						.item-txt {
							text-align: center;
						}
					}

					.cart-list-con4 {
						width: 10%;
					}

					.cart-list-con5 {
						width: 17%;

						.mins {
							border: 1px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}
					}

					.cart-list-con6 {
						width: 10%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 13%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: "Microsoft YaHei";
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
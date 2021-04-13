<!--
 * @Author: your name
 * @Date: 2021-04-12 10:31:50
 * @LastEditTime: 2021-04-12 18:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\components\TypeNav\index.vue
-->
<template>
	<!-- 商品分类导航 -->
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="moveLeave" @mouseenter="isShow = true">
				<h2 class="all">全部商品分类</h2>
				<transition name="sort">
					<div class="sort" v-show="isShow">
						<div class="all-sort-list2" @click="toSearch">
							<div
								class="item"
								:class="{ current: currentIndex === index }"
								v-for="(c1, index) in categoryList"
								:key="c1.categoryId"
								@mouseenter="moveInItem(index)"
							>
								<h3>
									<a
										href="javascript:;"
										:data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId"
										>{{ c1.categoryName }}</a
									>
								</h3>
								<div class="item-list clearfix">
									<div class="subitem">
										<dl
											class="fore"
											v-for="c2 in c1.categoryChild"
											:key="c2.categoryId"
										>
											<dt>
												<a
													href="javascript:;"
													:data-categoryName="
														c2.categoryName
													"
													:data-category2Id="
														c2.categoryId
													"
													>{{ c2.categoryName }}</a
												>
											</dt>
											<dd>
												<em
													v-for="c3 in c2.categoryChild"
													:key="c3.categoryId"
												>
													<a
														href="javascript:;"
														:data-categoryName="
															c3.categoryName
														"
														:data-category3Id="
															c3.categoryId
														"
														>{{
															c3.categoryName
														}}</a
													>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import throttle from "lodash/throttle";

	export default {
		name: "TypeNav",
		data() {
			return {
				currentIndex: -1, //用来控制二三级分类列表的显示与隐藏
				isShow: true, //用来控制 整个分类列表 的显示与隐藏
			};
		},
		computed: {
			...mapState({
				categoryList: (state) => state.home.categoryList,
			}),
		},
		methods: {
			//使用函数节流来控制 一级分类 的移入事件
			moveInItem: throttle(
				function (index) {
					this.currentIndex = index;
				},
				20, //设置间隔时间
				{ trailing: false } // trailing 属性设置是否在倒计时结束再执行函数
			),
			//事件委托的回调
			toSearch(event) {
				//如果元素的属性中有以 data- 开头的属性则会将其以 data- 开头的属性和属性值都收集到 dataset 这个对象中
				const {
					categoryname,
					category1id,
					category2id,
					category3id,
				} = event.target.dataset;
				//如果 categoryname 有值则表示触发事件的是 a 标签
				if (categoryname) {
					const loaction = {
						name: "search",
					};

					const query = {
						categoryName: categoryname,
					};
					//如果 category1id 有值证明是一级分类触发的时间
					if (category1id) {
						query.category1Id = category1id;
					} else if (category2id) {
						query.category2Id = category2id;
					} else {
						query.category3Id = category3id;
					}
					//将确定后的query对象赋值给location的query属性
					loaction.query = query;
					//判断当前 路有对象 中是否有 params 参数，如果有则把 query 参数添加到这次 push 中
					loaction.params = this.$route.params
					//调用 push 切换路由
					this.$router.push(loaction);
				}
			},
			//鼠标移出 div 事件回调
			moveLeave() {
				//将 currentIndex 修改为 -1，让所有的 二三级分类隐藏
				this.currentIndex = -1;
				//判断当前路径是否为 /search，如果是 就将 isShow 变为 false 让列表隐藏
				if (this.$route.path !== "/home") {
					this.isShow = false;
				}
			},
		},
		mounted() {
			//判断当前路径是否为 /search，如果是 就将 isShow 变为 false 让列表隐藏
			if (this.$route.path !== "/home") {
				this.isShow = false;
			}
		},
	};
</script>

<style lang="less" scoped>
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				&.sort-enter {
					opacity: 0;
					height: 0;
				}

				&.sort-enter-to {
					opacity: 1;
					height: 461px;
					overflow: hidden;
				}
				&.sort-enter-active {
					transition: all 0.5s;
				}

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 650px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}

						&.current {
							background-color: #ddd;
							.item-list {
								display: block;
							}
							> h3 > a {
								color: #e1251b;
							}
						}
					}
				}
			}
		}
	}
</style>

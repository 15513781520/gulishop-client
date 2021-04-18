<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--bread-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x" v-show="searchParams.categoryName">
							{{ searchParams.categoryName
							}}<i @click="removeCategoryName">×</i>
						</li>
						<li class="with-x" v-show="searchParams.keyword">
							{{ searchParams.keyword
							}}<i @click="removeKeyword">×</i>
						</li>
						<li class="with-x" v-if="searchParams.trademark">
							{{ searchParams.trademark.split(":")[1]
							}}<i @click="removeTrademark">×</i>
						</li>
						<li
							class="with-x"
							v-for="(prop, index) in searchParams.props"
							:key="prop"
						>
							{{ prop.split(":")[1]
							}}<i @click="removeProp(index)">×</i>
						</li>
					</ul>
				</div>

				<!--selector-->
				<!-- 为子组件绑定自定义事件 -->
				<SearchSelector
					@searchForTrademark="searchForTrademark"
					@searchForProp="searchForProp"
				/>

				<!--details-->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<li :class="{ active: sortRule === '1' }">
									<a href="javascript:;"
										@click="changeSort('1')"
										>综合<i
											class="iconfont"
											:class="
												sortType === 'asc'
													? 'iconup-arrow'
													: 'icondown-arrow'
											"
											v-if="sortRule === '1'"
										></i
									></a>
								</li>
								<li :class="{ active: sortRule === '2' }">
									<a href="javascript:;"
										@click="changeSort('2')"
										>价格<i
											class="iconfont"
											:class="
												sortType === 'asc'
													? 'iconup-arrow'
													: 'icondown-arrow'
											"
											v-if="sortRule === '2'"
										></i
									></a>
								</li>
							</ul>
						</div>
					</div>
					<div class="goods-list">
						<ul class="yui3-g">
							<li
								class="yui3-u-1-5"
								v-for="goods in goodsList"
								:key="goods.id"
							>
								<div class="list-wrap">
									<div class="p-img">
										<router-link :to="'/detail/' + goods.id"
											><img :src="goods.defaultImg"
										/></router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{ goods.price }}</i>
										</strong>
									</div>
									<div class="attr">
										<a
											:to="'/detail/' + goods.id"
											:title="goods.title"
											>{{ goods.title }}</a
										>
									</div>
									<div class="commit">
										<i class="command"
											>已有<span>2000</span>人评价</i
										>
									</div>
									<div class="operate">
										<a
											href="success-cart.html"
											target="_blank"
											class="sui-btn btn-bordered btn-danger"
											>加入购物车</a
										>
										<a
											href="javascript:void(0);"
											class="sui-btn btn-bordered"
											>收藏</a
										>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- 分页组件
							需要四个参数：
								1.当前页码
								2.总条数
								3.每页条数
								4.连续数
					 -->
					<Pagination
						:currentPage="searchParams.pageNo"
						:total="total"
						:pageSize="searchParams.pageSize"
						:cpntinueNum="5"
						@changePage="changePage"
					></Pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	import SearchSelector from "./SearchSelector/SearchSelector";
	export default {
		name: "Search",
		components: {
			SearchSelector,
		},
		data() {
			return {
				//初始化搜索参数
				searchParams: {
					category1Id: "",
					category2Id: "",
					category3Id: "",
					categoryName: "",
					keyword: "",
					trademark: "",
					props: [],
					order: "1:desc",
					pageNo: 1,
					pageSize: 5,
				},
			};
		},
		computed: {
			//将 store 中的 getters 映射当 组件中
			...mapGetters(["goodsList"]),
			...mapState({
				total:state => state.search.goodsListInfo.total
			}),
			sortRule() {
				return this.searchParams.order.split(":")[0];
			},
			sortType() {
				return this.searchParams.order.split(":")[1];
			},
		},
		watch: {
			//监视路由对象，当路径发生变化时路由对象也会变化，当路由对象变化时重新解析路由参数，重新发请求
			$route: {
				handler() {
					this.parseSearchParams();
					this.getGoodsAndUpdatePage();
				},
			},
		},
		methods: {
			//调用 dispatch 发送请求获取数据 的方法
			getGoodsListInfo() {
				this.$store.dispatch("getGoodsListInfo", this.searchParams);
			},
			//当用户搜索条件发生变化时将当前页码更新为 1 ，然后发送请求获取最新数据
			getGoodsAndUpdatePage(){
				this.searchParams.pageNo = 1
				this.getGoodsListInfo()
			},
			//用来解析搜索参数的方法
			parseSearchParams() {
				//从路由对象的 params 、query 对象中解构 搜索参数
				const { keyword } = this.$route.params;
				const {
					categoryName,
					category1Id,
					category2Id,
					category3Id,
				} = this.$route.query;

				//声明一个新对象保存搜索参数
				let searchParams = {
					...this.searchParams,
					keyword,
					categoryName,
					category1Id,
					category2Id,
					category3Id,
				};
				//forEach遍历对象，如果否个属性是空串就赋值为 undefined
				Object.keys(searchParams).forEach((key) => {
					if (searchParams[key] === "") {
						delete searchParams[key];
					}
				});
				//将这个对象在赋值给 this.searchParams
				this.searchParams = searchParams;
			},
			//删除三级分类名称面包屑事件回调
			removeCategoryName() {
				this.$router.replace({
					name: "search",
					params: this.$route.params,
				});
			},
			//删除关键字面包屑事件回调
			removeKeyword() {
				this.$router.replace({
					name: "search",
					query: this.$route.query,
				});
				this.$bus.$emit("clearKeyword");
			},
			//自定义事件，根据品牌搜索商品事件回调
			searchForTrademark(tm) {
				//修改 搜索参数 中的 trademark 字段
				this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`;
				//重新发送请求
				this.getGoodsAndUpdatePage();
			},
			//删除品牌面包屑事件回调
			removeTrademark() {
				this.searchParams.trademark = undefined;
				this.getGoodsAndUpdatePage();
			},
			//自定义事件，根据商品属性搜索商品事件回调
			searchForProp(attrValue, attr) {
				//["属性ID:属性值:属性名"]  示例: ["2:6.0～6.24英寸:屏幕尺寸"]
				const prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
				//调用 some 方法查找 props 属性中是否已存在要搜索的属性
				const isRepeat = this.searchParams.props.some((item) => {
					return item === prop;
				});
				//判断 some 方法查找结果
				//如果重复，终止函数调用
				if (isRepeat) {
					return;
				}
				//如果不重复，修改搜索参数
				this.searchParams.props.push(prop);
				//发送请求搜索商品
				this.getGoodsAndUpdatePage();
			},
			//删除属性面包屑事件回调
			removeProp(index) {
				this.searchParams.props.splice(index, 1);
				this.getGoodsAndUpdatePage();
			},
			// 排序按钮点击事件回调
			changeSort(rule){
				let newOrder = ''
				//如果用户点击是当前的排序规则，则切换升序降序
				if(rule === this.sortRule){
					newOrder = `${rule}:${this.sortType === 'asc' ? 'desc' : 'asc'}`
				}else{  //如果用户点击的是新的排序规则，则将规则切换成用户点击的，并将排序类型切换成默认的降序
					newOrder = `${rule}:desc`
				}
				//修改搜索参数
				this.searchParams.order = newOrder
				//重新发送请求
				this.getGoodsAndUpdatePage()
			},
			changePage(page){
				if(this.searchParams.pageNo === page){
					return
				}
				this.searchParams.pageNo = page
				this.getGoodsListInfo()
			}
		},
		//在这个钩子中解析路由参数并修改搜索参数里的数据，方便 mounted 中发送请求获取数据
		beforeMount() {
			this.parseSearchParams();
		},
		//组件一挂载就调用方法发送请求
		mounted() {
			this.getGoodsListInfo();
		},
	};
</script>

<style lang="less" scoped>
	.main {
		margin: 10px 0;

		.py-container {
			width: 1200px;
			margin: 0 auto;

			.bread {
				margin-bottom: 5px;
				overflow: hidden;

				.sui-breadcrumb {
					padding: 3px 15px;
					margin: 0;
					font-weight: 400;
					border-radius: 3px;
					float: left;

					li {
						display: inline-block;
						line-height: 18px;

						a {
							color: #666;
							text-decoration: none;

							&:hover {
								color: #4cb9fc;
							}
						}
					}
				}

				.sui-tag {
					margin-top: -5px;
					list-style: none;
					font-size: 0;
					line-height: 0;
					padding: 5px 0 0;
					margin-bottom: 18px;
					float: left;

					.with-x {
						font-size: 12px;
						margin: 0 5px 5px 0;
						display: inline-block;
						overflow: hidden;
						color: #000;
						background: #f7f7f7;
						padding: 0 7px;
						height: 20px;
						line-height: 20px;
						border: 1px solid #dedede;
						white-space: nowrap;
						transition: color 400ms;
						cursor: pointer;

						i {
							margin-left: 10px;
							cursor: pointer;
							font: 400 14px tahoma;
							display: inline-block;
							height: 100%;
							vertical-align: middle;
						}

						&:hover {
							color: #28a3ef;
						}
					}
				}
			}

			.details {
				margin-bottom: 5px;

				.sui-navbar {
					overflow: visible;
					margin-bottom: 0;

					.filter {
						min-height: 40px;
						padding-right: 20px;
						background: #fbfbfb;
						border: 1px solid #e2e2e2;
						padding-left: 0;
						border-radius: 0;
						box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

						.sui-nav {
							position: relative;
							left: 0;
							display: block;
							float: left;
							margin: 0 10px 0 0;

							li {
								float: left;
								line-height: 18px;

								a {
									display: block;
									cursor: pointer;
									padding: 11px 15px;
									color: #777;
									text-decoration: none;
								}

								&.active {
									a {
										background: #e1251b;
										color: #fff;
									}
								}
							}
						}
					}
				}

				.goods-list {
					margin: 20px 0;

					ul {
						display: flex;
						flex-wrap: wrap;

						li {
							height: 100%;
							width: 20%;
							margin-top: 10px;
							line-height: 28px;

							.list-wrap {
								.p-img {
									padding-left: 15px;
									width: 215px;
									height: 255px;

									a {
										color: #666;

										img {
											max-width: 100%;
											height: auto;
											vertical-align: middle;
										}
									}
								}

								.price {
									padding-left: 15px;
									font-size: 18px;
									color: #c81623;

									strong {
										font-weight: 700;

										i {
											margin-left: 5px;
										}
									}
								}

								.attr {
									padding-left: 15px;
									width: 85%;
									overflow: hidden;
									margin-bottom: 8px;
									min-height: 38px;
									cursor: pointer;
									line-height: 1.8;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;

									a {
										color: #333;
										text-decoration: none;
									}
								}

								.commit {
									padding-left: 15px;
									height: 22px;
									font-size: 13px;
									color: #a7a7a7;

									span {
										font-weight: 700;
										color: #646fb0;
									}
								}

								.operate {
									padding: 12px 15px;

									.sui-btn {
										display: inline-block;
										padding: 2px 14px;
										box-sizing: border-box;
										margin-bottom: 0;
										font-size: 12px;
										line-height: 18px;
										text-align: center;
										vertical-align: middle;
										cursor: pointer;
										border-radius: 0;
										background-color: transparent;
										margin-right: 15px;
									}

									.btn-bordered {
										min-width: 85px;
										background-color: transparent;
										border: 1px solid #8c8c8c;
										color: #8c8c8c;

										&:hover {
											border: 1px solid #666;
											color: #fff !important;
											background-color: #666;
											text-decoration: none;
										}
									}

									.btn-danger {
										border: 1px solid #e1251b;
										color: #e1251b;

										&:hover {
											border: 1px solid #e1251b;
											background-color: #e1251b;
											color: white !important;
											text-decoration: none;
										}
									}
								}
							}
						}
					}
				}

				.page {
					width: 733px;
					height: 66px;
					overflow: hidden;
					float: right;

					.sui-pagination {
						margin: 18px 0;

						ul {
							margin-left: 0;
							margin-bottom: 0;
							vertical-align: middle;
							width: 490px;
							float: left;

							li {
								line-height: 18px;
								display: inline-block;

								a {
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									border: 1px solid #e0e9ee;
									margin-left: -1px;
									font-size: 14px;
									padding: 9px 18px;
									color: #333;
								}

								&.active {
									a {
										background-color: #fff;
										color: #e1251b;
										border-color: #fff;
										cursor: default;
									}
								}

								&.prev {
									a {
										background-color: #fafafa;
									}
								}

								&.disabled {
									a {
										color: #999;
										cursor: default;
									}
								}

								&.dotted {
									span {
										margin-left: -1px;
										position: relative;
										float: left;
										line-height: 18px;
										text-decoration: none;
										background-color: #fff;
										font-size: 14px;
										border: 0;
										padding: 9px 18px;
										color: #333;
									}
								}

								&.next {
									a {
										background-color: #fafafa;
									}
								}
							}
						}

						div {
							color: #333;
							font-size: 14px;
							float: right;
							width: 241px;
						}
					}
				}
			}
		}
	}
</style>
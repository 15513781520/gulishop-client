<!--
 * @Author: your name
 * @Date: 2021-04-10 12:56:26
 * @LastEditTime: 2021-04-11 14:41:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\components\Footer\index.vue
-->
<template>
	<!-- 头部 -->
	<header class="header">
		<!-- 头部的第一行 -->
		<div class="top">
			<div class="container">
				<div class="loginList">
					<p>尚品汇欢迎您！</p>
					<p v-if="userInfo.name" >
						<span>尊敬的：</span>
						<img style="width:26px;vertical-align: middle;margin-top:-3px" src="~@/assets/images/头像.png" alt="">
						<a href="javascript:;">{{ ' '+userInfo.name}}</a> | 
						<a href="javascript:;" @click="userLogout">退出登录</a>
					</p>
					<p v-else>
						<span>请</span>
						<router-link to="/login">登录</router-link>
						<router-link to="register" class="register"
							>免费注册</router-link
						>
					</p>
				</div>
				<div class="typeList">
					<a href="###">我的订单</a>
					<router-link to="/shopcart">我的购物车</router-link>
					<a href="###">我的尚品汇</a>
					<a href="###">尚品汇会员</a>
					<a href="###">企业采购</a>
					<a href="###">关注尚品汇</a>
					<a href="###">合作招商</a>
					<a href="###">商家后台</a>
				</div>
			</div>
		</div>
		<!--头部第二行 搜索区域-->
		<div class="bottom">
			<h1 class="logoArea">
				<router-link class="logo" title="尚品汇" to="/home">
					<img src="./images/logo.png" alt="" />
				</router-link>
			</h1>
			<div class="searchArea">
				<form action="###" class="searchForm">
					<input
						type="text"
						id="autocomplete"
						class="input-error input-xxlarge"
						v-model="keyword"
					/>
					<button
						class="sui-btn btn-xlarge btn-danger"
						type="button"
						@click="toSearch"
					>
						搜索
					</button>
				</form>
			</div>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex';
	export default {
		name: "Header",
		data() {
			return {
				keyword: "",
			};
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo
			})
		},
		methods: {
			toSearch() {
				//声明一个 location 对象
				const location = {
					name: "search",
					//当用户输入为空时，传递的
					params: { keyword: this.keyword || undefined },
				};
				//判断当前 路由对象 中是否有 query 参数,有就讲 params 一起带上
				if (this.$route.query) {
					//这里的判断其实是没有意义的，因为没有query参数query也会是个空对象，这里恒等于true
					location.query = this.$route.query;
				}
				// toSearch中调用 $route.push 方法修改路径
				if(this.$route.name !== 'search'){
					this.$router.push(location);
				}else{
					this.$router.replace(location);
				}
			},
			async userLogout(){
				try {
					await this.$store.dispatch('userLogout')
					alert('退出登录成功')
					this.$router.replace(this.$route.path)
				} catch (error) {
					alert('退出登录失败')
				}
			}
		},
		mounted(){
			//给 全局事件总线 绑定事件,事件被触发时，将输入框清空(因为输入框和keyword属性双向绑定了，所以清空输入框就是讲keyword属性赋值为空串)
			this.$bus.$on('clearKeyword',() => {this.keyword = ''})
		},
	};
</script>

<style lang="less" scoped>
	.header {
		& > .top {
			background-color: #eaeaea;
			height: 30px;
			line-height: 30px;

			.container {
				width: 1200px;
				margin: 0 auto;
				overflow: hidden;

				.loginList {
					float: left;

					p {
						float: left;
						margin-right: 10px;

						.register {
							border-left: 1px solid #b3aeae;
							padding: 0 5px;
							margin-left: 5px;
						}
					}
				}

				.typeList {
					float: right;

					a {
						padding: 0 10px;

						& + a {
							border-left: 1px solid #b3aeae;
						}
					}
				}
			}
		}

		& > .bottom {
			width: 1200px;
			margin: 0 auto;
			overflow: hidden;

			.logoArea {
				float: left;

				.logo {
					img {
						width: 175px;
						margin: 25px 45px;
					}
				}
			}

			.searchArea {
				float: right;
				margin-top: 35px;

				.searchForm {
					overflow: hidden;

					input {
						box-sizing: border-box;
						width: 490px;
						height: 32px;
						padding: 0px 4px;
						border: 2px solid #ea4a36;
						float: left;

						&:focus {
							outline: none;
						}
					}

					button {
						height: 32px;
						width: 68px;
						background-color: #ea4a36;
						border: none;
						color: #fff;
						float: left;
						cursor: pointer;

						&:focus {
							outline: none;
						}
					}
				}
			}
		}
	}
</style>

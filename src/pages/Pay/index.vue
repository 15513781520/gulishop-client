<template>
	<div class="pay-main">
		<div class="pay-container">
			<div class="checkout-tit">
				<h4 class="tit-txt">
					<span class="success-icon"></span>
					<span class="success-info"
						>订单提交成功，请您及时付款，以便尽快为您发货~~</span
					>
				</h4>
				<div class="paymark">
					<span class="fl"
						>请您在提交订单<em class="orange time">4小时</em
						>之内完成支付，超时订单会自动取消。订单号：<em>{{
							orderId
						}}</em></span
					>
					<span class="fr"
						><em class="lead">应付金额：</em
						><em class="orange money"
							>￥{{ payInfo.totalFee }}</em
						></span
					>
				</div>
			</div>
			<div class="checkout-info">
				<h4>重要说明：</h4>
				<ol>
					<li>
						尚品汇商城支付平台目前支持<span class="zfb">支付宝</span
						>支付方式。
					</li>
					<li>其它支付渠道正在调试中，敬请期待。</li>
					<li>
						为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。
					</li>
				</ol>
				<h4>
					支付宝账户信息：（很重要，<span class="save"
						>请保存！！！</span
					>）
				</h4>
				<ul>
					<li>支付帐号：11111111</li>
					<li>密码：111111</li>
					<li>支付密码：111111</li>
				</ul>
			</div>
			<div class="checkout-steps">
				<div class="step-tit">
					<h5>支付平台</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li><img src="./images/pay2.jpg" /></li>
						<li><img src="./images/pay3.jpg" /></li>
					</ul>
				</div>
				<div class="hr"></div>

				<div class="payshipInfo">
					<div class="step-tit">
						<h5>支付网银</h5>
					</div>
					<div class="step-cont">
						<ul class="payType">
							<li><img src="./images/pay10.jpg" /></li>
							<li><img src="./images/pay11.jpg" /></li>
							<li><img src="./images/pay12.jpg" /></li>
							<li><img src="./images/pay13.jpg" /></li>
							<li><img src="./images/pay14.jpg" /></li>
							<li><img src="./images/pay15.jpg" /></li>
							<li><img src="./images/pay16.jpg" /></li>
							<li><img src="./images/pay17.jpg" /></li>
							<li><img src="./images/pay18.jpg" /></li>
							<li><img src="./images/pay19.jpg" /></li>
							<li><img src="./images/pay20.jpg" /></li>
							<li><img src="./images/pay21.jpg" /></li>
							<li><img src="./images/pay22.jpg" /></li>
						</ul>
					</div>
				</div>
				<div class="hr"></div>

				<div class="submit">
					<a class="btn" href="javascript:;" @click="pay">立即支付</a>
				</div>
				<div class="otherpay">
					<div class="step-tit">
						<h5>其他支付方式</h5>
					</div>
					<div class="step-cont">
						<span
							><a href="weixinpay.html" target="_blank"
								>微信支付</a
							></span
						>
						<span>中国银联</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//引入 qrcode 用于生成二维码
	import QRCode from "qrcode";

	export default {
		name: "Pay",
		data() {
			return {
				orderId: "",
				payInfo: {},
				payStatus: 0,
			};
		},
		beforeMount() {
			console.log(this.$route.query.orderId);
			this.orderId = this.$route.query.orderId;
		},
		methods: {
			async getPayInfo() {
				const result = await this.$API.reqGetPayInfo(this.orderId);
				if (result.code === 200) {
					this.payInfo = result.data;
				}
			},
			async pay() {
				try {
					//通过 qrcode 讲 codeUrl 转换成二维码
					const qrcodeUrl = await QRCode.toDataURL(this.payInfo.codeUrl);

					//弹出 MessageBox 展示二维码
					this.$alert(
						`<img src="${qrcodeUrl}" />`,
						"请使用微信扫码支付",
						{
							showClose: false, //是否显示右上角关闭按钮
							showCancelButton: true, //是否显示取消按钮
							cancelButtonText: "支付遇到问题？", //配置取消按钮文字
							confirmButtonText: "我已完成支付", //配置确认按钮文字
							dangerouslyUseHTMLString: true,
							center: true, //居中显示
							//box 关闭前的回调,有三个参数，
							//action：(有三个值，分表表示确认、取消、关闭按钮),instance:messageBox实例,done:一个函数，调用会关闭box
							beforeClose: (action, instance, done) => {
								//判断用户点击的那个按钮
								if (action === "confirm") {
									//如果点击的确认按钮，判断支付状态码是不是200，不是200的话提示用户完成支付
									//
									// if (this.payStatus !== 200) {
									// 	this.$message({
									// 		message:
									// 			"没给钱你点什么点",
									// 		type: "warning",
									// 	});
									// }


									//开后门
									clearInterval(this.timer);
									this.timer = null;
									done();
									this.$router.replace("/paysuccess");
								} else if (action === "cancel") {
									//如果用户点击的取消按钮，提示用户信息，关闭定时器，重置组件实例上的计时器编号属性，关闭 box
									this.$message({
										message: "别犹豫了快付钱吧",
										type: "info",
									});
									clearInterval(this.timer);
									this.timer = null;
									done();
								}
							},
						}
					)
						.then(() => {}) //.then  .catch 处理promise
						.catch(() => {});

					//判断组件实例上的定时器编号属性有没有值，有值代表定时器已近开过了
					if (!this.timer) {
						//开启循环定时器并将生成的定时器编号赋值给组件实例上的定时器编号属性
						this.timer = setInterval(async () => {
							//向服务器查询订单支付状态
							const result = await this.$API.reqGetPayStatus(
								this.orderId
							);
							//判断订单支付状态
							if (result.code === 200) {
								//如果返回的状态码是200表示用户已经成功支付，将状态码保存到data中
								this.payStatus = 200;
								//清除定时器
								clearInterval(this.timer);
								//重置组件实例的定时器编号属性
								this.timer = null;
								//关闭二维码
								this.$msgbox.close();
								//跳转到支付成功页面
								this.$router.replace("/paysuccess");
							}
						}, 2000);
					}
				} catch (error) {
					alert("生成二维码失败");
				}
			},
		},
		mounted() {
			this.getPayInfo();
		},
	};
</script>

<style lang="less" scoped>
	.pay-main {
		margin-bottom: 20px;

		.pay-container {
			margin: 0 auto;
			width: 1200px;

			a:hover {
				color: #4cb9fc;
			}

			.orange {
				color: #e1251b;
			}

			.money {
				font-size: 18px;
			}

			.zfb {
				color: #e1251b;
				font-weight: 700;
			}

			.checkout-tit {
				padding: 10px;

				.tit-txt {
					font-size: 14px;
					line-height: 21px;

					.success-icon {
						width: 30px;
						height: 30px;
						display: inline-block;
						background: url(./images/icon.png) no-repeat 0 0;
					}

					.success-info {
						padding: 0 8px;
						line-height: 30px;
						vertical-align: top;
					}
				}

				.paymark {
					overflow: hidden;
					line-height: 26px;
					text-indent: 38px;

					.fl {
						float: left;
					}

					.fr {
						float: right;

						.lead {
							margin-bottom: 18px;
							font-size: 15px;
							font-weight: 400;
							line-height: 22.5px;
						}
					}
				}
			}

			.checkout-info {
				padding-left: 25px;
				padding-bottom: 15px;
				margin-bottom: 10px;
				border: 2px solid #e1251b;

				h4 {
					margin: 9px 0;
					font-size: 14px;
					line-height: 21px;
					color: #e1251b;
				}

				ol {
					padding-left: 25px;
					list-style-type: decimal;
					line-height: 24px;
					font-size: 14px;
				}

				ul {
					padding-left: 25px;
					list-style-type: disc;
					line-height: 24px;
					font-size: 14px;
				}
			}

			.checkout-steps {
				border: 1px solid #ddd;
				padding: 25px;

				.hr {
					height: 1px;
					background-color: #ddd;
				}

				.step-tit {
					line-height: 36px;
					margin: 15px 0;
				}

				.step-cont {
					margin: 0 10px 12px 20px;

					ul {
						font-size: 0;

						li {
							margin: 2px;
							display: inline-block;
							padding: 5px 20px;
							border: 1px solid #ddd;
							cursor: pointer;
							line-height: 18px;
						}
					}
				}
			}

			.submit {
				text-align: center;

				.btn {
					display: inline-block;
					padding: 15px 45px;
					margin: 15px 0 10px;
					font: 18px "微软雅黑";
					font-weight: 700;
					border-radius: 0;
					background-color: #e1251b;
					border: 1px solid #e1251b;
					color: #fff;
					text-align: center;
					vertical-align: middle;
					cursor: pointer;
					user-select: none;
					text-decoration: none;
				}
			}
		}
	}
</style>
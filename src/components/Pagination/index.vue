<template>
	<div class="pagination">
		<!-- 当前页是第一页的时候，上一页禁用 -->
		<button :disabled="currentPage === 1" @click="changePage(currentPage-1)">上一页</button>
		<!-- 当起始位置大于一的时候，第一页出现 -->
		<button v-if="startEnd.start > 1" @click="changePage(1)">1</button>
		<!-- 当起始位置大于二的时候，第二页出现 -->
		<button v-if="startEnd.start > 2" @click="changePage(2)">2</button>
		<!-- 当起始位置大于三的时候，三点按钮出现 -->
		<button v-if="startEnd.start > 3" >···</button>

		<!-- v-for遍历连续数，同时v-if将不属于连续数的去除 -->
		<button
            :class="{active:currentPage === page}"
			v-if="page >= startEnd.start"
			v-for="page in startEnd.end"
			:key="page"
            @click="changePage(page)"
		>
			{{ page }}
		</button>

		<!-- 当连续数结束位置小于总页数-2的时候三个点才出现 -->
		<button v-if="startEnd.end < pageTotal - 2">···</button>
		<!-- 当连续数结束位置小于总页数-1的时候，倒数第二个按钮才出现 -->
		<button v-if="startEnd.end < pageTotal - 1" @click="changePage(pageTotal-1)">{{ pageTotal - 1 }}</button>
		<!-- 当连续数结束位置小于总页数的时候，倒数一个按钮才出现 -->
		<button v-if="startEnd.end < pageTotal" @click="changePage(pageTotal)">{{ pageTotal }}</button>
		<!-- 当前页是最后一页时，下一页按钮禁用 -->
		<button :disabled="currentPage === pageTotal" @click="changePage(currentPage+1)">下一页</button>

		<button style="margin-left: 30px">共 {{ total }} 条</button>
	</div>
</template>

<script>
	export default {
		name: "Pagination",
		/* 接收四个参数：
					1.当前页码
					2.总条数
					3.每页条数
					4.连续数 */
		props: {
			currentPage: {
				type: Number,
				required: true,
			},
			total: {
				type: Number,
				default: 0,
			},
			pageSize: {
				type: Number,
				required: true,
			},
			continueNum: {
				type: Number,
				default: 5,
			},
		},
		computed: {
			pageTotal() {
				return Math.ceil(this.total / this.pageSize);
			},
			startEnd() {
				let { currentPage, continueNum, pageTotal } = this;
                if(currentPage <= 3){
                    continueNum = 7
                }
                if(currentPage >= pageTotal -2){
                    continueNum = 7
                }
				let start = 0,
					end = 0;
				if (continueNum > pageTotal) {
					return { start: 1, end: pageTotal };
				}
				start = currentPage - Math.floor(continueNum / 2);
				end = currentPage + Math.floor(continueNum / 2);
				if (start < 1) {
					start = 1;
					end = continueNum;
				}
				if (end > pageTotal) {
					end = pageTotal;
					start = pageTotal - continueNum + 1;
				}
				return {
					start,
					end,
				};
			},
		},
        methods:{
            //根据用户点击按键触发事件携带的参数，调用父组件绑定的时间修改页码
            changePage(page){
                this.$emit('changePage',page)
            }
        }
	};
</script>

<style lang="less" scoped>
	.pagination {
		button {
			margin: 0 5px;
			background-color: #f4f4f5;
			color: #606266;
			outline: none;
			border-radius: 2px;
			padding: 0 4px;
			vertical-align: top;
			display: inline-block;
			font-size: 13px;
			min-width: 35.5px;
			height: 28px;
			line-height: 28px;
			cursor: pointer;
			box-sizing: border-box;
			text-align: center;
			border: 0;

			&[disabled] {
				color: #c0c4cc;
				cursor: not-allowed;
			}

			&.active {
				background-color: #e1251b;
				color: #fff;
			}
		}
	}
</style>
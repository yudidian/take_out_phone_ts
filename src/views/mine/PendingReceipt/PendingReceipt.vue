<template>
	<div class="pending-receipt">
		<NavBar title="待收货列表" left-arrow @click-left="$router.back()" />
		<PullRefresh v-model="refreshLoading" @refresh="onRefresh" success-text="刷新成功">
			<List ref="list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="list-wrapper">
				<Empty
					image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
					image-size="80"
					description="空空如也~"
					v-if="orderList.length === 0"
				/>
				<CellGroup v-else inset class="history-wrapper" v-for="(item, index) in orderList" :key="item.id">
					<Cell class="orders">
						<Icon name="orders-o" size="20px" @click="copyOrderId(item.number)" />
						<span class="orders-id">
							{{ item.number }}
						</span>
					</Cell>
					<Cell class="orders">
						<Icon name="manager-o" size="20px" />
						<span class="orders-id">
							{{ item.consignee }}
						</span>
					</Cell>
					<Cell class="orders">
						<Icon name="phone-o" size="20px" />
						<span class="orders-id">
							{{ item.phone }}
						</span>
					</Cell>
					<Cell class="orders">
						<Icon name="underway-o" size="20px" />
						<span class="orders-id">
							{{ item.checkoutTime }}
						</span>
					</Cell>
					<Cell class="orders">
						<Icon name="logistics" size="20px" />
						<span class="orders-id">
							{{ item.address }}
						</span>
					</Cell>
					<ul class="order-wrapper" v-for="list in item.orderDetailList" :key="list.id">
						<li class="order-item">
							<Image width="1.2rem" height="1.2rem" fit="cover" :src="BASE_IMAGE_URL + list.image" />
							<div class="order-name">
								{{ list.name }}
							</div>
							<div class="order-num">
								<span class="number-logo"> x </span>
								<span class="count">{{ list.number }}</span>
							</div>
						</li>
					</ul>
					<Cell class="bottom-btn">
						<Button round @click="cancelReceipt(item.number, index)" style="margin-right: 20px"> 取消订单 </Button>
						<Button round @click="showOrderStep(item.number)" style="margin-right: 20px"> 查看状态 </Button>
						<Button type="danger" round @click="confirmReceipt(item.number, true, index)"> 确定收货 </Button>
					</Cell>
				</CellGroup>
			</List>
		</PullRefresh>
		<VanDialog v-model:show="isShowDialog" title="物流信息" show-cancel-button @confirm="isShowDialog = false" @cancel="isShowDialog = false">
			<OrderSteps :state="orderState" />
		</VanDialog>
		<BackTop target=".list-wrapper" />
	</div>
</template>

<script setup name="PendingReceipt" lang="ts">
import { BackTop, NavBar, List, Icon, Toast, Image, CellGroup, Cell, Button, Dialog, Empty, Notify, PullRefresh } from "vant";
import { ref } from "vue";
import useClipboard from "vue-clipboard3";
import OrderSteps from "./component/OrderSteps.vue";
import { sendCancelOrders, sendConfirmOrCancelOrders, sendGetHistoryOrders, sendGetOrderStates } from "@/api/module/user";
import { OrderList } from "@/views/types/interface";
const BASE_IMAGE_URL = import.meta.env.VITE_LOCAL_SERVE_IMGE_URL;
const list = ref<InstanceType<typeof List> | null>(null);
const { toClipboard } = useClipboard();
const orderList = ref<Array<OrderList>>([]);
const loading = ref(false);
const refreshLoading = ref(false);
const finished = ref(false);
const orderState = ref(1);
const isShowDialog = ref(false);
const onLoad = () => {
	const pageSize = 10;
	const page = orderList.value.length / pageSize + 1;
	getHistoryOrders(page, pageSize);
};
const getHistoryOrders = async (page: number, pageSize: number) => {
	const res = await sendGetHistoryOrders({
		page,
		pageSize,
		state: 2
	});
	loading.value = false;
	if (res.code === 1) {
		orderList.value.push(...res.info.records);
		if (orderList.value.length >= res.info.total) {
			finished.value = true;
		}
	} else {
		new Toast(res.msg);
	}
};
const copyOrderId = async (id: string) => {
	try {
		await toClipboard(id);
		new Toast("订单号复制成功");
	} catch (e: any) {
		new Toast(e.message);
	}
};
// 确认收货
const confirmReceipt = async (id: string, flag: boolean, index: number) => {
	const res = await sendGetOrderStates({
		number: id,
		flag: 0
	});
	if (res.code === 1 && res.data.state === 2) {
		new Toast({
			type: "fail",
			message: "商家还未发货"
		});
		return;
	}
	let msg: string;
	if (flag) {
		msg = "是否确认收货";
	} else {
		msg = "是否取消订单";
	}
	Dialog.confirm({
		message: msg
	}).then(async () => {
		const res = await sendConfirmOrCancelOrders({
			flag,
			ordersId: id
		});
		if (res.code === 1) {
			Toast.success(res.msg);
			orderList.value.splice(index, 1);
		} else {
			new Notify({
				type: "danger",
				message: res.msg
			});
		}
	});
};
// 取消订单
const cancelReceipt = (number: string, index: number) => {
	Dialog.confirm({
		message: "是否取消订单"
	}).then(async () => {
		const res = await sendCancelOrders({
			number
		});
		if (res.code === 1) {
			if (res.info.cancel) {
				Toast.success(res.msg);
				orderList.value.splice(index, 1);
			} else {
				Toast.fail(res.msg);
			}
		} else {
			new Notify({
				type: "danger",
				message: res.msg
			});
		}
	});
};
const showOrderStep = async (number: string) => {
	isShowDialog.value = true;
	const res = await sendGetOrderStates({
		number,
		flag: 0
	});
	if (res.code === 1) {
		orderState.value = res.data.state;
	} else {
		new Notify({
			type: "danger",
			message: res.msg
		});
	}
};
const onRefresh = () => {
	refreshLoading.value = false;
	onLoad();
};
</script>
<style scoped lang="scss">
.pending-receipt {
	.list-wrapper {
		width: 100%;
		height: calc(100vh - 46px);
		overflow-y: auto;
	}
}
.history-wrapper {
	margin-top: 20px;
	font-size: 14px;
	color: #737373;
	.orders {
		display: flex;
		padding-left: 20px;
		justify-content: flex-start;
		align-items: center;
		:deep(.van-cell__value) {
			text-align: left;
		}
		.orders-id {
			margin-left: 10px;
			margin-right: 10px;
		}
	}
	.bottom-btn {
		:deep(> .van-cell__value) {
			display: flex;
			justify-content: flex-end;
		}
	}
	.order-wrapper {
		padding-left: 20px;
		.order-item {
			margin-bottom: 10px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.van-image {
				overflow: hidden;
				border-radius: 10px;
			}
			.order-name {
				margin-left: 20px;
			}
			.order-num {
				margin-left: auto;
				margin-right: 20px;
				.number-logo {
					font-size: 12px;
				}
				.count {
					font-size: 14px;
				}
			}
		}
	}
}
</style>

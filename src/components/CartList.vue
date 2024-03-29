<template>
	<div class="cart-wrapper">
		<Empty
			v-if="cartInfoList.length <= 0"
			image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
			image-size="80"
			description="空空如也"
		>
			<Button style="width: 170px" round type="danger" size="large" class="bottom-button" @click="$router.push('/home')"> 去选购 </Button>
		</Empty>
		<CellGroup inset v-else>
			<Cell style="background-color: #ffffff" v-for="(item, index) in cartInfoList" :key="item.id">
				<Card class="cart-item" :title="item.name" :thumb="IMG_URL + item.image">
					<template #footer>
						<span :class="$route.name === 'CartPage' ? 'goods-price' : 'orders-price'">￥{{ (item.amount / 100).toFixed(2) }}</span>
						<Button round size="mini" icon="minus" @click="addOrLessHandler(item, 'less', index)" />
						<span class="cart-number">{{ item.number }}</span>
						<Button round size="mini" icon="plus" @click="addOrLessHandler(item, 'add', index)" />
					</template>
				</Card>
			</Cell>
		</CellGroup>
	</div>
</template>

<script setup name="CartList" lang="ts">
import { Button, Card, Cell, CellGroup, showConfirmDialog, Empty, showNotify } from "vant";
import { sendAddCart, sendDeleteCartOne, sendGetCartList, sendLessCartCount } from "@/api/module/goods";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";
import { CartList } from "@/components/interface/type";

const store = useStore();
const emits = defineEmits(["getPrice", "getCartLength"]);
const IMG_URL = import.meta.env.VITE_LOCAL_SERVE_IMGE_URL;
// 购物车列表
const cartInfoList = ref<Array<CartList>>([]);
onMounted(() => {
	getCartList();
});
const price = computed(() => {
	if (cartInfoList.value.length > 0) {
		return cartInfoList.value.reduce((pre, item) => {
			return pre + item.number * item.amount;
		}, 0);
	} else {
		return 0;
	}
});
// 商品数量加减
const addOrLessHandler = async (item: CartList, flag: string, index: number) => {
	if (item.number >= 99) {
		showNotify({
			type: "danger",
			message: "商品可添加数量最大为99"
		});
		return;
	}
	// 减操作
	if (flag === "less") {
		if (item.number > 1) {
			const res = await sendLessCartCount(item);
			if (res.code === 1) {
				cartInfoList.value[index] = res.info;
				emits("getPrice", price.value);
			} else {
				showNotify({
					type: "danger",
					message: res.msg
				});
			}
		} else {
			showConfirmDialog({
				title: "标题",
				message: "是否删除改商品"
			}).then(async () => {
				const res = await sendDeleteCartOne(item);
				if (res.code === 1) {
					cartInfoList.value.splice(index, 1);
					emits("getPrice", price.value);
				} else {
					showNotify({
						type: "danger",
						message: res.msg
					});
				}
			});
		}
	} else {
		if (item.number > 99) {
			showNotify({
				type: "danger",
				message: "商品最大数量不能超过99"
			});
		} else {
			// 加操作
			const res = await sendAddCart(item);
			if (res.code === 1) {
				cartInfoList.value[index] = res.info;
				emits("getPrice", price.value);
			} else {
				showNotify({
					type: "danger",
					message: res.msg
				});
			}
		}
	}
};

// 获取购物车列表
const getCartList = async () => {
	if (store.getters.token === "") {
		cartInfoList.value = [];
		return;
	}
	const res = await sendGetCartList();
	if (res.code === 1) {
		cartInfoList.value = res.info;
		emits("getPrice", price.value);
	} else {
		showNotify({
			type: "danger",
			message: res.msg
		});
	}
};
watch(
	cartInfoList,
	val => {
		emits("getCartLength", val.length);
	},
	{ deep: true }
);
</script>

<style scoped lang="scss">
.cart-wrapper {
	overflow-y: auto;
	height: calc(100vh - 96px);

	.cart-item {
		position: relative;
		height: 88px;
		margin-top: 10px;
		background-color: #ffffff;

		:deep(.van-card__title) {
			margin-top: 10px;
		}

		:deep(.van-card__thumb) {
			width: 80px;
			height: 80px;
		}

		:deep(.van-card__bottom) {
			margin-bottom: 4px;
		}

		:deep(.van-card__footer) {
			position: absolute;
			bottom: 2px;
			height: 24px;
			left: 35%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.goods-price {
				width: 90px;
				overflow: hidden;
				margin-right: 32px;
				text-align: left;
				color: red;
			}
			.orders-price {
				width: 90px;
				overflow: hidden;
				margin-right: -11px;
				text-indent: 1em;
				text-align: left;
				color: red;
			}
			.cart-number {
				height: 24px;
				font-size: 14px;
				width: 20px;
				color: red;
				text-align: center;
				line-height: 24px;
				margin-left: 4px;
			}
		}
	}
}
</style>

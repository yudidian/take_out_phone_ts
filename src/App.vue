<template>
	<ConfigProvider theme="theme">
		<router-view v-slot="{ Component }" v-if="isWeChat">
			<keep-alive :include="store.getters.parentKeepalive">
				<component :is="Component" :key="$route.name" />
			</keep-alive>
		</router-view>
		<div v-else class="error-wrapper" style="width: 100vw; height: 100vh">
			<div class="error-open">
				<img src="./assets/image/false.png" alt="" />
				<p>请在手机微信客户端打开链接</p>
			</div>
		</div>
		<MyLoading :show="store.getters.showLoading" />
	</ConfigProvider>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { isWeiXin } from "@/utils/common";
import { provide, ref } from "vue";
import { ConfigProvider } from "vant";
const store = useStore();
provide("store", store);
const isWeChat = ref(isWeiXin());
</script>
<style lang="scss" scoped>
.error-open {
	position: relative;
	top: 32%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	img {
		width: 50px;
		margin-bottom: 10px;
	}

	p {
		font-size: 22px;
		font-weight: 900;
	}
}
</style>

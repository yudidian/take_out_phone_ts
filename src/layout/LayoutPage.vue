<template>
	<section>
		<RouterView v-slot="{ Component }">
			<keep-alive :include="store.getters.childKeepalive">
				<component :is="Component" />
			</keep-alive>
		</RouterView>
		<Tabbar v-model="active" router @change="tabChangeHandler">
			<TabbarItem name="HomePage" to="/home" icon="home-o"> 首页 </TabbarItem>
			<TabbarItem name="CartPage" to="/cart" icon="cart-o"> 购物车 </TabbarItem>
			<TabbarItem name="PersonalCenter" icon="user-o" to="/mine"> 我的 </TabbarItem>
		</Tabbar>
	</section>
</template>
<script setup name="LayoutPage" lang="ts">
import { Tabbar, TabbarItem } from "vant";
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, ref, watch, inject } from "vue";
import SocketService from "@/utils/websocket";

const WEB_SOCKET_URL = import.meta.env.DEV ? import.meta.env.VITE_LOCAL_WEBSOCK : import.meta.env.VITE_SERVER_WEBSOCK;
const store: any = inject("store");
const active = ref("HomePage");
const route = useRoute();
watch(route, val => {
	active.value = val.name as string;
});
const init = () => {
	if (store.getters.token) {
		console.log(localStorage.getItem("reload"));
		if (!localStorage.getItem("reload")) {
			localStorage.setItem("reload", "true");
			window.location.reload();
			return;
		}
		if (localStorage.getItem("reload") === "true") {
			localStorage.setItem("reload", "false");
			window.location.reload();
			return;
		}
		const socket = new SocketService(`${WEB_SOCKET_URL}/websocket?userId=${store.getters.userId}`);
		socket.getMessage();
	}
};
onMounted(() => {
	init();
});
onMounted(() => {
	active.value = route.name as string;
});
onBeforeUnmount(() => {
	localStorage.setItem("reload", "true");
});
const tabChangeHandler = (val: string) => {
	active.value = val;
};
</script>

<style scoped></style>

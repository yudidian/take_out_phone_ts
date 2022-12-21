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
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";
const store = useStore();
const active = ref("HomePage");
const route = useRoute();
watch(route, val => {
	active.value = val.name as string;
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

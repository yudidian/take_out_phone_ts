import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/LoginPage.vue")
	}
];

const myRouter = createRouter({
	history: createWebHashHistory(),
	routes
});
// 不需要登录的路径
const NoPermissionsPath = ["login", "HomePage", "GoodsDetail"];
myRouter.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title as string;
	}
	if (!NoPermissionsPath.includes(to.name as string) && store.getters.token === "") {
		store.dispatch("removeChildRouters", "HomePage");
		store.dispatch("removeParentRouters", "LayoutPage");
		next("/login");
	}
	// 如果结算页面去选择地址则缓存该路由
	if (from.name === "SettlementPage" && to.name === "AddressChoose") {
		store.dispatch("addParentRouters", "SettlementPage");
	}
	if (from.name === "SettlementPage" && (to.name === "CartPage" || to.name === "PersonalCenter")) {
		store.dispatch("removeParentRouters", "SettlementPage");
	}
	next();
});
export default myRouter;

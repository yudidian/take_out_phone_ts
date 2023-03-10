import { login } from "@/api/module/user";
import { showNotify } from "vant";
import router from "@/router/index";
import store from "@/store";
import { Module } from "vuex";
import { UserStoreType } from "@/store/interface/type";
import { RootState } from "@/store/interface/rootState";
const state: Module<UserStoreType, RootState> = {
	state() {
		return {
			token: localStorage.getItem("token") || "",
			userId: localStorage.getItem("userId") || "",
			action: localStorage.getItem("action") || "/"
		};
	},
	mutations: {
		setToken(state, value) {
			state.token = value.token;
			state.userId = value.id;
		},
		setUserAction(state, value) {
			localStorage.setItem("action", value);
			state.action = value;
		}
	},
	actions: {
		async toLogin({ commit }, data) {
			const res = await login(data);
			if (res.code === 1) {
				commit("setToken", res.info);
				localStorage.setItem("token", res.info.token);
				localStorage.setItem("userId", res.info.userId);
				// 登录成功开启对HomePage 的缓存
				store.dispatch("addChildRouters", "HomePage").then();
				await router.replace(store.getters.action);
				showNotify({
					type: "success",
					message: "登录成功"
				});
			} else {
				showNotify({
					type: "danger",
					message: res.msg
				});
			}
		},
		userAction({ commit }, data) {
			commit("setUserAction", data);
		}
	}
};
export default state;

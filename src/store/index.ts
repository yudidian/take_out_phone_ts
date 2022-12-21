import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import getters from "./getters";
import user from "./module/user";
import keepRouters from "./module/keepRouters";
import { AllStates } from "@/store/interface/type";
export const key: InjectionKey<Store<AllStates>> = Symbol("key");
export default createStore<AllStates>({
	state: {
		showLoading: false
	},
	mutations: {
		changShowLoading(state, value) {
			state.showLoading = value;
		}
	},
	getters,
	modules: {
		user,
		keepRouters
	}
});
export function useStore() {
	return baseUseStore(key);
}

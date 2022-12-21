import { AllStates } from "@/store/interface/type";
import { GetterTree } from "vuex";
import { RootState } from "@/store/interface/rootState";
const getters: GetterTree<AllStates, RootState> = {
	token: (state: AllStates) => {
		return state.user.token;
	},
	showLoading: (state: AllStates) => {
		return state.showLoading;
	},
	childKeepalive: (state: AllStates) => {
		return state.keepRouters.childKeepAliveRouters;
	},
	parentKeepalive: (state: AllStates) => {
		return state.keepRouters.parentKeepAliveRouters;
	},
	action: (state: AllStates) => state.user.action
};
export default getters;

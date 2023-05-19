import MyLoading from "@/components/MyLoading.vue";
import TasteSelection from "@/components/TasteSelection.vue";
import CartList from "@/components/CartList.vue";
import ToTop from "@/components/ToTop.vue";
import VantDialog from "vant/lib/dialog";
export default {
	install(app: any) {
		app
			.component("MyLoading", MyLoading)
			.component("TasteSelection", TasteSelection)
			.component("CartList", CartList)
			.component("ToTop", ToTop)
			.component("VanDialog", VantDialog);
	}
};

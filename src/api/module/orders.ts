import { httpGet } from "@/api/request";
import { SubmitOrdersType } from "@/api/interface/SendType";

// 提交订单
export const sendSubmitOrders = (params: SubmitOrdersType) => {
	return httpGet("/orders", params);
};

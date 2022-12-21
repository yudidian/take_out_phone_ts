import request from "@/api/request";
import { LoginSendType } from "@/api/interface/SendType";

// 登录
export const login = (data: LoginSendType) => {
	return request({
		url: "/user/login",
		method: "POST",
		data
	});
};
// 发送验证码
export const sendCode = (params: { email: string }) => {
	return request({
		url: "/email",
		method: "GET",
		params
	});
};
// 获取用户信息
export const sendGetUserInfo = () => {
	return request({
		url: "/user",
		method: "get"
	});
};
// 上传头像
export const sendUploadImage = (formData: FormData) => {
	return request({
		url: "/upload",
		method: "POST",
		data: formData,
		headers: {
			"Content-type": "multipart/form-data"
		}
	});
};
// 更新用户信息
export const sendUploadUserInfo = (data: any) => {
	return request({
		method: "PUT",
		url: "/user",
		data
	});
};
// 获取用户最新订单
export const sendGetNewOrders = () => {
	return request({
		method: "get",
		url: "/orders/latest"
	});
};
// 获取用户最新订单
export const sendGetHistoryOrders = (params: any) => {
	return request({
		method: "get",
		url: "/orders/list",
		params
	});
};
// 获取用户待收货数量
export const sendPendingReceipt = () => {
	return request({
		method: "get",
		url: "/orders/unfinished"
	});
};
// 确认订单
export const sendConfirmOrCancelOrders = (params: any) => {
	return request({
		method: "get",
		url: "/orders/confirmOrCancel",
		params
	});
};
// 取消订单
export const sendCancelOrders = (params: any) => {
	return request({
		method: "get",
		url: "/orders/cancel",
		params
	});
};
// 获取订单状态
export const sendGetOrderStates = (params: any) => {
	return request({
		method: "get",
		url: "/orders/state",
		params
	});
};

import { httpPost, httpGet, httpPut } from "@/api/request";
import { LoginSendType } from "@/api/interface/SendType";

// 登录
export const login = (data: LoginSendType) => {
	return httpPost("/user/login", data);
};
// 发送验证码
export const sendCode = (params: { email: string }) => {
	return httpGet("/email", params);
};
// 获取用户信息
export const sendGetUserInfo = () => {
	return httpGet("/user");
};
// 上传头像
export const sendUploadImage = (formData: FormData) => {
	return httpPost("/upload", formData, {
		"Content-type": "multipart/form-data"
	});
};
// 更新用户信息
export const sendUploadUserInfo = (data: any) => {
	return httpPut("/user", data);
};
// 获取用户最新订单
export const sendGetNewOrders = () => {
	return httpGet("/orders/latest");
};
// 获取用户最新订单
export const sendGetHistoryOrders = (params: any) => {
	return httpGet("/orders/list", params);
};
// 获取用户待收货数量
export const sendPendingReceipt = () => {
	return httpGet("/orders/unfinished");
};
// 确认订单
export const sendConfirmOrCancelOrders = (params: any) => {
	return httpGet("/orders/confirmOrCancel", params);
};
// 取消订单
export const sendCancelOrders = (params: any) => {
	return httpGet("/orders/cancel", params);
};
// 获取订单状态
export const sendGetOrderStates = (params: any) => {
	return httpGet("/orders/state", params);
};

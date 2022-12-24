import { httpRequest } from "@/api/request";
import { AddAddress } from "@/views/home/interface/type";
// 获取地址列表
export const getAddressList = () => {
	return httpRequest("/address/list", "GET");
};
// 获取默认地址
export const getDefaultAddress = () => {
	return httpRequest("/address/default", "GET");
};

// 设置默认地址
export const setDefaultAddress = (id: string) => {
	return httpRequest(`/address/set/${id}`, "GET");
};
// 添加地址
export const addAddress = (data: AddAddress) => {
	return httpRequest("/address", "POST", data);
};
// 添加地址
export const getAddress = (id: string) => {
	return httpRequest(`/address/${id}`, "get");
};
// 修改地址
export const sendUpdateAddress = (data: AddAddress) => {
	return httpRequest("/address", "put", data);
};

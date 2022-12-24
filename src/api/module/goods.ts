import { httpRequest } from "@/api/request";
import { AddCartType } from "@/views/home/interface/type";
// 获取商品详情
export const sendGoodsInfo = (id: string) => {
	return httpRequest(`/dish/${id}`, "get");
};
// 获取商品详情
export const sendSetmealInfo = (id: string) => {
	return httpRequest(`/setmeal/${id}`, "get");
};
// 改变收藏状态值
export const sendChangeFavorites = (data: { id: string; type: string }) => {
	return httpRequest("/favorites/change", "get", null, data);
};
// 改变收藏状态值
export const sendGetFavorites = (id: string, type: string) => {
	return httpRequest(`/favorites/${id}/${type}`, "get");
};
// 添加进购物车
export const sendAddCart = (data: AddCartType) => {
	return httpRequest("/cart/add", "post", data);
};
// 获取购物车列表
export const sendGetCartList = () => {
	return httpRequest("/cart/list", "get");
};
// 清空购物车
export const sendDeleteCartAll = () => {
	return httpRequest("/cart/delete/all", "delete");
};
// 菜品数量-1
export const sendLessCartCount = (data: { dishId?: string; setmealId?: string }) => {
	return httpRequest("/cart/less", "put", data);
};
// 删除菜品
export const sendDeleteCartOne = (data: { dishId?: string; setmealId?: string }) => {
	return httpRequest("/cart/delete/one", "put", null, data);
};
/**
 * 获取菜品描述
 * @param id 菜品ID
 * @returns {*}
 */
export const sendGetDishDescription = (id: string) => {
	return httpRequest(`/goods/description/${id}`, "get");
};
export const sendGetStoreUpList = (params: { page: number; pageSize: number }) => {
	return httpRequest("/favorites/list", "get", null, params);
};

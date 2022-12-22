import { httpGet } from "@/api/request";

export const getCategory = () => {
	return httpGet("/category/all");
};
export const getDish = (params: any) => {
	return httpGet("/dish/list", params);
};
export const getSetmeal = (params: any) => {
	return httpGet("/setmeal/list", params);
};
export const sendGetSwiperList = () => {
	return httpGet("/swiper");
};

import { httpGet, httpPost } from "@/api/request";
import { GetReviewCountType, GetReviewListType, SaveReviewsType } from "@/api/interface/SendType";

// 写评论
export const sendSaveReviews = (data: SaveReviewsType) => {
	return httpPost("/reviews", data);
};
// 获取对应评论列表
export const sendGetReviewList = (data: GetReviewListType) => {
	return httpGet("/reviews/list", data);
};
// 获取对应评论列表各个数量
export const sendGetReviewCount = (data: GetReviewCountType) => {
	return httpGet("/reviews/count", data);
};

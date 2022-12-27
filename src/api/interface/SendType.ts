export interface LoginSendType {
	email: string;
	code: string;
}
export interface LoginResponseType {
	phone: string;
	code: string;
}

export interface SaveReviewsType {
	dishId?: string;
	setmealId?: string;
	rating: number;
	text: string;
	image: string;
}
export interface GetReviewListType {
	dishId?: string;
	setmealId?: string;
	reta: number;
	page: number;
	pageSize: number;
}
export interface GetReviewCountType {
	dishId?: string;
	setmealId?: string;
}
export interface SubmitOrdersType {
	addressBookId: string;
	payMethod: number;
	remark: string;
}

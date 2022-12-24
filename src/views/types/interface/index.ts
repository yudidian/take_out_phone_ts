// CustomerService.vue 消息列表
export interface MessageList {
	id: string;
	// 客服名字
	managerName: string;
	// 客服头像
	managerAvatar: string;
	// 消息内容
	message: string;
	// 发送时间
	createTime: number;
	// 用户名
	userName: string;
	// 用户头像
	userAvatar: string;
}
// GoodsDetail.vue 商品详情
export interface DescriptionInfo {
	description: string;
	mainMeterial: string;
	productionMethod: string;
	count: number;
	taste: string;
}
export interface GoodsInfo {
	id: string;
	image: string;
	name: string;
	salesVolume: string;
	price: number;
	taste: string;
	flavors: string;
}
// PersonalCenter.vue 个人中心
export interface FileList {
	url: string;
}
export interface OrderDetailList {
	id: string;
	image: string;
	name: string;
	number: string;
	setmealId?: string;
	dishId?: string;
	orderId: string;
}
export interface OrderList {
	id: string;
	number: string;
	consignee: string;
	phone: string;
	checkoutTime: string;
	address: string;
	orderDetailList: Array<OrderDetailList>;
}
export interface AddressListType {
	id: string;
	name: string;
	tel: string;
	address: string;
	isDefault: boolean;
}

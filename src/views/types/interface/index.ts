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
export interface reviewType {
	username: string;
	images: Array<string>;
	// 回复类容
	storeReview: string;
	// 回复时间
	reviewTime: string;
	// @ApiModelProperty("ID")
	id: string;

	// @ApiModelProperty("普通菜品ID")
	dishId?: string;

	// @ApiModelProperty("套餐ID")
	setmealId?: string;

	// @ApiModelProperty("用户头像")
	avatar: string;

	// @ApiModelProperty("评分等级")
	rating: number;

	// @ApiModelProperty("评论类容")
	text: string;

	// @ApiModelProperty("评论时间")
	createTime: string;

	// @ApiModelProperty("评论图片")
	// @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	image: string;
}
export interface reviewList {
	records: Array<reviewType>;
	total: number;
	pages: number;
}
export interface AddressEditType {
	id: string;
	name: string;
	tel: string;
	city: string;
	areaCode: string;
	province: string;
	county: string;
	addressDetail: string;
}
export interface OrderInfoType {
	addressBookId: string;
	remark: string; // 备注
	payMethod: number; // 1 微信 2 支付宝
}
export interface AddAddressType {
	id?: string;
	//收货人
	consignee: string;
	//手机号
	phone: string;
	//省级区划编号
	provinceCode?: string;
	//省级名称
	provinceName: string;
	//市级区划编号
	cityCode?: string;
	//市级名称
	cityName: string;
	//区级区划编号
	districtCode?: string;
	//区级名称
	districtName: string;
	//详细地址
	detail: string;
	//标签
	label: string;
	isDefault?: number;
}
export interface StoreUpListType {
	// @ApiModelProperty("菜品ID")
	dishId?: string;

	// @ApiModelProperty("套餐ID")
	setmealId?: string;

	// @ApiModelProperty("套餐或菜品标识")
	type: string;

	// @ApiModelProperty("套餐或者菜品名称")
	name: string;

	// @ApiModelProperty("套餐或者菜品图片")
	image: string;
	// @ApiModelProperty("主表ID")
	id: string;
}
export interface RStoreUpListType {
	records: StoreUpListType[];
	total: number;
}

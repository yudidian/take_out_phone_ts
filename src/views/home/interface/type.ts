export interface CategoryList {
	id: string;
	name: string;
	type: number;
}
export interface Flavors {
	dishId: string;
	id: string;
	isDeleted: number;
	name: string;
	value: string;
}
export interface DishList {
	allId: Array<string>;
	categoryId: string;
	code: string;
	description: string;
	flavors: string;
	FlavorsList: Array<Flavors>;
	id: string;
	image: string;
	isDeleted: number;
	name: string;
	price: number;
	reviewCount: number;
	salesVolume: number;
	sort: number;
	status: number;
	updateTime: string;
}
export interface SwiperList {
	id: string;
	imageUrl: string;
	createTime: string;
}
export interface FlavorsList {
	value: string;
	active: boolean;
}
export interface AddCartType {
	//名称
	name: string;
	//套餐id
	setmealId: string;
	//数量
	number: number;
	//金额
	amount: number;
	//图片
	image: string;
}
export interface AddAddress {
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

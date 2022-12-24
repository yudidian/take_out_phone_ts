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
	//用户id
	userId: string;
	//菜品id
	dishId: string;
	//套餐id
	setmealId: string;
	//口味
	dishFlavor: string;
	//数量
	number: number;
	//金额
	amount: number;
	//图片
	image: string;
}
export interface AddAddress {
	//收货人
	consignee: string;
	//手机号
	phone: string;
	//性别 0 女 1 男
	sex: number;
	//省级区划编号
	provinceCode?: number;
	//省级名称
	provinceName: string;
	//市级区划编号
	cityCode?: number;
	//市级名称
	cityName: string;
	//区级区划编号
	districtCode?: number;
	//区级名称
	districtName: string;
	//详细地址
	detail: string;
	//标签
	label: string;
	isDefault: number;
}

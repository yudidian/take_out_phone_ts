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
	flavors: Array<Flavors>;
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

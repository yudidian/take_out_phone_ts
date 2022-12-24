interface CartType {
	id: string;
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
	createTime: string;
}

export interface CartInfoType {
	cartList: Array<CartType>;
	amount: number;
}

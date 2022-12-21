export interface KeepRouterType {
	childKeepAliveRouters: Array<string>;
	parentKeepAliveRouters: Array<string>;
}
export interface UserStoreType {
	token: string;
	userId: string;
	action: string;
}

export interface AllStates {
	showLoading?: boolean;
	user?: UserStoreType;
	keepRouters?: KeepRouterType;
}

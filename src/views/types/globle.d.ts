export interface BaseResponse<T = any, D = any> {
	code: number;
	msg: string;
	data: T;
	info: D;
}

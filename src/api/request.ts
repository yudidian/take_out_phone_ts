import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { showNotify } from "vant";
import router from "@/router/index";
import store from "@/store";
import { BaseResponse } from "@/views/types/globle";
const request = axios.create({
	baseURL: "/api",
	timeout: 100000
});
request.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// 一个页面有大量请求时只展示一次遮罩
		if (!store.getters.showLoading) {
			store.commit("changShowLoading", true);
		}
		// get请求映射params参数
		const token = localStorage.getItem("token");
		if (token && config.headers) {
			config.headers.token = token;
		}
		return config;
	},
	error => {
		store.commit("changShowLoading", false);
		Promise.reject(error).then();
	}
);

request.interceptors.response.use(
	(res: AxiosResponse) => {
		store.commit("changShowLoading", false);
		if (res.data.msg.includes("token")) {
			// 登录过期的时候清除路由对HomePage的缓存
			store.dispatch("removeChildRouters", "HomePage").then();
			store.dispatch("removeParentRouters", "LayoutPage").then();
			if (router.currentRoute.value.path !== "/login") {
				store.commit("setUserAction", router.currentRoute.value.fullPath);
			}
			showNotify({
				message: "用户信息过期",
				type: "warning"
			});
			router.replace("/login").then();
		}
		return res;
	},
	error => {
		store.commit("changShowLoading", false);
		// 登录过期的时候清除路由对HomePage的缓存
		store.dispatch("removeChildRouters", "HomePage").then();
		store.dispatch("removeParentRouters", "LayoutPage").then();
		let { message } = error;
		if (message === "Network Error") {
			message = "后端接口连接异常";
		} else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		} else if (message.includes("Request failed with status code 403")) {
			message = error.response.data.msg;
			router.push("/login").then();
		} else if (message.includes("Request failed with status code")) {
			message = "系统接口异常";
		}
		showNotify({
			message,
			type: "warning"
		});
	}
);

export const httpPost = <T = any>(url: string, data?: T, headers?: any) => {
	return new Promise<BaseResponse>(resolve => {
		request({
			url,
			method: "POST",
			data,
			headers
		}).then((res: AxiosResponse<BaseResponse>) => {
			resolve(res.data);
		});
	});
};
export const httpPut = <T = any>(url: string, data: T) => {
	return new Promise<BaseResponse>(resolve => {
		request({
			url,
			method: "put",
			data
		}).then((res: AxiosResponse<BaseResponse>) => {
			resolve(res.data);
		});
	});
};
export const httpGet = <T = any>(url: string, params?: T) => {
	return new Promise<BaseResponse>(resolve => {
		request({
			url,
			method: "get",
			params
		}).then((res: AxiosResponse<BaseResponse>) => {
			resolve(res.data);
		});
	});
};
// export const httpDelete = <T = any>(url: string, params: T) => {
// 	return new Promise<BaseResponse>(resolve => {
// 		request({
// 			url,
// 			method: "delete",
// 			params
// 		}).then((res: AxiosResponse<BaseResponse>) => {
// 			resolve(res.data);
// 		});
// 	});
// };
export const httpRequest = <T = any, D = any>(url: string, method: string, data?: any, params?: any, headers?: any) => {
	return new Promise<BaseResponse<T, D>>(resolve => {
		request({
			url,
			method,
			params,
			data,
			headers
		}).then((res: AxiosResponse<BaseResponse<T, D>>) => {
			resolve(res.data);
		});
	});
};

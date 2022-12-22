import dayjs from "dayjs";
export function debounce(fn: Function, delay: number) {
	let timer: NodeJS.Timer;
	return function (e: any) {
		// 取消之前的延时调用，每当用户输入的时候把前一个setTimeout清除
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(e);
		}, delay); // 直至delay时间后，监听的事件没有改变后，才会执行fn()
	};
}
export const isWeiXin: () => boolean = function () {
	// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	const ua = window.navigator.userAgent.toLowerCase();
	const reg = /micromessenger|WeChat/i;
	return reg.test(ua);
};
export const formatDate = (time: number) => {
	return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

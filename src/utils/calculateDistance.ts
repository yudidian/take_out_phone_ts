function rad(d: number) {
	return (d * Math.PI) / 180.0;
}
// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export const getDistances = (lat1: number, lng1: number, lat2: number, lng2: number) => {
	const radLat1 = rad(lat1);
	const radLat2 = rad(lat2);
	const a = radLat1 - radLat2;
	const b = rad(lng1) - rad(lng2);
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // EARTH_RADIUS;
	// 输出为公里
	s = Math.round(s * 10000) / 10000;

	const distance = s;
	let distanceStr = "";

	if (parseInt(String(distance)) >= 1) {
		distanceStr = distance.toFixed(2) + "km";
	} else {
		distanceStr = (distance * 1000).toFixed(2) + "m";
	}
	return {
		distance,
		distanceStr
	};
};

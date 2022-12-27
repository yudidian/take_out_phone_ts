<template>
	<NavBar title="选择地址" left-text="返回" left-arrow @click-left="$router.back()" />
	<AddressList
		v-model="chooseId"
		:switchable="true"
		:list="addressList"
		default-tag-text="默认"
		add-button-text="确定"
		@add="addHandler"
		@select="selectHandler"
	/>
</template>
<script setup name="AddressChoose" lang="ts">
import { AddressList, NavBar, showNotify } from "vant";
import { onMounted, ref } from "vue";
import { getAddressList } from "@/api/module/address";
import { useRouter } from "vue-router";
import useCurrentInstance from "@/utils/useCurrentInstance";
import { AddAddressType, AddressListType } from "@/views/types/interface";
onMounted(() => {
	sendAddressList();
});
const { proxy } = useCurrentInstance();
const router = useRouter();
const addressList = ref<AddressListType[]>([]);
// 选中的id
const chooseId = ref("");
const chooseInfo = ref({});
const selectHandler = (item: any) => {
	chooseId.value = item.id;
	chooseInfo.value = item;
};
const addHandler = () => {
	proxy.$bus.emit("changeUserAddress", chooseInfo.value);
	router.back();
};
const sendAddressList = async () => {
	const res = await getAddressList<null, AddAddressType[]>();
	if (res.code !== 1) {
		return showNotify({
			type: "danger",
			message: res.msg
		});
	}
	if (res.info) {
		res.info.forEach(item => {
			addressList.value.push({
				id: item.id as string,
				name: item.consignee,
				tel: item.phone,
				address: item.provinceName + item.cityName + item.districtName + item.detail,
				isDefault: item.isDefault === 1
			});
			if (item.isDefault === 1) {
				chooseId.value = item.id as string;
			}
		});
		chooseInfo.value = addressList.value[0];
	}
};
</script>

<style scoped lang="scss">
:deep(.van-address-item__edit) {
	visibility: hidden;
}
</style>

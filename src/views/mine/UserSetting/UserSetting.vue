<template>
	<div class="user-setting">
		<NavBar title="用户信息编辑" left-arrow @click-left="$router.back()" />
		<Form @submit="onSubmit" class="form-wrapper">
			<CellGroup inset>
				<Field v-model="userInfo.name" name="name" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
				<Field name="radio" label="单选框" :rules="[{ required: true, message: '请选择性别' }]">
					<template #input>
						<RadioGroup v-model="userInfo.sex" direction="horizontal">
							<Radio name="0"> 男 </Radio>
							<Radio name="1"> 女 </Radio>
						</RadioGroup>
					</template>
				</Field>
				<Field name="uploader" label="文件上传" :rules="[{ required: true, message: '请上传头像' }]">
					<template #input>
						<Uploader v-model="fileList" multiple :before-read="beforeRead" :after-read="afterRead" :max-count="1" />
					</template>
				</Field>
			</CellGroup>
			<div style="margin: 16px">
				<Button round block type="primary" native-type="submit"> 提交 </Button>
			</div>
		</Form>
	</div>
</template>

<script setup name="UserSetting" lang="ts">
import { showToast, showSuccessToast, showFailToast, Uploader, Form, CellGroup, Button, Field, RadioGroup, Radio, NavBar } from "vant";
import { sendGetUserInfo, sendUploadImage, sendUploadUserInfo } from "@/api/module/user";
import { onMounted, ref } from "vue";
import { FileList } from "@/views/types/interface";
const userInfo = ref({
	name: "",
	sex: "0",
	avatar: ""
});
const BASE_URL = import.meta.env.VITE_LOCAL_SERVE_IMGE_URL;
const fileList = ref<Array<FileList>>([]);
onMounted(() => {
	getUserInfo();
});
const getUserInfo = async () => {
	const res = await sendGetUserInfo();
	if (res.code === 1) {
		userInfo.value = res.info;
		if (res.info.avatar) {
			fileList.value = [];
			fileList.value.push({
				url: BASE_URL + res.info.avatar
			});
		}
	} else {
		showFailToast("用户信息获取失败");
	}
};
const afterRead = async (file: { file: string | Blob }) => {
	const imgFile = new FormData();
	imgFile.append("fileType", "IMAGE");
	imgFile.append("file", file.file);
	const res = await sendUploadImage(imgFile);
	if (res.code === 1) {
		fileList.value = [];
		fileList.value.push({
			url: BASE_URL + res.msg
		});
		userInfo.value.avatar = res.msg;
		showSuccessToast("上传成功");
	} else {
		showFailToast("上传失败");
	}
};
const beforeRead = (file: { type: string | string[] }) => {
	if (!file.type.includes("image")) {
		showToast("请上传图片");
		return false;
	}
	return true;
};
const onSubmit = async () => {
	const res = await sendUploadUserInfo(userInfo.value);
	if (res.code === 1) {
		showSuccessToast(res.msg);
	} else {
		showFailToast(res.msg);
	}
};
</script>

<style scoped lang="scss">
.user-setting {
	.form-wrapper {
		margin-top: 20px;
	}
}
</style>

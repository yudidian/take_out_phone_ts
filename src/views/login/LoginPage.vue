<template>
	<div class="content">
		<div class="title">Koala</div>
		<Form @submit="onSubmit">
			<CellGroup inset>
				<Field
					v-model="form.email"
					:label-width="60"
					name="邮箱"
					label="邮箱"
					placeholder="请输入邮箱"
					:rules="[
						{ required: true, message: '请输入邮箱' },
						{ validator: validatorEmail, message: '请检查邮箱格式' }
					]"
				>
					<template #button>
						<Button :disabled="btnDisabled" size="small" type="primary" ref="code" block @click="sendCodeHandler"> 发送验证码 </Button>
					</template>
				</Field>
				<Field
					v-model="form.code"
					:label-width="60"
					name="验证码"
					label="验证码"
					placeholder="验证码"
					:rules="[
						{ required: true, message: '请填验证码' },
						{ validator: validatorCode, message: '验证码为6位' }
					]"
				/>
				<Field name="radio">
					<template #input>
						<p style="text-align: center; width: 100%">登录即表示您已阅读并同意<a href="javascript:;" @click="showTermsService">服务条款</a></p>
					</template>
				</Field>
			</CellGroup>
			<div style="margin: 16px">
				<Button round block type="primary" native-type="submit"> 登录 </Button>
			</div>
		</Form>
	</div>
</template>

<script setup name="LoginPage" lang="ts">
import { Form, Field, CellGroup, Button, showNotify, showDialog } from "vant";
import { onBeforeUnmount, reactive, ref } from "vue";
import { sendCode } from "@/api/module/user";
import { useStore } from "@/store";
import { LoginSendType } from "@/api/interface/SendType";

const store = useStore();
const time = ref(60);
const code = ref<HTMLElement | null>(null);
const btnDisabled = ref(true);
const form = reactive<LoginSendType>({
	email: "",
	code: ""
});
// 表单提交
const onSubmit = () => {
	store.dispatch("toLogin", form);
};
// 发送验证码
const sendCodeHandler = async () => {
	const res = await sendCode({
		email: form.email
	});
	if (res.code === 1) {
		showNotify({
			type: "success",
			message: "发送成功"
		});
		const timer = setInterval(() => {
			const dom = code.value as HTMLElement;
			if (time.value > 0) {
				time.value--;
				dom.innerText = time.value + "s";
			} else {
				clearInterval(timer);
				dom.innerText = "发送验证码";
			}
		}, 1000);
	} else {
		showNotify({
			type: "danger",
			message: res.msg
		});
	}
};
const validatorCode = (val: string) => {
	return /^[a-zA-z0-9]{6}$/.test(val);
};
const validatorEmail = (val: string) => {
	const res = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(val);
	btnDisabled.value = !res;
	return res;
};

const showTermsService = () => {
	showDialog({
		messageAlign: "left",
		title: "服务条款",
		message:
			"本服务条款及其下的服务受中华人民共和国法律管辖，并按之解释。\n" +
			"用户在此特别声明并承诺，用户已充分注意本服务协议内免除或限制koala责任的条款，用户完全知晓并理解该等条款的规定并同意接受。"
	});
};
// 组件销毁时清除所有定时器
onBeforeUnmount(() => {
	const lend: any = setInterval(() => {
		for (let i = 0; i < lend; i++) {
			clearInterval(i);
		}
	});
});
</script>

<style scoped lang="scss">
.content {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: url("../../assets/image/veer-402681504.jpg") no-repeat;
	background-size: cover;
	&::before {
		content: "";
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		backdrop-filter: blur(5px);
		z-index: 1;
	}
}
.title {
	position: absolute;
	top: 25%;
	z-index: 9;
	width: 100%;
	height: 40px;
	text-align: center;
	font-size: 36px;
	font-weight: 900;
	animation: tracking-in-contract 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.van-form {
	position: absolute;
	top: 40%;
	left: 50%;
	z-index: 9;
	width: 100%;
	height: 120px;
	transform: translate(-50%, -50%);
	margin-top: 20px;
	.van-cell-group {
		.van-field {
			:deep(.van-field__label) {
				display: flex;
				align-items: center;
			}
		}
	}
}
.van-overlay {
	display: flex;
	justify-content: center;
	align-items: center;
}
@keyframes tracking-in-contract {
	0% {
		letter-spacing: 1em;
		opacity: 0;
	}
	40% {
		opacity: 0.6;
	}
	100% {
		letter-spacing: normal;
		opacity: 1;
	}
}
</style>

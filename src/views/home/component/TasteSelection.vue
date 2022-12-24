<template>
	<teleport to="body" v-if="props.show">
		<div class="wrapper">
			<div class="content">
				<p class="title">
					{{ props.title }}
				</p>
				<div class="FlavorsList">
					<div class="FlavorsList-name" v-for="(flavor, f) in props.dish.FlavorsList" :key="flavor.id">
						<p class="name">
							{{ flavor.name }}
						</p>
						<ul class="FlavorsList-content">
							<li
								:class="item.active ? 'FlavorsList-item active' : 'FlavorsList-item'"
								v-for="(item, index) in FlavorsList[f]"
								:key="item.value"
								@click="chooseHandler(item, f, index)"
							>
								{{ item.value }}
							</li>
						</ul>
					</div>
				</div>
				<footer>
					<span class="price"> ￥{{ props.dish.price / 100 }} </span>
					<button class="btn" @click="addCart">加入购物车</button>
				</footer>
			</div>
		</div>
	</teleport>
</template>

<script setup name="TasteSelection" lang="ts">
import { watch, ref } from "vue";
import { Flavors, FlavorsList } from "@/views/home/interface/type";

const props = defineProps({
	title: {
		type: String,
		default: () => "自定义标题"
	},
	show: {
		type: Boolean,
		default: () => false
	},
	dish: {
		type: Object,
		default: () => {}
	}
});
const FlavorsList = ref<Array<Array<FlavorsList>>>([]);
const unWatch = watch(
	() => props.dish,
	val => {
		FlavorsList.value = val.FlavorsList.map((item: Flavors) => {
			return JSON.parse(item.value).map((v: string) => {
				return {
					value: v,
					active: false
				};
			});
		});
		unWatch();
	}
);
const chooseHandler = (item: FlavorsList, j: number, index: number) => {
	FlavorsList.value[j][index].active = true;
};
const addCart = () => {
	const flavorList = [];
	FlavorsList.value.forEach(item => {
		item.forEach(f => {
			if (f.active) {
				flavorList.push(f.value);
			}
		});
	});
};
</script>

<style scoped lang="scss">
.wrapper {
	position: fixed;
	top: 0;
	z-index: 99999;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(124, 122, 122, 0.5);
	.content {
		position: relative;
		width: 90vw;
		min-height: 200px;
		background-color: #ffffff;
		border-radius: 4px;
		box-shadow: 0 1px 8px #7e7d7d;
		.title {
			padding: 5px 0;
			font-weight: 900;
			font-size: 18px;
			text-align: center;
		}
		.FlavorsList {
			font-size: 14px;
			.FlavorsList-name {
				display: flex;
				flex-direction: column;
				.name {
					text-indent: 2em;
					margin-bottom: 4px;
				}
				.FlavorsList-content {
					display: flex;
					padding-left: 2em;
					margin-bottom: 4px;
					.FlavorsList-item {
						width: 60px;
						height: 25px;
						background-color: #ffffff;
						border: 1px solid #ffb200;
						margin-right: 10px;
						border-radius: 4px;
						text-align: center;
						line-height: 25px;
						font-weight: 700;
					}
					.active {
						background-color: #ffb200;
					}
				}
			}
		}
		footer {
			position: relative;
			bottom: 10px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-top: 20px;
			.price {
				width: 30px;
				height: 30px;
				padding: 0 10px;
				color: #f52d2d;
				font-size: 16px;
				font-weight: 900;
			}
			.btn {
				width: 120px;
				height: 30px;
				border-radius: 15px;
				line-height: 30px;
				border: none;
				font-size: 14px;
				margin-left: 160px;
				background-color: #ffb200;
			}
		}
	}
}
</style>

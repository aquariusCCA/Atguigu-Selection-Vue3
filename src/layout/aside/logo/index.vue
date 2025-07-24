<template>
	<div class="logo-container">
		<img :src="settings.logo" alt="logo" />
		<h1 v-show="!settingStore.fold">{{ settings.title }}</h1>
	</div>
</template>

<script lang="ts" setup>
import settings from '@/settings'
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.logo-container {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: $logo-height;
	padding-left: 14px;

	img {
		width: 40px;
	}

	h1 {
		font-size: 20px;
		margin-left: 10px;
		color: #fff;
	}
}
</style>

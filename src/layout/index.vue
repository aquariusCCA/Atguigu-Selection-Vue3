<template>
	<div class="layout-container">
		<div class="layout-aside" :class="settingStore.fold ? 'fold' : ''">
			<Aside></Aside>
		</div>
		<div class="layout-tabbar" :class="settingStore.fold ? 'fold' : ''">
			<Tabbar></Tabbar>
		</div>
		<div class="layout-main" :class="settingStore.fold ? 'fold' : ''">
			<Main></Main>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Aside from './aside/index.vue'
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.layout-container {
	height: 100vh;
	position: relative;

	.layout-aside {
		height: 100vh;
		width: $aside-width;
		background-color: $aside-color;
		transition: all 0.3s ease;

		&.fold {
			width: $aside-fold-width;
		}
	}

	.layout-tabbar {
		position: absolute;
		top: 0;
		left: $aside-width;
		height: $tabbar-height;
		width: calc(100vw - $aside-width);
		box-shadow: 0 0 1px;
		transition: all 0.3s ease;

		&.fold {
			width: calc(100vw - $aside-fold-width);
			left: $aside-fold-width;
		}
	}

	.layout-main {
		position: absolute;
		top: $tabbar-height;
		left: $aside-width;
		padding: 20px;
		height: calc(100vh - $tabbar-height);
		width: calc(100vw - $aside-width);
		overflow: auto;
		transition: all 0.3s ease;

		&.fold {
			width: calc(100vw - $aside-fold-width);
			left: $aside-fold-width;
		}
	}
}
</style>

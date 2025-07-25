<template>
	<Logo></Logo>
	<el-scrollbar>
		<el-menu
			background-color="#001529"
			text-color="#fff"
			:default-active="route.path"
			:collapse="settingStore.fold"
		>
			<Menu :menu-list="routes"></Menu>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts" setup name="Aside">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import { useUserStore } from '@/stores/modules/user'
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
// @ts-ignore
const { routes } = storeToRefs(userStore)
const settingStore = useSettingStore()
const route = useRoute()
</script>

<style scoped lang="scss">
.el-scrollbar {
	height: calc(100vh - $logo-height);

	.el-menu {
		border-right: none;
	}
}
</style>

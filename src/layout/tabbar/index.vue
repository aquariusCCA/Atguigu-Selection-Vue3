<template>
	<div class="tabbar-container">
		<div class="tabbar-left">
			<el-icon class="fold-menu-icon" @click="handleFold">
				<component :is="settingStore.fold ? 'Expand' : 'Fold'" />
			</el-icon>
			<el-breadcrumb separator=">">
				<el-breadcrumb-item v-for="x in route.matched" v-show="x.meta.name" :to="{ path: x.path }"
					:key="x.path">
					{{ x.meta.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="tabbar-right">
			<el-button icon="Refresh" circle @click="handleRefresh" />
			<el-button icon="FullScreen" circle @click="handleFullScreen" />
			<el-popover placement="bottom" title="设置" :width="150" trigger="click">
				<div style="margin-top: 10px">
					<span style="margin-right: 10px; font-size: 13px">主题颜色</span>
					<el-color-picker size="small" :teleported="false" v-model="settingStore.color" show-alpha
						:predefine="predefineColors" @change="handleColor" />
				</div>
				<div style="margin-top: 10px">
					<span style="margin-right: 10px; font-size: 13px">暗黑模式</span>
					<el-switch v-model="settingStore.dark" size="small" active-action-icon="Moon"
						inactive-action-icon="Sunny" @change="handleDark" />
				</div>
				<template #reference>
					<el-button icon="Setting" circle />
				</template>
			</el-popover>
			<!-- @vue-ignore -->
			<img class="avatar" :src="userStore.loginUser.avatar" alt="avatar" />
			<el-dropdown>
				<span class="el-dropdown-link">
					<!-- @vue-ignore -->
					{{ userStore.loginUser.name }}
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup name="Tabbar">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/stores/modules/setting'
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'
const route = useRoute()
const settingStore = useSettingStore()
const userStore = useUserStore()
const predefineColors = ref([
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
	'rgba(255, 69, 0, 0.68)',
	'rgb(255, 120, 0)',
	'hsv(51, 100, 98)',
	'hsva(120, 40, 94, 0.5)',
	'hsl(181, 100%, 37%)',
	'hsla(209, 100%, 56%, 0.73)',
	'#c7158577'
])

// 折叠菜单
const handleFold = () => {
	settingStore.changeFold()
}

// 刷新
const handleRefresh = () => {
	settingStore.changeRefresh()
}

// 全屏
const handleFullScreen = () => {
	if (document.fullscreenElement) {
		document.exitFullscreen()
	} else {
		document.documentElement.requestFullscreen()
	}
}

// 主题颜色
const handleColor = () => {
	settingStore.changeColor()
}

// 暗黑模式
const handleDark = () => {
	settingStore.changeDark()
}

// 退出登录
const handleLogout = async () => {
	await userStore.userLogout()
	router.push({ path: '/login' })
}
</script>

<style scoped lang="scss">
.tabbar-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.tabbar-left {
		display: flex;
		align-items: center;

		.fold-menu-icon {
			margin: 0 10px;
			cursor: pointer;
		}
	}

	.tabbar-right {
		display: flex;
		align-items: center;

		.avatar {
			width: 30px;
			height: 30px;
			margin: 0 10px;
			border-radius: 50%;
		}

		.el-dropdown-link {
			cursor: pointer;
			margin-right: 10px;
		}
	}
}
</style>

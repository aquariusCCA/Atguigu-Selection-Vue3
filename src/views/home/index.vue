<template>
	<div>
		<el-card class="home-card">
			<img :src="userStore.loginUser.avatar" alt="avatar" />
			<div>
				<h3>{{ `${getTime()}好！${userStore.loginUser.name}` }}</h3>
				<p>{{ settings.title }}</p>
			</div>
		</el-card>
		<div class="bg">
			<svg-icon name="welcome" :size="450"></svg-icon>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/modules/user'
import settings from '@/settings'
import { getTime } from '@/utils/date'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.home-card {
	:deep(.el-card__body) {
		display: flex;
		align-items: center;
	}

	img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-right: 15px;
	}

	div {
		h3 {
			font-size: 30px;
			font-weight: 700;
			margin-bottom: 10px;
		}

		p {
			color: deepskyblue;
		}
	}
}

.bg {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

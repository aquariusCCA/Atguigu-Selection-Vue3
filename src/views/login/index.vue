<template>
	<div class="login-container">
		<el-row>
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
					<h1>Hello</h1>
					<h2>欢迎来到硅谷甄选</h2>
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" type="text" :prefix-icon="User"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="loginForm.password"
							type="password"
							:prefix-icon="Lock"
							show-password
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="login-btn" type="primary" @click="toLogin" :loading="loading"
							>登录</el-button
						>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { Lock, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/date'
import router from '@/router'

const userStore = useUserStore()

let loginForm = ref({
	username: 'admin',
	password: '111111'
})

let loginFormRef = ref()

let loading = ref(false)

const toLogin = async () => {
	loading.value = true
	// 表单校验
	try {
		await loginFormRef.value.validate()
	} catch (e) {
		loading.value = false
		return
	}
	// 登录校验
	try {
		await userStore.userLogin(loginForm.value)
		loading.value = false
		router.push({ path: '/' })
		ElNotification({
			title: '登录成功',
			// @ts-ignore
			message: `${getTime()}好！欢迎你`,
			type: 'success'
		})
	} catch (e) {
		// @ts-ignore
		ElNotification({
			title: '登录失败',
			message: e,
			type: 'error'
		})
		loading.value = false
	}
}

// @ts-ignore
const validateUsername = (rule, value, callback) => {
	let reg = /^[A-Za-z]{3,11}$/
	if (reg.test(value)) {
		callback()
	} else {
		callback(new Error('用户名为3-11位英文字母'))
	}
}

// @ts-ignore
const validatePassword = (rule, value, callback) => {
	if (value.length >= 5) {
		callback()
	} else {
		callback(new Error('密码为5位以上任意字符'))
	}
}

let loginRules = {
	username: [{ validator: validateUsername }],
	password: [{ validator: validatePassword }]
}
</script>

<style scoped lang="scss">
.login-container {
	width: 100%;
	height: 100vh;
	background: url('@/assets/images/background.jpg') no-repeat;
	background-size: cover;

	.login-form {
		position: relative;
		top: 30vh;
		background: url('@/assets/images/login_form.png') no-repeat;
		background-size: cover;
		padding: 20px;
		margin: 0 20px;

		h1 {
			font-size: 40px;
			color: #fff;
		}

		h2 {
			font-size: 16px;
			color: #fff;
			margin: 10px 0;
		}

		.login-btn {
			width: 100%;
		}
	}
}
</style>

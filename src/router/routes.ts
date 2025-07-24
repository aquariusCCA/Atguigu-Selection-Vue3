// 常量路由
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'Login',
		meta: {
			name: '登录',
			hidden: true,
			icon: '',
		}
	}
]
import SvgIcon from '@/components/SvgIcon/index.vue'
import Title from '@/components/Title/index.vue'
import type { Component, App } from 'vue'

// element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 自定义图标
const globalComponents: { [name: string]: Component } = {
	SvgIcon,
	Title
}

// 注册全局组件
export default {
	install(app: App) {
		// 全局注册element-plus图标
		for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
			app.component(key, component)
		}

		// 全局注册自定义图标
		Object.keys(globalComponents).forEach((key: string) => {
			app.component(key, globalComponents[key])
		})
	}
}

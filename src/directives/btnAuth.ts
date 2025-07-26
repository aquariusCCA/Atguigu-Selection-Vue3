import type { App } from 'vue'
import pinia from '@/stores'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore(pinia)

export default {
	install(app: App) {
		app.directive('btn-auth', {
			mounted(el, binding) {
                // @ts-ignore
				if (!userStore.loginUser.buttons.includes(binding.value)) {
                    el.parentNode.removeChild(el)
				}
			}
		})
	}
}

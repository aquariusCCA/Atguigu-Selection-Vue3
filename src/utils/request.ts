import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from '@/stores/user'

export enum ApiMode {
  TEST = "test",
  PROD = "",
}

/** 是否為開發／測試模式 */
const isTestMode = import.meta.env.DEV;

const request = axios.create({
  baseURL: import.meta.env.VITE_SERVER, //配置统一的接口地址前缀
  timeout: 8000,
});

/** 統一注入測試參數 */
function injectTestParams(config: AxiosRequestConfig) {
  if (!isTestMode) return;

  const marker = { mode: ApiMode.TEST };
  const method = (config.method ?? "get").toLowerCase();

  // POST / PUT / PATCH / DELETE：把 mode 放到 body
  if (["post", "put", "patch", "delete"].includes(method)) {
    config.data = {
      ...((config.data as object) || {}),
      ...marker,
    };
  }
  // 其餘方法：放到 query params
  else {
    config.params = {
      ...((config.params as object) || {}),
      ...marker,
    };
  }
}

//添加请求拦截器
request.interceptors.request.use((config) => {
  injectTestParams(config);
  	const userStore = useUserStore()
	if (userStore.token) {
		config.headers.token = userStore.token
	}
  return config;
});

// 添加相应拦截器
request.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		console.error("request error: ", error);
		let msg = ''
		const status = error.response.status
		switch (status) {
			case 401:
				msg = 'token过期'
				break
			case 403:
				msg = '无权访问'
				break
			case 404:
				msg = '请求未找到'
				break
			case 500:
				msg = '服务器错误'
				break
			default:
				msg = '没有网络'
		}
		ElMessage({
			type: 'error',
			message: msg
		})
		return Promise.reject(error)
	}
)

export default request;

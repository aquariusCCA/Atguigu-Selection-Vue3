// 登录类型
export interface LoginFormData {
	username: string
	password: string
}

// 统一返回类型
export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

// 登录返回类型
export interface LoginRespData extends ResponseData {
	data: string
}

// 获取用户信息返回类型
export interface UserInfoRespData extends ResponseData {
	data: {
		name: string
		avatar: string
		roles: string[]
		routes: string[]
		buttons: string[]
	}
}
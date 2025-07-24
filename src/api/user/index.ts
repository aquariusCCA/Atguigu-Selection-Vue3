import request from '@/utils/request'
import type { LoginFormData, LoginRespData } from './type'

enum API {
	LOGIN_URL = '/admin/acl/index/login',
}

export const reqLogin = (data: LoginFormData) =>
	request.post<any, LoginRespData>(API.LOGIN_URL, data)
import request from '@/utils/request'
import type { MenuListResponseData, MenuParams } from './type'

enum API {
	MENU_LIST_URL = '/admin/acl/permission',
	MENU_SAVE_URL = '/admin/acl/permission/save',
	MENU_UPDATE_URL = '/admin/acl/permission/update',
	MENU_DELETE_URL = '/admin/acl/permission/remove'
}

export const reqMenuList = () => request.get<any, MenuListResponseData>(API.MENU_LIST_URL)

export const reqMenuAddOrUpdate = (data: MenuParams) => {
	if (data.id) {
		return request.put<any, any>(API.MENU_UPDATE_URL, data)
	} else {
		return request.post<any, any>(API.MENU_SAVE_URL, data)
	}
}

export const reqMenuRemove = (id: number) =>
	request.delete<any, any>(API.MENU_DELETE_URL + `/${id}`)

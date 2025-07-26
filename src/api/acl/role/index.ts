import request from '@/utils/request'
import type {
	QueryRoleParams,
	ResponseData,
	Role,
	RoleListResponseData,
	RoleMenuListResponseData
} from './type'

enum API {
	ROLE_LIST_URL = '/admin/acl/role',
	ROLE_SAVE_URL = '/admin/acl/role/save',
	ROLE_UPDATE_URL = '/admin/acl/role/update',
	ROLE_REMOVE_URL = '/admin/acl/role/remove',
	ROLE_MENU_LIST_URL = '/admin/acl/permission/toAssign',
	ROLE_SET_MENU_URL = '/admin/acl/permission/doAssign'
}

export const reqRoleList = (params: QueryRoleParams) =>
	request.get<any, RoleListResponseData>(API.ROLE_LIST_URL + `/${params.page}/${params.limit}`, {
		params: {
			roleName: params.roleName ? params.roleName : undefined
		}
	})

export const reqRoleSaveOrUpdate = (params: Role) =>
	request<any, ResponseData>({
		url: params.id ? API.ROLE_UPDATE_URL : API.ROLE_SAVE_URL,
		method: params.id ? 'put' : 'post',
		data: params
	})

export const reqRoleRemove = (id: number) =>
	request.delete<any, ResponseData>(API.ROLE_REMOVE_URL + `/${id}`)

export const reqRoleMenuList = (id: number) =>
	request.get<any, RoleMenuListResponseData>(API.ROLE_MENU_LIST_URL + `/${id}`)

export const reqSetMenu = (id: number, checkedMenuIds: number[]) =>
	request.post<any, ResponseData>(
		API.ROLE_SET_MENU_URL + `?roleId=${id}&permissionId=${checkedMenuIds}`
	)

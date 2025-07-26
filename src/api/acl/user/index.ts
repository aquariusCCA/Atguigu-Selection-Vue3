import request from '@/utils/request.ts'
import type {
	UserQueryParams,
	UserListResponseData,
	User,
	ResponseData,
	RoleListResponseData
} from './type'

enum API {
	USER_LIST_URL = '/admin/acl/user',
	USER_SAVE_URL = '/admin/acl/user/save',
	USER_UPDATE_URL = '/admin/acl/user/update',
	DELETE_URL = '/admin/acl/user/remove',
	DELETEBATCH_URL = '/admin/acl/user/batchRemove',
	ROLE_LIST_URL = '/admin/acl/user/toAssign',
	ROLE_ASSIGN_URL = '/admin/acl/user/doAssignRole'
}

export const reqUserList = (params: UserQueryParams) =>
	request.get<any, UserListResponseData>(API.USER_LIST_URL + `/${params.page}/${params.limit}`, {
		params: {
			username: params.username ? params.username : undefined
		}
	})

export const reqUserSaveOrUpdate = (params: User) =>
	request<any, ResponseData>({
		url: params.id ? API.USER_UPDATE_URL : API.USER_SAVE_URL,
		method: params.id ? 'put' : 'post',
		data: params
	})

export const reqUserDelete = (id: number) => request.delete<any, any>(API.DELETE_URL + `/${id}`)

export const reqUserDeleteBatch = (ids: number[]) =>
	request.delete<any, any>(API.DELETEBATCH_URL, {
		data: ids
	})

export const reqRoleList = (id: number) =>
	request.get<any, RoleListResponseData>(API.ROLE_LIST_URL + `/${id}`)

export const reqSetUserRole = (roleIds: number[], id: number) =>
	request.post<any, ResponseData>(API.ROLE_ASSIGN_URL, {
		roleIdList: roleIds,
		userId: id
	})

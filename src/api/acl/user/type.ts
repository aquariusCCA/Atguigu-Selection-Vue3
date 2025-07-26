export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface User {
	id?: number
	createTime?: string
	updateTime?: string
	username: string
	password: string
	name: string
	roleName?: string
}

export interface UserListResponseData extends ResponseData {
	data: {
		records: User[]
		total: number
	}
}

export interface UserQueryParams {
	page: number
	limit: number
	username?: string | undefined
}

export interface Role {
	id: number
	createTime: string
	updateTime: string
	roleName: string
	remark: boolean
}

export interface RoleListResponseData extends ResponseData {
	data: {
		assignRoles: Role[]
		allRolesList: Role[]
	}
}

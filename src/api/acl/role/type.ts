export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface Role {
	id?: number
	createTime?: string
	updateTime?: string
	roleName: string
	remark?: boolean
}

export interface RoleListResponseData extends ResponseData {
	data: {
		records: Role[]
		total: number
	}
}

export interface QueryRoleParams {
	page: number
	limit: number
	roleName?: string
}

export interface Menu {
	id: number
	pid: number
	name: string
	type: number
	level: number
	select: boolean
	children: Menu[]
}

export interface RoleMenuListResponseData extends ResponseData {
	data: Menu[]
}

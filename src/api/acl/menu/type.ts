export interface ResponseData {
	code: number
	message: string
	ok: boolean
}

export interface Menu {
	id?: number
	createTime: string
	updateTime: string
	pid: number
	name: string
	code: null
	toCode: null
	type: number
	status: null
	level: number
	children?: Menu[]
	select: boolean
}

export interface MenuListResponseData extends ResponseData {
	data: Menu[]
}

export interface MenuParams {
	id?: number
	code: string
	level: number
	name: string
	pid: number
}

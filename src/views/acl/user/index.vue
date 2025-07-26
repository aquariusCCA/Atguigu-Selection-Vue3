<template>
	<div>
		<!-- 查询 -->
		<el-card class="query">
			<el-form inline>
				<el-form-item label="用户名：">
					<el-input placeholder="请输入用户名" v-model="queryParams.username"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">搜索</el-button>
					<el-button @click="refresh">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<!-- 列表 -->
		<el-card>
			<el-button v-btn-auth="'btn.User.add'" type="primary" @click="handleAdd">添加用户</el-button>
			<el-popconfirm
				width="250"
				confirm-button-text="删除"
				cancel-button-text="取消"
				icon="Delete"
				:title="`确认要批量删除：${batchDelUsers.map(x => x.username).join(',')} 吗？`"
				@confirm="handleDeleteBatch"
			>
				<template #reference>
					<el-button type="danger" :disabled="batchDelUsers.length == 0">批量删除</el-button>
				</template>
			</el-popconfirm>

			<el-table :data="userList" border @selection-change="handleSelectionChange">
				<el-table-column type="selection" />
				<el-table-column type="index" label="No" />
				<el-table-column prop="id" label="ID" width="80" />
				<el-table-column prop="username" label="用户名" />
				<el-table-column prop="name" label="昵称" />
				<el-table-column prop="roleName" label="角色" show-overflow-tooltip />
				<el-table-column prop="updateTime" label="更新时间" />
				<el-table-column label="操作" width="280">
					<template #default="{ row }">
						<el-button size="small" type="primary" icon="User" @click="handleRole(row)"
							>分配角色</el-button
						>
						<el-button size="small" type="primary" icon="Edit" @click="handleEdit(row)"
							>编辑</el-button
						>
						<el-popconfirm
							width="250"
							confirm-button-text="删除"
							cancel-button-text="取消"
							icon="Delete"
							:title="`确认要删除${row.username}吗？`"
							@confirm="handleDelete(row)"
						>
							<template #reference>
								<el-button size="small" icon="Delete" type="danger">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination
				v-model:current-page="queryParams.page"
				v-model:page-size="queryParams.limit"
				:total="total"
				:page-sizes="[5, 10, 20, 30]"
				layout="prev, pager, next, jumper,->,sizes,total"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</el-card>

		<!-- 添加用户 / 修改用户 -->
		<el-drawer v-model="drawer">
			<template #header>
				<h4>{{ title }}</h4>
			</template>
			<template #default>
				<el-form :model="userForm" :rules="rules" ref="userFormRef">
					<el-form-item prop="username" label="用户名" label-width="70px">
						<el-input v-model="userForm.username"></el-input>
					</el-form-item>
					<el-form-item prop="name" label="昵称" label-width="70px">
						<el-input v-model="userForm.name"></el-input>
					</el-form-item>
					<el-form-item v-if="!userForm.id" prop="password" label="密码" label-width="70px">
						<el-input v-model="userForm.password" type="password" show-password></el-input>
					</el-form-item>
				</el-form>
			</template>
			<template #footer>
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</template>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import {
	reqUserList,
	reqUserSaveOrUpdate,
	reqUserDelete,
	reqUserDeleteBatch,
	reqRoleList,
	reqSetUserRole
} from '@/api/acl/user/index.ts'
import { ElMessage } from 'element-plus'
import type { User, Role } from '@/api/acl/user/type.ts'

const batchDelUsers = ref<User[]>([])
const total = ref(0)
const title = ref('添加用户')
const drawer = ref(false)
const drawerRole = ref(false)
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedRoleIds = ref<number[]>([])
const roleList = ref<Role[]>([])
const userList = ref<User[]>([])
const queryParams = reactive({
	page: 1,
	limit: 5,
	username: undefined
})
const userForm = reactive<User>({
	id: undefined,
	name: '',
	username: '',
	password: ''
})
const userFormRef = ref()
const rules = {
	name: { required: true, min: 3, max: 6, message: '请输入3-6位用户名', trigger: 'blur' },
	username: { required: true, min: 3, max: 6, message: '请输入3-6位昵称', trigger: 'blur' },
	password: { required: true, min: 6, max: 8, message: '请输入6-8位密码', trigger: 'blur' }
}
const userRoleForm = reactive({
	userId: 0,
	username: ''
})

onMounted(async() => {
	await getUserList()
})

const getUserList = async (page = 1) => {
	queryParams.page = page
	const result = await reqUserList(queryParams)
	if (result.code == 200) {
		userList.value = result.data.records
		total.value = result.data.total
	} else {
		ElMessage.error(result.message)
	}
}

const search = () => {
	queryParams.page = 1
	getUserList()
}

const refresh = () => {
	queryParams.page = 1
	queryParams.username = undefined
	getUserList()
}

const handleAdd = () => {
	title.value = '添加用户'
	drawer.value = true
	userFormRef.value?.clearValidate()
	Object.assign(userForm, {
		id: undefined,
		name: '',
		username: '',
		password: ''
	})
}

const handleEdit = (row: User) => {
	title.value = '修改用户'
	drawer.value = true
	userFormRef.value?.clearValidate()
	Object.assign(userForm, row)
}

const cancel = () => {
	drawer.value = false
}

const confirm = async () => {
	try {
		await userFormRef.value?.validate()
		const result = await reqUserSaveOrUpdate(userForm)
		if (result.code == 200) {
			drawer.value = false
			getUserList(userForm.id ? queryParams.page : 1)
			ElMessage.success(userForm.id ? '修改成功' : '添加成功')
		} else {
			ElMessage.error(userForm.id ? '修改失败' : '添加失败')
		}
	} catch (e) { }
}

const handleDeleteBatch = async () => {
	let ids = batchDelUsers.value.map(user => user.id)
	const result = await reqUserDeleteBatch(ids as number[])
	if (result.code == 200) {
		ElMessage.success('删除成功')
		getUserList(userList.value.length > 1 ? queryParams.page : queryParams.page - 1)
	} else {
		ElMessage.error('删除失败')
	}
}

const handleSelectionChange = (val: User[]) => {
	batchDelUsers.value = val
}

const handleRole = async (row: User) => {
	drawerRole.value = true
	userRoleForm.userId = row.id as number
	userRoleForm.username = row.username
	const result = await reqRoleList(row.id as number)
	if (result.code == 200) {
		roleList.value = result.data.allRolesList
		checkedRoleIds.value = result.data.assignRoles.map(x => x.id)

		let allRoleCount = result.data.allRolesList.length
		let checkedRoleCount = result.data.assignRoles.length
		checkAll.value = allRoleCount > 0 && allRoleCount == checkedRoleCount
		isIndeterminate.value = checkedRoleCount > 0 && checkedRoleCount < allRoleCount
	} else {
		ElMessage.error('获取角色失败')
	}
}

const handleDelete = async (row: User) => {
	const result = await reqUserDelete(row.id as number)
	if (result.code == 200) {
		ElMessage.success('删除成功')
		getUserList(userList.value.length > 1 ? queryParams.page : queryParams.page - 1)
	} else {
		ElMessage.error('删除失败')
	}
}

const handleSizeChange = (val: number) => {
	getUserList()
}

const handleCurrentChange = (page: number) => {
	getUserList(page)
}
</script>

<style scoped lang="scss">
.query {
	margin-bottom: 15px;

	.el-form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}

.el-table {
	margin: 15px 0;
}
</style>

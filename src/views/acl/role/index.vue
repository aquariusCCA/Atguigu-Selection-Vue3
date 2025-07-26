<template>
	<div>
		<el-card class="query">
			<el-form inline class="query-form">
				<el-form-item label="角色名：">
					<el-input v-model="queryRoleParams.roleName" placeholder="请输入角色名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getRoleList()">搜索</el-button>
					<el-button @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card>
			<el-button type="primary" icon="Plus" @click="addRole">添加角色</el-button>
			<el-table border :data="roleList">
				<el-table-column type="index" label="No"></el-table-column>
				<el-table-column label="ID" prop="id" width="120"></el-table-column>
				<el-table-column label="角色名" prop="roleName"></el-table-column>
				<el-table-column label="创建时间" prop="createTime"></el-table-column>
				<el-table-column label="更新时间" prop="updateTime"></el-table-column>
				<el-table-column label="操作" width="300">
					<template #default="{ row }">
						<el-button type="primary" icon="User" size="small" @click="assignMenu(row)">分配权限</el-button>
						<el-button type="primary" icon="Edit" size="small" @click="editRole(row)">编辑</el-button>
						<el-popconfirm :title="`确认要删除${row.roleName}吗？`" @confirm="deleteRole(row)">
							<template #reference>
								<el-button type="danger" icon="Delete" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				v-model:current-page="queryRoleParams.page"
				v-model:page-size="queryRoleParams.limit"
				:page-sizes="[5, 10, 20, 30, 50]"
				background
				layout="prev,pager,next,jumper,->,sizes,total"
				:total="total"
				@size-change="getRoleList(1)"
				@current-change="getRoleList"
			/>
		</el-card>

		<!-- 添加角色 / 修改角色 -->
		<el-dialog v-model="visibleDialog" :title="title" width="70%">
			<el-form :model="roleForm" :rules="rules" ref="roleFormRef">
				<el-form-item label="角色名" prop="roleName">
					<el-input v-model="roleForm.roleName"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</template>
		</el-dialog>

		<!-- 分配菜单权限 -->
		<el-drawer v-model="drawer" size="70%" direction="rtl">
			<template #header>
				<h4>分配菜单权限</h4>
			</template>
			<template #default>
				<el-tree ref="roleTreeRef" :data="menuTree" show-checkbox node-key="id" :default-expand-all="true"
					:default-checked-keys="checkedMenuIds" :props="{
						children: 'children',
						label: 'name'
					}" />
			</template>
			<template #footer>
				<el-button @click="cancelAssignMenu">取消</el-button>
				<el-button type="primary" @click="confirmAssignMenu">确定</el-button>
			</template>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import {
	reqRoleList,
	reqRoleSaveOrUpdate,
	reqRoleMenuList,
	reqRoleRemove,
	reqSetMenu
} from '@/api/acl/role'
import { ElMessage } from 'element-plus'
import type { Menu, Role } from '@/api/acl/role/type'

const total = ref(0)
const title = ref('添加角色')
const drawer = ref(false)
const visibleDialog = ref(false)
const roleTreeRef = ref()
const menuTree = ref<Menu[]>([])
const checkedMenuIds = ref([])
const roleId = ref(0)
const roleList = ref<Role[]>([])
const roleForm = reactive({
	id: 0,
	roleName: ''
})
const roleFormRef = ref()
const queryRoleParams = reactive({
	page: 1,
	limit: 5,
	roleName: ''
})
const rules = {
	roleName: { required: true, min: 3, message: '请输入三个字符以上的角色名', trigger: 'blur' }
}

onMounted(async () => {
	await getRoleList()
})

const reset = () => {
	queryRoleParams.roleName = ''
	getRoleList()
}


const getRoleList = async (page = 1) => {
	queryRoleParams.page = page
	const result = await reqRoleList(queryRoleParams)
	if (result.code == 200) {
		roleList.value = result.data.records
		total.value = result.data.total
	} else {
		ElMessage.error(result.message)
	}
}

const addRole = () => {
	title.value = '添加角色'
	visibleDialog.value = true
	roleForm.roleName = ''
	roleFormRef.value?.clearValidate()
}

const cancel = () => {
	visibleDialog.value = false
}

const confirm = async () => {
	try {
		await roleFormRef.value.validate()
		const result = await reqRoleSaveOrUpdate(roleForm)
		if (result.code == 200) {
			ElMessage.success(roleForm.id ? '修改成功' : '新增成功')
			getRoleList(roleForm.id ? queryRoleParams.page : 1)
			visibleDialog.value = false
		} else {
			ElMessage.error(roleForm.id ? '修改失败' : '新增失败')
		}
	} catch (e) { }
}

const assignMenu = async (row: Role) => {
	const result = await reqRoleMenuList(row.id as number)
	if (result.code == 200) {
		roleId.value = row.id as number
		menuTree.value = result.data
		checkedMenuIds.value = []
		filterCheckedNodes(result.data, checkedMenuIds.value)
	}
	drawer.value = true
}

const filterCheckedNodes = (menuList: Menu[], checkMenuIds: number[]) => {
	menuList.forEach(menu => {
		if (menu.select && menu.level == 4) {
			checkMenuIds.push(menu.id)
		}
		if (menu.children && menu.children.length > 0) {
			filterCheckedNodes(menu.children, checkMenuIds)
		}
	})
}

const editRole = (row: Role) => {
	title.value = '修改角色'
	visibleDialog.value = true
	roleForm.id = row.id as number
	roleForm.roleName = row.roleName
	roleFormRef.value?.clearValidate()
}

const deleteRole = async (row: Role) => {
	const result = await reqRoleRemove(row.id as number)
	if (result.code == 200) {
		getRoleList(roleList.value.length > 1 ? queryRoleParams.page : queryRoleParams.page - 1)
		ElMessage.success('删除成功')
	} else {
		ElMessage.error(result.message)
	}
}

const cancelAssignMenu = () => {
	drawer.value = false
}


const confirmAssignMenu = async () => {
	try {
		let checkedIds = roleTreeRef.value.getCheckedNodes(false, true).map((x: Role) => x.id)
		const result = await reqSetMenu(roleId.value, checkedIds)
		if (result.code == 200) {
			ElMessage.success('分配成功')
			drawer.value = false
		} else {
			ElMessage.error(result.message)
		}
	} catch (e) {}
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

<template>
	<div>
		<el-table :data="menuTree" row-key="id" border default-expand-all max-height="600px">
			<el-table-column prop="name" label="名称" />
			<el-table-column prop="code" label="权限值" />
			<el-table-column prop="updateTime" label="修改时间" />
			<el-table-column label="操作">
				<template #default="{ row }">
					<el-button :disabled="row.level == 4" size="small" type="primary" @click="addMenu(row)">
						<span>{{ row.level == 3 ? '添加按钮' : '添加菜单' }}</span>
					</el-button>
					<el-button :disabled="row.level == 1" size="small" type="primary"
						@click="editMenu(row)">编辑</el-button>
					<el-popconfirm :title="`确认要删除${row.name}吗？`" @confirm="deleteMenu(row)">
						<template #reference>
							<el-button :disabled="row.level == 1" size="small" type="danger">删除</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>


		<el-dialog v-model="visibleDialog" :title="title" width="70%">
			<el-form :model="menuForm" :rules="rules" ref="menuFormRef">
				<el-form-item label="菜单名：" prop="name">
					<el-input v-model="menuForm.name"></el-input>
				</el-form-item>
				<el-form-item label="权限值：" prop="code">
					<el-input v-model="menuForm.code"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import type { Menu, MenuParams } from '@/api/acl/menu/type'
import { reqMenuList, reqMenuAddOrUpdate, reqMenuRemove } from '@/api/acl/menu'
import { ElMessage } from 'element-plus'

const visibleDialog = ref(false)
const title = ref('添加菜单')
const menuFormRef = ref()
const menuTree = ref<Menu[]>([])
const menuForm = reactive<MenuParams>({
	id: undefined,
	code: '',
	name: '',
	level: 0,
	pid: 0
})
const rules = {
	name: { required: true, message: '请输入菜单名', trigger: 'blur' },
	code: { required: true, message: '请输入权限值', trigger: 'blur' }
}

onMounted(async () => {
	await getMenuTree()
})

const getMenuTree = async () => {
	const result = await reqMenuList()
	console.log(result)
	if (result.code == 200) {
		menuTree.value = result.data
	} else {
		ElMessage.error(result.message)
	}
}

const addMenu = (row: Menu) => {
	visibleDialog.value = true
	title.value = '添加菜单'
	Object.assign(menuForm, {
		id: undefined,
		code: '',
		name: '',
		level: row.level + 1,
		pid: row.id
	})
	menuFormRef.value.clearValidate()
}

const editMenu = (row: Menu) => {
	visibleDialog.value = true
	title.value = '编辑菜单'
	Object.assign(menuForm, row)
	menuFormRef.value.clearValidate()
}

const deleteMenu = async (row: Menu) => {
	const result = await reqMenuRemove(row.id as number)
	if (result.code == 200) {
		ElMessage.success('删除成功')
		getMenuTree()
	} else {
		ElMessage.error(result.message)
	}
}

const cancel = () => {
	visibleDialog.value = false
}

const confirm = async () => {
	try {
		await menuFormRef.value.validate()
		const result = await reqMenuAddOrUpdate(menuForm)
		if (result.code == 200) {
			ElMessage.success(menuForm.id ? '修改成功' : '添加成功')
			visibleDialog.value = false
			getMenuTree()
		} else {
			ElMessage.error(result.message)
		}
	} catch (e) {}
}
</script>

<style scoped lang="scss"></style>
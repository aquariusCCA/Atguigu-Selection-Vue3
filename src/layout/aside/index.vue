<template>
  <Logo />
  <el-scrollbar>
    <el-menu
      background-color="#111827"
      text-color="#FFFFFF"
      :default-active="route.path"
      :collapse="settingStore.fold"
      :router="true"
    >
      <Menu :menu-list="routes" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup name="Aside">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import { useUserStore } from '@/stores/modules/user'
import { useSettingStore } from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { routes } = storeToRefs(userStore)
const settingStore = useSettingStore()
const route = useRoute()
</script>

<style scoped lang="scss">
$item-hover-bg: pink;
$item-active-bg: orange;

.el-scrollbar {
  height: calc(100vh - $logo-height);

  .el-menu {
    border-right: none;
  }
}
</style>

<template>
  <RouterView></RouterView>
</template>

<script lang="ts" setup name="App">
import { RouterView } from 'vue-router'
import { watch } from 'vue'
import { useSettingStore } from './stores/setting'
const settingStore = useSettingStore()

// 监听主题颜色、暗黑模式设置的变化
watch(
  [() => settingStore.dark, () => settingStore.color],
  val => {
    let html = document.documentElement
    let [dark, color] = val
    html.className = dark ? 'dark' : ''
    html.style.setProperty('--el-color-primary', color)
  },
  { immediate: true }
)
</script>
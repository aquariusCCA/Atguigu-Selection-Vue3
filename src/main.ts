import { createApp } from "vue";

// 引入pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入全局组件
import GlobalComponents from '@/components/index.ts'

// 引入svg
import 'virtual:svg-icons-register'

// 引入styles
import '@/styles/index.scss'

// 引入进度条nprogress样式
import 'nprogress/nprogress.css'

// 引入假資料
import { worker } from "./mocks/browser";
import { setSeeds } from "@/mocks/seeds";

// 引入permission
import '@/router/permission'

// 開發環境可使用API假資料
if (import.meta.env.DEV) {
  console.log("這是開發環境，將使用假資料API");
  // 注入假資料
  setSeeds();

  // 啟動 MSW 假資料服務
  worker.start({
    onUnhandledRequest: "bypass", // 不顯示任何警告，直接放行
  });
}

const app = createApp(App);

const pinia = createPinia(); 
pinia.use(piniaPluginPersistedstate) // 引入持久化插件
app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: zhTw,
});
app.use(GlobalComponents);

app.mount("#app");

import { createApp } from "vue";

// 引入pinia
import pinia from "./stores/index.ts";

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

// 引入自定义指令
import BtnAuth from './directives/btnAuth.ts'

// 開發環境可使用API假資料
if (import.meta.env.DEV) {
  console.log("這是開發環境，將使用假資料API");
  // 注入假資料
  setSeeds();

  // 啟動 MSW 假資料服務
  await worker.start({
    onUnhandledRequest: "bypass", // 不顯示任何警告，直接放行
  });
}

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: zhTw,
});
app.use(GlobalComponents);
app.use(BtnAuth);

app.mount("#app");

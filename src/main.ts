import { createApp } from "vue";
import { createPinia } from "pinia";

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

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhTw,
});
app.use(GlobalComponents);

app.mount("#app");

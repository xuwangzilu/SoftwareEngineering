import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router'

import TopNav from './components/TopNav'
import axios from 'axios'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios);
app.component("top-nav",TopNav)
app.mount('#app')
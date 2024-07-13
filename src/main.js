import './assets/main.css'
import router from '../router/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).use(router).mount('#app')

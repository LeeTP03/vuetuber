import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Watch from '@/views/WatchView.vue'
import Channel from '@/views/ChannelView.vue'
import Archive from '@/views/ArchiveView.vue'

const routes = [
    {path: '/', name:'Home', component: Home},
    {path: '/about', name:'About', component: About},
    {path: '/watch/:id', name:'Watch', component: Watch},
    {path: '/channel/:id', name:'Channel', component: Channel},
    {path: '/channel/:id/description', name:'ChannelDescription', component: Channel},
    {path: '/archive', name:'Archive', component: Archive},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
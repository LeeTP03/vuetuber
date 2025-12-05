<script setup>
import VideoLook from './VideoLook.vue';
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

const data = ref(null)
const isLoaded = ref(false)
const fetchData = async () => {
  await axios.get('https://sadly-oriented-husky.ngrok-free.app/video/upcoming?limit=0', {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    })
    .then(response => {
      // Store the response data in the ref
      data.value = response.data
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })

    nextTick(() => {
    isLoaded.value = true
  })
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <div v-if="isLoaded && data && data.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <VideoLook v-for="video in data" :key="video.id" :data="video" />
  </div>
  <div v-else-if="isLoaded && (!data || data.length === 0)" class="text-center py-12">
    <p class="text-gray-400 text-lg">No upcoming streams scheduled</p>
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div v-for="i in 8" :key="i" class="animate-pulse">
      <div class="bg-gray-800 rounded-xl aspect-video mb-3"></div>
      <div class="flex gap-3 px-1">
        <div class="w-10 h-10 bg-gray-800 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-800 rounded w-3/4"></div>
          <div class="h-3 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
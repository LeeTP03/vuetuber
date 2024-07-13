<script setup>
import VideoLook from './VideoLook.vue';
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

const data = ref(null)
const isLoaded = ref(false)

const fetchData = async () => {
  await axios.get('https://sadly-oriented-husky.ngrok-free.app/video/complete?limit=20', {
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
    <div v-if="isLoaded" class="w-screen flex flex-wrap justify-left p-4">
        <div v-for="video in data" :key="video.id">
            <VideoLook :data=video />
        </div>
    </div>
</template>
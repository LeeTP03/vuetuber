<script setup>
import LiveVideoItem from './LiveVideoItem.vue';
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

const isLoaded = ref(false)
const data = ref(null)

const fetchData = async () => {
  await axios.get('https://sadly-oriented-husky.ngrok-free.app/video/live?limit=0', {
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
  
    <div v-if="isLoaded" class="w-screen flex flex-wrap justify-center p-4 gap-2">
        <div v-for="video in data" :key="video.id">
            <LiveVideoItem :data=video />
        </div>
    </div>
</template>
<script setup>
import VideoLook from './VideoLook.vue';
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

const data = ref(null)
const amountOfVideos = ref(null)
const isLoaded = ref(false)
const buttonArray = ref(null)

const showContent = async (n) => {
  fetchData(n)
}

const setButtonArray = () => {
  let array = []
  for (let i = 1; i <= Math.ceil(amountOfVideos.value / 50); i++) {
    array.push(i)
  }
  buttonArray.value = array
}

const fetchData = async (n) => {
  await axios.get(`https://sadly-oriented-husky.ngrok-free.app/video/complete?page=${n}`, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    })
    .then(response => {
      // Store the response data in the ref
      data.value = response.data.filteredItems
      amountOfVideos.value = response.data.total_amount

    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })

    nextTick(() => {
    isLoaded.value = true
  })
}

onMounted(async () => {
  await fetchData()
  setButtonArray()
})

</script>

<template>
    <div v-if="isLoaded" class="flex flex-wrap justify-center ">
        <div v-for="video in data" :key="video.id">
            <VideoLook :data=video />
        </div>
    </div>
    <div>
      <div v-if="amountOfVideos" class="flex flex-row justify-center items-center gap-2">
            <div  v-for="number in buttonArray.slice(0,5)" :key="number">
                <router-link :to="`/archive?page=${number}`">
                    <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showContent(number)">{{ number }}</button>
                </router-link>
            </div>
            ...
            <div  v-for="number in buttonArray.slice(-5)" :key="number">
                <router-link :to="`/archive?page=${number}`">
                    <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showContent(number)">{{ number }}</button>
                </router-link>
            </div>
        </div>  
    </div>
</template>
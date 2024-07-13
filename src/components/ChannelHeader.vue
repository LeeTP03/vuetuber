<script setup>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';
import ChannelNav from './ChannelNav.vue';

const props = defineProps({
  channel_id: String,
})

const isLoaded = ref(false)
const data = ref(null)
const query_path = 'https://sadly-oriented-husky.ngrok-free.app/channel/'+ props.channel_id

const fetchData = async () => {
    await axios.get(query_path, {
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
    <div v-if="isLoaded" class="flex flex-col">
      <div class="flex flex-row justify-center pt-8">
        <img class="object-scale-down object-center rounded-lg outline-green-600 outline h-auto w-1/2" :src="data.channel_banner+'=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'">
      </div>
      <div class="flex flex-row justify-center pt-4">
        <div>
          <img v-if="data.thumbnails" class="h-20 w-20 rounded-full" :src="data['thumbnails']['thumbnail_xs']">
        </div>
        <div class="flex flex-col pl-4">
          <h1 class="text-4xl text-white font-bold">
            {{ data.title }}
          </h1>
          <p>
            {{ data.handle }} • {{ data.subscriber_count }} subscribers • {{ data.video_count }} videos
          </p>
        </div>
      </div>
    </div>
    <div>
        <ChannelNav :channel_id="props.channel_id"/>
    </div>
</template>
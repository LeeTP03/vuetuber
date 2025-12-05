<script setup>
import { useRoute } from 'vue-router'
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';
import ChannelVideoItem from '@/components/ChannelVideoItem.vue';
import ChannelHeader from '@/components/ChannelHeader.vue';
import ChannelDescription from '@/components/ChannelDescription.vue';

let video_data = ref({})
const isLoaded = ref(false)
const route = useRoute();
const channel_id = route.params.id;
const query_path = 'https://sadly-oriented-husky.ngrok-free.app/channel/'+channel_id;

async function fetchVideoData() {
  try {
    const response = await axios.get(query_path + "/videos", {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    });
    video_data.value = response.data;
  } catch (error) {
    console.error('Error fetching video data:', error);
  }

  nextTick(() => {
    isLoaded.value = true
  })
}

onMounted(() => {
  fetchVideoData();
})
</script>

<template>
  <div class="w-full">
    <ChannelHeader :channel_id="channel_id" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isLoaded && route.name === 'Channel'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ChannelVideoItem v-for="video in video_data" :key="video.id" :data="video" />
      </div>
      <div v-else-if="isLoaded && route.name === 'ChannelDescription'" class="w-full">
        <ChannelDescription />
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
    </div>
  </div>
</template>
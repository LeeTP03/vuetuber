<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

let data = ref({})
const route = useRoute();
const videoId = route.params.id;
const readMore = ref(false);

const formattedDesc = computed(() => {
  if (data.value && data.value.description) {
    return data.value.description.replace(/\n/g, '<br>');
  }
  return ''; // Return an empty string if description is not available
});

const isoDate = computed(() => {
  if (data.value && data.value.stream_details && data.value.stream_details.actual_start_time) {
    return data.value.stream_details.actual_start_time;
  }
  return null;
});

const timeDiff = ref('')
const showItems = ref(false)

function getTimeDifference(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateTimeDifference() {
  timeDiff.value = getTimeDifference(isoDate.value);
}

async function fetchVideoData() {
  try {
    const response = await axios.get('https://sadly-oriented-husky.ngrok-free.app/video/'+videoId, {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    });
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching video data:', error);
  }
}

onMounted(async () => {
  await fetchVideoData(),
  setTimeout(() => showItems.value = true, 1000),
  updateTimeDifference(),
  setInterval(updateTimeDifference, 1000)
}
)
</script>

<template>
  <div v-if="!showItems" class="w-screen h-screen flex justify-center items-center bg-gray-900">
    <div class="flex flex-col items-center gap-4">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      <p class="text-gray-400">Loading video...</p>
    </div>
  </div>

  <div v-if="showItems" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full mb-6">
      <div class="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <iframe 
          class="w-full h-full" 
          :src="`https://www.youtube.com/embed/${videoId}?vq=hd1080`" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
    
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
          {{ data.title }}
        </h1>
        <div v-if="data.video_type === 'video/live'" class="flex items-center gap-2">
          <div class="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-white">LIVE</span>
          </div>
          <span class="text-sm text-gray-400">Streaming for {{ timeDiff }}</span>
        </div>
      </div>
      
      <div class="border-t border-gray-800 pt-6">
        <div class="prose prose-invert max-w-none">
          <p 
            class="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap"
            v-html="readMore ? formattedDesc : formattedDesc.slice(0, 200)"
          ></p>
          <button 
            v-if="formattedDesc.length > 200"
            @click="readMore = !readMore" 
            class="mt-3 text-red-500 hover:text-red-400 font-medium transition-colors duration-200"
          >
            {{ readMore ? "Read less" : "Read more" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
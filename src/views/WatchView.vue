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

<template >
  <div v-if="!showItems">
    <div class="w-screen h-screen flex justify-center items-center">
      <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
    </div>
  </div>

  <div v-if="showItems">
    <div class="aspect-w-6 aspect-h-2">
        <iframe class="w-4/5" :src="`https://www.youtube.com/embed/${videoId}?vq=hd1080`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="p-4 divide-y w-4/5">
      <div>
        <h1 class="text-2xl text-white font-light py-2">{{ data.title }}</h1>
        <p v-if="data.video_type == 'video/live'">Streaming for {{ timeDiff }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400 py-2" v-html="formattedDesc.slice(0,200)">
        </p>
        <p v-if="readMore" class="text-sm text-gray-500" v-html="formattedDesc.slice(200)"></p>
    <button @click="readMore = !readMore" class="text-blue-500">Read {{ readMore ? 'less' : 'more' }}</button>
      </div>
    </div>
  </div>
</template>
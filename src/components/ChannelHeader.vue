<!-- <script setup>
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
</script> -->


<template>
  <div v-if="isLoaded" class="w-full bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative w-full h-48 sm:h-64 overflow-hidden rounded-b-2xl mb-6">
        <img 
          class="w-full h-full object-cover" 
          :src="data.channel_banner + '=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'"
          :alt="data.title"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-start sm:items-end gap-4 pb-6">
        <div class="flex-shrink-0 -mt-16 sm:-mt-20 relative">
          <img 
            v-if="data.thumbnails" 
            class="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-gray-900 object-cover" 
            :src="data['thumbnails']['thumbnail_xs']"
            :alt="data.title"
            loading="lazy"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl sm:text-4xl font-bold text-white mb-2 truncate">
            {{ data.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-400">
            <span class="font-medium">{{ data.handle }}</span>
            <span class="hidden sm:inline">•</span>
            <span>{{ formatNumber(data.subscriber_count) }} subscribers</span>
            <span class="hidden sm:inline">•</span>
            <span>{{ formatNumber(data.video_count) }} videos</span>
          </div>
        </div>
      </div>
      
      <ChannelNav :channel_id="props.channel_id" />
    </div>
  </div>
  <div v-else class="w-full bg-gray-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse space-y-4">
        <div class="h-48 sm:h-64 bg-gray-800 rounded-b-2xl"></div>
        <div class="flex gap-4">
          <div class="h-24 w-24 sm:h-32 sm:w-32 bg-gray-800 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-8 bg-gray-800 rounded w-1/2"></div>
            <div class="h-4 bg-gray-800 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import axios from "axios";
import ChannelNav from "./ChannelNav.vue";

const props = defineProps({
  channel_id: String,
});

const isLoaded = ref(false);
const data = ref(null);
const query_path = "https://sadly-oriented-husky.ngrok-free.app/channel/" + props.channel_id;

function formatNumber(num) {
  if (!num) return "0";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

const fetchData = async () => {
  await axios
    .get(query_path, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
    .then((response) => {
      data.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  nextTick(() => {
    isLoaded.value = true;
  });
};

onMounted(() => {
  fetchData();
});
</script>
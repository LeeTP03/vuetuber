<script setup>
import { useRoute } from "vue-router";
import { ref, nextTick, computed, onMounted } from "vue";
import axios from "axios";

let desc_data = ref({});
const isLoaded = ref(false);
const route = useRoute();
const channel_id = route.params.id;
const query_path = "https://sadly-oriented-husky.ngrok-free.app/channel/" + channel_id;

const formattedDesc = computed(() => {
  if (desc_data.value && desc_data.value.description) {
    return desc_data.value.description.replace(/\n/g, "<br>");
  }
  return "";
});

function formatNumber(num) {
  if (!num) return "0";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

async function fetchVideoData() {
  try {
    const response = await axios.get(query_path, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    desc_data.value = response.data;
  } catch (error) {
    console.error("Error fetching video data:", error);
  }

  nextTick(() => {
    isLoaded.value = true;
  });
}

onMounted(() => {
  fetchVideoData();
});
</script>

<template>
  <div v-if="isLoaded" class="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
    <div class="lg:col-span-2">
      <h2 class="text-2xl font-bold text-white mb-4">Description</h2>
      <div 
        v-if="formattedDesc" 
        class="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap"
        v-html="formattedDesc"
      ></div>
      <p v-else class="text-gray-500">No description available.</p>
    </div>
    
    <div class="lg:col-span-1">
      <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-6">Statistics</h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center pb-4 border-b border-gray-700">
            <span class="text-gray-400">View Count</span>
            <span class="text-white font-semibold">{{ formatNumber(desc_data.view_count) }}</span>
          </div>
          <div class="flex justify-between items-center pb-4 border-b border-gray-700">
            <span class="text-gray-400">Subscriber Count</span>
            <span class="text-white font-semibold">{{ formatNumber(desc_data.subscriber_count) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400">Video Count</span>
            <span class="text-white font-semibold">{{ formatNumber(desc_data.video_count) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="py-8">
    <div class="animate-pulse space-y-4">
      <div class="h-8 bg-gray-800 rounded w-1/4"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-800 rounded"></div>
        <div class="h-4 bg-gray-800 rounded w-5/6"></div>
      </div>
    </div>
  </div>
</template>
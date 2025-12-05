<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  data: Object,
});

const isoDate = computed(() => props.data.stream_details.actual_start_time);
const timeDiff = ref("");

function getTimeDifference(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateTimeDifference() {
  timeDiff.value = getTimeDifference(isoDate.value);
}

onMounted(() => {
  updateTimeDifference();
  setInterval(updateTimeDifference, 1000);
});
</script>

<template>
  <div class="group flex flex-col w-full max-w-sm cursor-pointer transition-all duration-300 hover:scale-[1.02]">
    <div class="relative w-full overflow-hidden rounded-xl bg-gray-800 aspect-video mb-3">
      <router-link :to="`/watch/${data.video_id}`" class="block w-full h-full">
        <img 
          :src="data.thumbnails.medium" 
          :alt="data.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        
        <!-- Live Badge -->
        <div class="absolute top-2 left-2 flex items-center gap-1.5 bg-red-600 px-2 py-1 rounded-md shadow-lg">
          <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-white uppercase tracking-wide">LIVE</span>
        </div>
        
        <!-- Duration Badge -->
        <div class="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium text-white backdrop-blur-sm">
          {{ timeDiff }}
        </div>
      </router-link>
    </div>

    <div class="flex flex-row gap-3 px-1">
      <div class="flex-shrink-0">
        <img 
          class="h-10 w-10 rounded-full object-cover ring-2 ring-red-600 group-hover:ring-red-500 transition-all duration-300" 
          :src="data.channel_thumbnail"
          :alt="data.channel_title || 'Channel'"
          loading="lazy"
        />
      </div>

      <div class="flex-1 min-w-0">
        <router-link :to="`/watch/${data.video_id}`" class="block">
          <h3 class="line-clamp-2 text-sm font-medium text-gray-100 group-hover:text-white transition-colors duration-200 mb-1 leading-tight">
            {{ data.title }}
          </h3>
        </router-link>
        <div class="flex flex-col gap-0.5">
          <router-link 
            :to="`/channel/${data.channel_id}`"
            class="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200 truncate"
          >
            {{ data.channel_title || "Unknown Channel" }}
          </router-link>
          <div class="text-xs text-red-400 font-medium">
            Streaming now
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
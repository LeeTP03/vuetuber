<script setup>
import { computed } from "vue";

const props = defineProps({
  data: Object,
});

function formatUpcomingDate(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = date - now;
  
  if (diffMs < 0) {
    return "Starting soon";
  }
  
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return `In ${diffDay} day${diffDay > 1 ? "s" : ""}`;
  } else if (diffHour > 0) {
    return `In ${diffHour} hour${diffHour > 1 ? "s" : ""}`;
  } else if (diffMin > 0) {
    return `In ${diffMin} minute${diffMin > 1 ? "s" : ""}`;
  } else {
    return "Starting now";
  }
}

const upcomingTime = computed(() => {
  if (props.data.scheduled_start_time) {
    return formatUpcomingDate(props.data.scheduled_start_time);
  }
  return "Upcoming";
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
        
        <!-- Upcoming Badge -->
        <div class="absolute top-2 left-2 flex items-center gap-1.5 bg-blue-600 px-2 py-1 rounded-md shadow-lg">
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-xs font-semibold text-white uppercase tracking-wide">Upcoming</span>
        </div>
        
        <!-- Time Badge -->
        <div class="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium text-white backdrop-blur-sm">
          {{ upcomingTime }}
        </div>
      </router-link>
    </div>

    <div class="flex flex-row gap-3 px-1">
      <div class="flex-shrink-0">
        <img 
          class="h-10 w-10 rounded-full object-cover ring-2 ring-blue-600 group-hover:ring-blue-500 transition-all duration-300" 
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
          <div class="text-xs text-blue-400 font-medium">
            {{ upcomingTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
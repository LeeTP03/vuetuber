<script setup>
import { computed } from "vue";

const props = defineProps({
  data: Object,
});

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) {
    return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
  } else if (diffMonth > 0) {
    return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

const formattedDate = computed(() => formatDate(props.data.published_at));
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
      </router-link>
    </div>

    <div class="flex flex-row gap-3 px-1">
      <div class="flex-shrink-0">
        <img 
          class="h-10 w-10 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-gray-600 transition-all duration-300" 
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
          <div class="text-xs text-gray-500">
            {{ formattedDate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
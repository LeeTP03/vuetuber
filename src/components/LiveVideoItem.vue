<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps({
  data: Object,
})

const isoDate = computed(() => props.data.stream_details.actual_start_time )
const timeDiff = ref('')

function getTimeDifference(isoDate) {
  // Parse the ISO date
  const date = new Date(isoDate);
  
  // Get current time
  const now = new Date();
  
  // Calculate the difference in milliseconds
  const diffMs = now - date;
  
  // Convert milliseconds to seconds
  const diffSec = Math.floor(diffMs / 1000);
  
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;
  
  // Format the result
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
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
    <div class="flex flex-col p-4 w-88">

      <div class="flex flex-col w-80">
        <router-link class="relative w-full h-full" :to="`/watch/${data.video_id}`">
          <img :src="data.thumbnails.medium" class="w-full rounded-md object-cover">
          <div class="bg-black bg-opacity-80 px-1 text-white rounded-md absolute top-2 left-2" v-if="data.isMember">Members Only</div>  
          <div class="bg-red-800 px-1 text-white rounded-md absolute bottom-2 right-2"> {{timeDiff }}</div>
          <img/>
        </router-link>
      </div>

      <div class="flex flex-row" >
        <div class="flex justify-center items-center w-10">
          <img class="h-10 min-w-10 rounded-full" :src="data.channel_thumbnail">
        </div>

        <div class="pl-2">
          <div class="line-clamp-2 w-full">{{ data.title }}</div>
            <div>
              <router-link class="text-green-600 text-sm hover:bg-" :to="`/channel/${data.channel_id}`">{{ data.channel_title }}</router-link>
              <div class="flex flex-row">
                <div class="text-red-500">Live Now</div>
                <div class="pl-1">• {{data.stream_details.concurrent_viewers}} Viewers</div>              
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
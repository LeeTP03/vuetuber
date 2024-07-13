<script setup>
import { useRoute } from 'vue-router'
import { ref, nextTick, computed, onMounted } from 'vue';
import axios from 'axios';

let desc_data = ref({})
const isLoaded = ref(false)
const route = useRoute();
const channel_id = route.params.id;
const query_path = 'https://sadly-oriented-husky.ngrok-free.app/channel/'+channel_id;

const formattedDesc = computed(() => {
  if (desc_data.value && desc_data.value.description) {
    return desc_data.value.description.replace(/\n/g, '<br>');
  }
  return ''; // Return an empty string if description is not available
});

async function fetchVideoData() {
  try {
    const response = await axios.get(query_path, {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    });
    desc_data.value = response.data;
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
    <div class="flex flex-row pt-10">
      <div class="text-xl font-light text-left text-green-600 w-full">
        <div>Description</div>
        <div v-html="formattedDesc" class="text-xl font-light text-left text-gray-300 w-full"></div>
      </div>
        <div class="flex flex-row">
          <div class="flex flex-col w-96 text-right text-xl font-light text-gray-300">
            <div class="text-green-600"> Statistics</div>
            <div class="font-light">View Count</div>
            <div class="font-light">Subscriber Count</div>
            <div class="font-light">Video Count</div>
          </div>
          <div class="flex flex-col w-auto text-left text-xl text-gray-300 pl-2">
            <div class="font-light"><br>{{ desc_data.view_count }}</div>
            <div class="font-light">{{ desc_data.subscriber_count }}</div>
            <div class="font-light">{{ desc_data.video_count }}</div>
          </div>
        </div>
    </div>

</template>
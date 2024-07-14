<script setup>
import { useRoute } from 'vue-router'
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';
import ChannelVideoItem from '@/components/ChannelVideoItem.vue';
import ChannelHeader from '@/components/ChannelHeader.vue';
import ChannelDescription from '@/components/ChannelDescription.vue';
import ButtonRow from '@/components/ButtonRow.vue';

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
    <ChannelHeader :channel_id="channel_id"/>

    <div class="flex flex-col">
      <div v-if="isLoaded && route.name=='Channel'" class="w-screen flex flex-wrap gap-2 justify-center">
        <div v-for="video in video_data" :key="video.id">
          <ChannelVideoItem :data=video />
        </div>
      </div>
      <div v-if="isLoaded && route.name=='ChannelDescription'" class="w-screen flex flex-wrap gap-2 justify-center">
        <ChannelDescription />
      </div>
      <ButtonRow />
    </div>

</template>
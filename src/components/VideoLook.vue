<script setup>
defineProps({
  data: Object,
})
</script>

<template>
    {{ timeDiff }}
    <div class="flex flex-col p-4 w-88">

      <div class="flex flex-col w-80">
        <router-link :to="`/watch/${data.video_id}`">
          <img :src="data.thumbnails.medium" class="w-full rounded-md">
        </router-link>
      </div>

      <div class="flex flex-row" >
        <div class="flex justify-center items-center w-10">
          <img class="h-10 min-w-10 rounded-full" :src="data.channel_thumbnail">
        </div>

        <div class="pl-2">
          <div class="line-clamp-2 w-full">{{ data.title }}</div>
            <div>
              <router-link class="text-pink-600 text-sm hover:bg-" :to="`/channel/${data.channel_id}`">{{ data.channel_title }}</router-link>
            </div>
          </div>
        </div>
    </div>
</template>
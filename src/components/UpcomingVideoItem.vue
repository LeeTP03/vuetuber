<script setup>
const props = defineProps({
  data: Object,
})

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Get the components of the date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format the date
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const formattedDate = formatDate(props.data.stream_details.scheduled_start_time);
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
              <div> {{ formattedDate }}</div>
            </div>
          </div>
        </div>
    </div>
</template>
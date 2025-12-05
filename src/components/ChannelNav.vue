<script setup>
defineProps({
  channel_id: String,
});
</script>

<template>
  <div class="flex items-center gap-1 border-b border-gray-800 mb-6">
    <router-link 
      :to="`/channel/${channel_id}/`"
      class="px-4 py-3 text-sm font-medium text-gray-400 border-b-2 border-transparent hover:text-white hover:border-gray-600 transition-all duration-200"
      active-class="text-white border-red-600"
    >
      Videos
    </router-link>
    <router-link 
      :to="`/channel/${channel_id}/description`"
      class="px-4 py-3 text-sm font-medium text-gray-400 border-b-2 border-transparent hover:text-white hover:border-gray-600 transition-all duration-200"
      active-class="text-white border-red-600"
    >
      Description
    </router-link>
  </div>
</template>
<script setup>
defineProps({
  channel_id: String,
})
</script>

<template>
    <div class="container mx-auto text-center ">
        <router-link class="border hover:border-dotted" :to="`/channel/${channel_id}/`">Videos</router-link>
        <router-link :to="`/channel/${channel_id}/description`">Description</router-link>
    </div>
</template>
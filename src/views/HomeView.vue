<script setup>
import LiveSection from '@/components/LiveSection.vue';
import UpcomingSection from '@/components/UpcomingSection.vue';
</script>

<template>
  <div class="flex flex-col justify-center divide-green-600">
    <LiveSection />
    <hr class='mx-auto w-11/12 py-2'>
    <UpcomingSection/>
  </div>
</template>
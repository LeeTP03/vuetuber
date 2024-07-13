<script setup>
import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <div class="h-screen w-screen">
    <div class="relative h-16 w-full">
      <div class="absolute inset-x-0 top-0 h-16"><PageHeader /></div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
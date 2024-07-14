<script setup>
import PageHeader from './components/PageHeader.vue';
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="absolute inset-x-0 top-0 h-16 ">
      <PageHeader />
    </div>
    <div class="pt-16">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import PageHeader from "./components/PageHeader.vue";
</script>

<template>
  <div class="min-h-screen w-screen bg-gray-900 text-gray-100">
    <PageHeader />
    <main class="w-full">
      <router-view></router-view>
    </main>
  </div>
</template>
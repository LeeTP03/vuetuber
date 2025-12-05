<script setup>
import LiveSection from "@/components/LiveSection.vue";
import UpcomingSection from "@/components/UpcomingSection.vue";
</script>

<template>
  <div class="flex flex-col w-full">
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span class="w-1 h-6 bg-red-600 rounded-full"></span>
          Live Now
        </h2>
        <LiveSection />
      </div>
    </section>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border-t border-gray-800 my-8"></div>
    </div>
    
    <section class="py-8 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span class="w-1 h-6 bg-blue-600 rounded-full"></span>
          Upcoming Streams
        </h2>
        <UpcomingSection />
      </div>
    </section>
  </div>
</template>
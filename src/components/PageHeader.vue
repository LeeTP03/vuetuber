<template>
  <header class="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 backdrop-blur-sm bg-opacity-95">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
            <img class="w-10 h-10 rounded-lg" src="../assets/favicon2.png" alt="Vue logo" />
            <span class="text-xl font-bold text-white hidden sm:block">VueTuber</span>
          </router-link>
        </div>
        
        <nav class="flex items-center gap-1">
          <router-link 
            to="/" 
            class="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:text-white hover:bg-gray-800 transition-all duration-200"
            active-class="text-white bg-gray-800"
          >
            Home
          </router-link>
          <router-link 
            to="/archive" 
            class="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:text-white hover:bg-gray-800 transition-all duration-200"
            active-class="text-white bg-gray-800"
          >
            Archive
          </router-link>
          <router-link 
            to="/about" 
            class="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:text-white hover:bg-gray-800 transition-all duration-200"
            active-class="text-white bg-gray-800"
          >
            About
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>
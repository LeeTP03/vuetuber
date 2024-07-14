<script setup>
defineProps({
  total_amount: Object,
  current_url: String
})
</script>

<template>
    <div>
        <div v-if="total_amount" class="flex flex-row justify-center items-center gap-2">
            <div  v-for="n in Math.ceil(total_amount / 50)" :key="n">
                <router-link :to="`${current_url}?page=${n}`">
                    <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="firstPage">{{ n }}</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
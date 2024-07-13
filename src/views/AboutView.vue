<script setup>
import { ref } from 'vue'
let a = ref(1)
const plusOne = () => {
    a.value++;
}
</script>

<template>
    <div class="">
        <h1 class="text-white">{{a}}</h1>
        <button v-on:click="plusOne">click me</button>
    </div>
</template>
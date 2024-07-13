<template>
    <header class="bg-green-600 h-16">
        <div class="bg-black flex flex-row">
            <div class="pl-4 h-14 mt-1 flex items-center">
                <img class="logo w-10" src="../assets/favicon2.png" alt="Vue logo" />
            </div>
            <div class="pl-2 flex items-center justify-center gap-2">
                <router-link to="/">Home</router-link> 
                <router-link to="/archive">Archive</router-link>
                <router-link to="/about">About</router-link> 
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
    import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

</script>

<template>
    <div
        class="fixed top-0 z-50 h-screen w-screen flex justify-center items-center bg-white opacity-100 transition-opacity duration-1000 ease-in-out cursor-progress">
        <DotLottieVue style="height: 250px; width: 250px" autoplay loop src="/lottie/loading.lotie" />
    </div>
</template>

<script setup lang="ts">
import SINForm from '@/components/SINForm.vue';
</script>

<template>
  
  <div class="main-container w-full flex flex-col min-h-screen justify-top items-center">
        <h1 class="mb-8 text-4xl font-bold leading-none text-gray-700 md:text-5xl lg:text-6xl"> Validate SIN </h1>
        <SINForm />
  </div>
</template>

<style scoped lang="scss">
@import 'assets/base.scss';

</style>

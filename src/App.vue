<script setup lang="ts">
import Home from '@/Home.vue';
</script>

<template>
  <Home />
</template>

<style lang="scss">
@import 'assets/base.scss';

#app {
  display: flex;
  padding: 1rem;
  background: #f2f2f2;
  @media print {
    padding: 0;
  }
}

</style>

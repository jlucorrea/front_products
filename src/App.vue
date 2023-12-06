<script setup lang="ts">
import NavBar from '@/views/layouts/NavBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="container">
        <NavBar />
      </div>
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

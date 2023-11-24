<script setup></script>

<template>
    <div class="app-container">
        <router-view />
    </div>
    
</template>

<style lang="scss" scoped>
.app-container {
  background: rgba(255, 255, 255, 0.7) url('/layout/images/Background.jpg') no-repeat center center;
  background-size: cover; /* Ajusta según tus preferencias */
  
  //height: 1600px; /* Ajusta según tus preferencias */
  display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>


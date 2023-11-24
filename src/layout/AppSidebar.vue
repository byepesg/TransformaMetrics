<script setup>
import AppMenu from './AppMenu.vue';
</script>

<template>
    <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <app-menu></app-menu>
                    </div>
                    
                </div>

                
            </div>
  
 <div class="app-container">
        
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  background: rgba(255, 255, 255, 0) url('/layout/images/Wise_Owl.jpg') no-repeat center center;
  background-size: cover; /* Ajusta según tus preferencias */
  
  height: 1000px; /* Ajusta según tus preferencias */
  //width: 250px; /* Ajusta según tus preferencias */
  //display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>

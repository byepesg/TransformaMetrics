<script setup>
import { ref, onBeforeMount } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import MenuService from '@/service/MenuService';

const menuService = new MenuService();

const oldModel = ref([]);
const model2 = ref([
    {
        label: 'Inicio',

        items: [{ label: 'Metricas', icon: 'pi pi-fw pi-home', to: '/applayout' }]
    },
    {
        label: 'Conjunto de datos',

        items: [{ label: 'Referencias usadas', icon: 'pi pi-fw pi-home', to: '/Products' }]
    },

]);

onBeforeMount(() => {
    fetchInfoAndUpdateValue();
});

async function fetchInfoAndUpdateValue() {
    try {
        //model.value = await menuService.getMenu();
    } catch (error) {
        console.error('Error:', error);
    }
}
</script>

<!-- <template>
    <app-menu-item :model="oldModel" />
</template> -->
<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model2" :key="item">
            <!--<div class="card">-->
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
            <!--</div>-->
        </template>
    </ul>
</template>
<style lang="scss" scoped></style>

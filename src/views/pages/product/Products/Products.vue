<script setup>
import { ref } from 'vue';
import Table from '@/components/Table.vue';
import ToolbarComponet from '@/components/ToolbarComponet.vue';
import useProducts from '@/composables/Products/productsAPI.js'

const { data, error, postProducts } = useProducts();
const requestData = {
      "name": "Juancho",
      "short_name": "JCY",
      "slug": "909090"
    };
const listRowSelect = ref([]);

const dataMod = ref({});
const headerNames = ref([]);

function RowSelect(data) {
    listRowSelect.value = data;
}

const onModDataToolbar = (data) => {
    dataMod.value = data;
};

const onHeaderNames = (data) => (headerNames.value = data);


</script>

<template>
    <div class="card">
        <h1>Referencias</h1>
        

        <!-- <Table title="Aquí podrás elegir las referencias que quieres ver" path-api="https://raw.githubusercontent.com/byepesg/TransformaMetrics/main/src/data/JSON.json" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" /> -->
        <Table title="Aquí podrás elegir las referencias que quieres ver" path-api="https://raw.githubusercontent.com/byepesg/TransformaMetrics/main/src/data/JSON4.json" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" />
        
    </div>
</template>

<style></style>

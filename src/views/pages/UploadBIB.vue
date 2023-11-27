<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';


const router = useRouter();
const confirm = useConfirm();
const visible = ref(false);
// Manejar la carga del archivo
const handleUpload = (event) => {
  
  console.log('Archivo cargado:', file);

  const fileInput = document.getElementById('tuInputDeArchivo');
    const file = fileInput.files[0];

// Crea un objeto FormData y agrega el archivo
const formData = new FormData();
formData.append('archivo', file);

// Realiza la solicitud POST
fetch('URL_DEL_SERVIDOR', {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => {
    // Maneja la respuesta del servidor
    console.log('Respuesta del servidor:', data);
  })
  .catch(error => {
    // Maneja los errores
    console.error('Error al enviar el archivo:', error);
  });};

const route = () => {
    
    router.push('/metricas');
};
const toast = useToast();

const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            route();
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const confirm2 = () => {
    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

</script>

<template>
    <div class="card">
        <h1>Sube tu archivos</h1>
        <FileUpload
      name="archivo"
      url="http://127.0.0.1:8000/run-script"
      :auto="true"
      :maxFileSize="1000000"
      @upload="handleUpload"
    />

        <Button label="Cargar archivos en el sistema para ser enviados" icon="pi pi-external-link" @click="visible = true" />
        
<Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
        <div class="inline-flex align-items-center justify-content-center gap-2">
            
            <span class="font-bold white-space-nowrap">TransformaMetrics quiere decirte</span>
        </div>
    </template>
    <p class="m-0">
        Aquí podrás confirmar que el archivo que quieres ya está listo para que sea procesado por el sistema.
    </p>
    
    <template #footer>
        <ConfirmDialog></ConfirmDialog>
    <Button @click="confirm1()" icon="pi pi-check" label="Confirmar"></Button>
    <Button @click="confirm2()" icon="pi pi-times" label="Cancelar" severity="danger"></Button>
    </template>
</Dialog>
    

    </div>
</template>

<style></style>

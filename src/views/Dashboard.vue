<script setup>
import { onMounted, ref, watch,onBeforeMount } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { useFetch } from '@/service//fetch.js';
import useUnitTypes from '@/composables/Product/UnitsType/unitTypeAPI.js'


const { layoutConfig } = useLayout();

let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const lineData = ref(null);
const pieData = ref(null);
const polarData = ref(null);
const barData = ref(null);
const radarData = ref(null);

const lineOptions = ref(null);
const pieOptions = ref(null);
const polarOptions = ref(null);
const barOptions = ref(null);
const radarOptions = ref(null);





///////////////////////////////////////////////////
const dataTotalReferences = ref();
const getAllTotalReferences = async () => {
    const { getAllUnitTypes,dataUnitTypes } = useUnitTypes();
    await getAllUnitTypes("/total_references");
    dataTotalReferences.value =dataUnitTypes.value.total_references
    dataUnitTypes.value={}
};
///////////////////////////////////////////////////
const mostUsedYear = ref();
const mostUsedYearData = ref();
const totalWightUsedYear = ref();
const getMostUsedYear = async () => {
    const { getAllUnitTypes,dataUnitTypes } = useUnitTypes();
    await getAllUnitTypes("/most-used-year");
    mostUsedYear.value = dataUnitTypes.value
    mostUsedYearData.value = mostUsedYear.value.most_used_year
    const nombreBuscado = mostUsedYearData.value;
    const personaEncontrada = personas.find(persona => persona.nombre === nombreBuscado);
    
    return mostUsedYearData

}; 
///////////////////////////////////////////////////
const mostUsedJournal = ref(); 
const mostUsedJournalData = ref();
const mostUsedJournalFrequency = ref();
const mostUsedEditorialData = ref();
const mostUsedEditorialFrequency = ref();
const getMostUsedJournal = async () => {
    const { getAllUnitTypes,dataUnitTypes } = useUnitTypes();
    await getAllUnitTypes("/most_used_journal");
    mostUsedJournal.value = dataUnitTypes.value;
    mostUsedJournalData.value = mostUsedJournal.value.most_used_journal.common
    mostUsedEditorialData.value = mostUsedJournal.value.most_used_editorial.common
    mostUsedJournalFrequency.value = mostUsedJournal.value.most_used_journal.frequency
    mostUsedEditorialFrequency.value = mostUsedJournal.value.most_used_editorial.frequency

}

///////////////////////////////////////////////////
const journalFrequencyYear = ref()
const organizedJournalFrequency = ref([]);
const editorialFrequencyYear = ref()
const organizedEditorialFrequency = ref([]);
const conferenceFrequencyYear = ref();
const organizedConferenceFrequency = ref([]);
let yearsArray = ref()
let pesosJournalArray = ref()
let pesosEditorialArray = ref()
let pesosConferenceArray = ref()
let weightTotalArray = ref(0)
const getHistogramData = async () => {
    const { getAllUnitTypes,dataUnitTypes } = useUnitTypes();
    await getAllUnitTypes("/histogram_data");

    journalFrequencyYear.value = dataUnitTypes.value.Data.journal_frequency
    editorialFrequencyYear.value = dataUnitTypes.value.Data.editorial_frequency
    conferenceFrequencyYear.value = dataUnitTypes.value.Data.conferences_frequency

    //console.log(journalFrequencyYear.value)
    //console.log(data.value.Data.journal_frequency)
    const journalFrequency = JSON.parse(journalFrequencyYear.value);
    const editorialFrequency = JSON.parse(editorialFrequencyYear.value);
    const conferenceFrequency = JSON.parse(conferenceFrequencyYear.value); 


// Convertir el objeto a un arreglo de [año, peso]
    const arregloJournalFrequency = Object.entries(journalFrequency).map(([year, weight]) => ({
        year,
        weight
    }));
const arregloEditorialFrequency = Object.entries(editorialFrequency).map(([year, weight]) => ({
        year,
        weight
    }));
    const arregloConferenceFrequency = Object.entries(conferenceFrequency).map(([year, weight]) => ({
        year,
        weight
    }));    

// Almacena la organización en la variable reactiva
organizedJournalFrequency.value = arregloJournalFrequency;
organizedEditorialFrequency.value = arregloEditorialFrequency;
organizedConferenceFrequency.value = arregloConferenceFrequency;

//console.log(organizedJournalFrequency.value)
yearsArray.value = Object.values(organizedJournalFrequency.value).map(obj => obj.year);
pesosJournalArray.value = Object.values(organizedJournalFrequency.value).map(obj => {
    
    if (obj.year === mostUsedYearData.value.toString()) {
    //console.log(obj.weight);
    weightTotalArray.value = weightTotalArray.value + obj.weight
  }
  return obj.weight;
});
pesosEditorialArray.value = Object.values(organizedEditorialFrequency.value).map(obj => {
    
    
    if (obj.year === mostUsedYearData.value.toString()) {
      //console.log(obj.weight);
      weightTotalArray.value = weightTotalArray.value + obj.weight
    }
    return obj.weight;
  });
pesosConferenceArray.value = Object.values(organizedConferenceFrequency.value).map(obj => {
    
    if (obj.year === mostUsedYearData.value.toString()) {
      //console.log(obj.weight);
      weightTotalArray.value = weightTotalArray.value + obj.weight
    }
    return obj.weight;
  });
// console.log(mostUsedYearData.value)
// console.log(organizedJournalFrequency.value)
// console.log(yearsArray.value);
// console.log(pesosJournalArray);
// console.log(pesosEditorialArray);
// console.log(pesosConferenceArray);
weightTotalArray.value = weightTotalArray.value / dataTotalReferences

    return dataUnitTypes.value

}

///////////////////////////////////////////////////
const pieTypesKeys = ref()
const pieTypesValues = ref()
const getAllPieTypes = async () => {
    const { getAllUnitTypes,dataUnitTypes } = useUnitTypes();
    await getAllUnitTypes("/pie-type");
    //console.log(dataUnitTypes.value.get_pie_types)
    // Supongamos que `obj` es el objeto que has mostrado
    const keys = Object.keys(dataUnitTypes.value.get_pie_types[1]); // Obtener las claves
    const values = Object.values(dataUnitTypes.value.get_pie_types[1]); // Obtener los valores
    pieTypesKeys.value = keys
    pieTypesValues.value = values
    //console.log("Claves:", pieTypesKeys.value);
    //console.log("Valores:", pieTypesValues.value);

    return dataUnitTypes.value
};
const polarTypesKeys = ref()
const polarTypesValues = ref()
const getAllKeywords = async () => {
    const { getAllUnitTypes,dataUnitTypes } = useUnitTypes();
    await getAllUnitTypes("/polar-type");
    console.log(dataUnitTypes.value.get_polar_types)
    // Supongamos que `obj` es el objeto que has mostrado
    const keys = Object.keys(dataUnitTypes.value.get_polar_types[1]); // Obtener las claves
    const values = Object.values(dataUnitTypes.value.get_polar_types[1]); // Obtener los valores
    polarTypesKeys.value = keys
    polarTypesValues.value = values
    // Agregar un nuevo elemento al final
    polarTypesValues.value.push(4);
    polarTypesValues.value.push(7);
    console.log("Claves:", polarTypesKeys.value);
    console.log("Valores:", polarTypesValues.value);
    


    return dataUnitTypes.value
};

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

const setChart = () => {
    barData.value = {
        labels: yearsArray,
        datasets: [
            {
                label: 'Artículos',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: pesosJournalArray
            },
            {
                label: 'Libros',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: pesosEditorialArray
            },
            {
                label: 'Conferencias o congresos',
                backgroundColor: documentStyle.getPropertyValue('--primary-800'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: pesosConferenceArray
            }
            
        ]
    };
    barOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    pieData.value = {
        labels: pieTypesKeys,
        datasets: [
            {
                data: pieTypesValues,
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    pieOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

    lineData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                tension: 0.4
            }
        ]
    };

    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    polarData.value = {
        datasets: [
            {
                data:  polarTypesValues,
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--orange-500')],
                label: 'My dataset'
            }
        ],
        labels:  polarTypesKeys 
    };

    polarOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };

    radarData.value = {
        labels: ['Fuente 1', 'Fuente 2', 'Fuente 3', 'Fuente 4', 'Fuente 5', 'Fuente 6', 'Fuente 7'],
        datasets: [
            {
                label: 'Relevancia últimos cinco años',
                borderColor: documentStyle.getPropertyValue('--indigo-400'),
                pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'Relevancia otras referencias mas antiguas',
                borderColor: documentStyle.getPropertyValue('--purple-400'),
                pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
                pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    radarOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: textColorSecondary
                }
            }
        }
    };
};

watch(
    layoutConfig.theme,
    () => {
        setColorOptions();
        setChart();
        
    },
    { immediate: true }
);
 
//=======================================================================
const { isDarkTheme } = useLayout();
const products = ref(null);


const productService = new ProductService();

const data = ref({
  "Data": {
    "total": 27,
    "journal_frequency": "{\"2001\":1,\"2005\":1,\"2010\":2,\"2011\":1,\"2012\":1,\"2013\":1,\"2014\":1,\"2019\":1}",
    "journal_count": 9,
    "editorial_frequency": "{\"2008\":1,\"2010\":1,\"2012\":1,\"2016\":2,\"2017\":2,\"2018\":1,\"2019\":1}",
    "editorial_count": 9,
    "conferences_frequency": "{\"2008\":1,\"2010\":1,\"2012\":1,\"2016\":2,\"2017\":2,\"2018\":1,\"2019\":1}",
    "conferences_count": 9,
  }
});

// Variable reactiva para almacenar la organización de journal_frequency


// Función para organizar journal_frequency en un arreglo de años y pesos
const organizeJournalFrequency = () => {
    



};

onBeforeMount(async  () => {


     getAllTotalReferences();
     getMostUsedYear();
     getMostUsedJournal();
     getHistogramData();
     organizeJournalFrequency(); 
    getAllPieTypes();  
    getAllKeywords();
     


    

   
    

});


const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    
    <div class="grid">
        

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">

                    <div>
                        <span class="block text-500 font-medium mb-3">Bibliografía: Cantidad de literatura</span>
                        <div class="text-900 font-medium text-xl">{{ dataTotalReferences }} </div>
                    </div>

                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-book text-green-500 text-xl"></i>
                    </div>
                    
                </div>

                <span class="text-green-500 font-medium">50 </span>
                <span class="text-500">Valor beta</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Año más frecuente de todo tipo</span>
                        <div class="text-900 font-medium text-xl" >{{ mostUsedYearData}}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bookmark text-green-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">20% </span>
                <span class="text-500">Valor beta</span>
            </div>
        </div>


        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Revista más utilizada </span>
                        <div class="text-900 font-medium text-xl">{{ mostUsedJournalData }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bookmark text-green-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ mostUsedJournalFrequency }} </span>
                <span class="text-500"> Veces</span>
            </div>
        </div>


        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Editorial mas Utilizada</span>
                        <div class="text-900 font-medium text-xl">{{mostUsedEditorialData}}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bookmark text-green-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium"> {{mostUsedEditorialFrequency}} </span>
                <span class="text-500"> Veces</span>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card " >
                <h5>Bibliografía por año</h5>
                <Chart type="bar" :data="barData" :options="barOptions"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Tipos de referencias</h5>
                <Chart type="pie" :data="pieData" :options="pieOptions"></Chart>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Estado del arte</h5>
                <Chart type="doughnut" :data="pieData" :options="pieOptions"></Chart>
            </div>
        </div>

        

        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Estado del arte</h5>
                <Chart type="polarArea" :data="polarData" :options="polarOptions"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Evolución con version anterior</h5>
                <Chart type="line" :data="lineData" :options="lineOptions"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Radiografía de Fuentes: Evaluación Métrica con Normas APA</h5>
                <Chart type="radar" :data="radarData" :options="radarOptions"></Chart>
            </div>
        </div>
    </div>
    
    
    
</template>

<style lang="scss" scoped>
</style>

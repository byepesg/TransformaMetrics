<script setup>
import { onMounted, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';

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

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

const setChart = () => {
    barData.value = {
        labels: ['2023', '2022', '2021', '2020', '2019', '2018', '2017','2016-2010','2010-2000','2000-1990','Before'],
        datasets: [
            {
                label: 'Documentos',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Conferencias o congresos',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: [28, 48, 40, 19, 86, 27, 90]
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
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [540, 325, 702],
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
                data: [11, 16, 7, 3],
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--orange-500')],
                label: 'My dataset'
            }
        ],
        labels: ['Indigo', 'Purple', 'Teal', 'Orange']
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

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
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
                        <div class="text-900 font-medium text-xl">152</div>
                    </div>

                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-book text-green-500 text-xl"></i>
                    </div>
                    
                </div>

                <span class="text-green-500 font-medium">50 </span>
                <span class="text-500">En uso referenciado</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Citaciones utlizadas en el trabajo</span>
                        <div class="text-900 font-medium text-xl">2.100</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bookmark text-green-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">%52+ </span>
                <span class="text-500">Nacional</span>
            </div>
        </div>


        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Revistas o editoriales predominantes </span>
                        <div class="text-900 font-medium text-xl">28</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-green-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">Pendientes</span>
            </div>
        </div>


        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Referencia mas usada</span>
                        <div class="text-900 font-medium text-xl">American Journal Of Physics</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-green-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">85 </span>
                <span class="text-500">Citaciones</span>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Bibliografía por año</h5>
                <Chart type="bar" :data="barData" :options="barOptions"></Chart>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Autores</h5>
                <Chart type="pie" :data="pieData" :options="pieOptions"></Chart>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Doughnut Chart</h5>
                <Chart type="doughnut" :data="pieData" :options="pieOptions"></Chart>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Linear Chart</h5>
                <Chart type="line" :data="lineData" :options="lineOptions"></Chart>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">Polar Area Chart</h5>
                <Chart type="polarArea" :data="polarData" :options="polarOptions"></Chart>
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

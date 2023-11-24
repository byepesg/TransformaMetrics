<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const { layoutConfig, changeThemeSettings } = useLayout();
const router = useRouter();

const smoothScroll = (id) => {
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const toggleValue = ref(layoutConfig.darkTheme.value);
const logoUrl = computed(() => {
    return `layout/images/${toggleValue.value ? 'logo-white' : 'logo-dark'}.png`;
});

const onChangeTheme = (mode) => {
    toggleValue.value = mode;
    const theme = mode ? 'lara-dark-teal' : 'lara-light-teal';
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode);
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};

const route = () => {
    
        router.push('/applayout');
    };
</script>

<template>
    <div class="surface-0 flex justify-content-center" style="background: linear-gradient(180deg, var(--paleta-400) 5%, var(--paleta-100) 15%)">
        <div id="home" class="landing-wrapper overflow-hidden mr-4 ml-4">
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <a class="flex align-items-center" href="#">
                    <img :src="logoUrl" height="70" class="mr-0 lg:mr-2" />
                    <span class="text-900 font-medium font-bold text-3xl line-height-3 mr-8">TransformaMetrics</span>
                </a>
                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center md:justify-content-end flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 100px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none lg:flex-row cursor-pointer">
                        <li>
                            <Button label="Login" class="p-button-text p-button-rounded border-none font-light text-green-800 line-height-4" @click="route"></Button>    
                            <Button @click="onChangeTheme(!toggleValue)" v-model="toggleValue" icon="pi pi-cog" outlined rounded class="button-icon ml-3 mr-2 mr-1" style="width: 3.5rem; height: 3.5rem" /> 
                            
                        </li>
                    </ul>
                </div>
            </div>

            <div
                id="hero"
                class="grid mt-8 mr-5 md:pb-8"
                style="background: linear-gradient(0deg, var(--paleta-300), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, var(--paleta-100) 0%, var(--paleta-200) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
            >
                <div class="flex-column col-12 lg:col-7 md:mx-6 md:mt-4">
                    <h2 class="text-7xl font-bold text-gray-900">Evalúa las referencias de tu investigación</h2>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
                        
                    ¡Bienvenido al futuro de la evaluación académica! Introducimos TransformaMetrics, la herramienta esencial para medir y optimizar métricas de referencias en tus trabajos académicos e investigaciones. Ya no es solo un software, es tu aliado estratégico para elevar la calidad y la relevancia de tus proyectos.
                    Con TransformaMetrics, podrás rastrear y analizar de manera eficiente las métricas clave de tus referencias bibliográficas, desde la precisión de las citas hasta la diversidad de las fuentes utilizadas. Maximiza la calidad de tus investigaciones con estadísticas detalladas, gráficos visuales intuitivos y sugerencias personalizadas para mejorar la fortaleza de tu base bibliográfica.
                    Simplifica tu proceso de evaluación, toma decisiones informadas y eleva el estándar de tus proyectos académicos con TransformaMetrics. ¡Potencia tu rendimiento académico y descubre un nuevo nivel de excelencia en cada referencia!
                    </p>
                </div>
                <div class="flex justify-content-end sm:flex-order-2 lg:col-4">
                    <img src="/layout/images/Wise_Owl.jpg" alt="Hero Image" class="w-10" />
                </div>
            </div>

            <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
                <div class="grid justify-content-between">
                    <div class="col-12 md:col-2" style="margin-top: -1.5rem">
                        <a @click="smoothScroll('#home')" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                            <img :src="logoUrl" alt="footer sections" width="50" height="50" class="mr-0 lg:mr-2" />
                            <h4 class="font-medium text-3xl text-900">TransformaMetrics</h4>
                        </a>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
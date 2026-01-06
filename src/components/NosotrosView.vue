<template>
    <!-- Sección hero -->
    <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-5xl font-light text-slate-900 mb-6">
                Sobre <span class="font-semibold">Nosotros</span>
            </h1>
            <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Conoce nuestra historia, valores y el compromiso que nos impulsa a ser tu mejor aliado en el mundo
                inmobiliario.
            </p>
        </div>
    </section>

    <!-- Sección principal con logo y descripción -->
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- Logo de la empresa -->
                <div class="text-center lg:text-left">
                    <div
                        class="w-55 h-55 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-8">
                        <img :src="logo" alt="Logo de la empresa" class="w-45 h-45 object-contain">
                    </div>
                    <h2 class="text-2xl font-semibold text-slate-900 mb-4">Tu Inmobiliaria de Confianza</h2>
                    <p class="text-slate-600 text-lg">Desde 1995 construyendo sueños</p>
                </div>

                <!-- Contenido descriptivo -->
                <div class="space-y-6">
                    <h3 class="text-3xl font-light text-slate-900">
                        Nuestra <span class="font-semibold">Historia</span>
                    </h3>
                    <div class="space-y-4 text-slate-600 leading-relaxed">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                        </p>
                        <p>
                            Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                            quia voluptas sit aspernatur aut odit aut fugit.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Sección de valores -->
    <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-16 space-y-4">
                <h2 class="text-4xl font-light text-slate-900">Nuestros Valores</h2>
                <p class="text-xl text-slate-600 max-w-2xl mx-auto">
                    Los principios que guían cada una de nuestras acciones y decisiones
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="text-center space-y-6">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                            </path>
                        </svg>
                    </div>
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-slate-900">Confianza</h3>
                        <p class="text-slate-600 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <div class="text-center space-y-6">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-slate-900">Eficiencia</h3>
                        <p class="text-slate-600 leading-relaxed">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                    </div>
                </div>

                <div class="text-center space-y-6">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                    </div>
                    <div class="space-y-3">
                        <h3 class="text-xl font-semibold text-slate-900">Compromiso</h3>
                        <p class="text-slate-600 leading-relaxed">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Sección de misión y visión -->
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div class="space-y-6">
                    <h3 class="text-3xl font-light text-slate-900">
                        Nuestra <span class="font-semibold">Misión</span>
                    </h3>
                    <p class="text-slate-600 leading-relaxed text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p class="text-slate-600 leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                </div>

                <div class="space-y-6">
                    <h3 class="text-3xl font-light text-slate-900">
                        Nuestra <span class="font-semibold">Visión</span>
                    </h3>
                    <p class="text-slate-600 leading-relaxed text-lg">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                    </p>
                    <p class="text-slate-600 leading-relaxed">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Sección de contacto -->
    <section class="py-20 bg-slate-50">
        <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-light text-slate-900 mb-6">
                ¿Listo para encontrar tu <span class="font-semibold">hogar ideal</span>?
            </h2>
            <p class="text-slate-600 mb-8 text-lg">
                Nuestro equipo de profesionales está aquí para ayudarte en cada paso del camino.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <router-link to="/contacto"
                    class="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors duration-200 font-medium text-center">
                    Contactar ahora
                </router-link>
                <router-link to="/propiedades-publicas"
                    class="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 font-medium text-center">
                    Ver propiedades
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import logo from '../assets/logo-principal.png';
</script>

<style scoped>

</style>
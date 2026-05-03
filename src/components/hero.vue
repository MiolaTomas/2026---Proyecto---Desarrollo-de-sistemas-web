<template>
    <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <!-- Logo -->
                <div class="flex lg:flex-1">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="" />
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <div class="flex lg:hidden">
                    <button type="button"
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        @click="mobileMenuOpen = true">
                        <span class="sr-only">Open main menu</span>
                        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden lg:flex lg:gap-x-12">
                    <a v-for="item in navigation" :key="item.name" :href="item.href"
                        class="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {{ item.name }}
                    </a>
                </div>

                <!-- Right Side -->
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
                    <a href="#"
                        class="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
                        Post a job
                    </a>
                    <a href="#"
                        class="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors flex items-center">
                        Log in
                        <span aria-hidden="true" class="ml-1">&rarr;</span>
                    </a>
                </div>
            </nav>

            <!-- Mobile Menu (unchanged) -->
            <div v-if="mobileMenuOpen" class="lg:hidden" role="dialog" aria-modal="true">
                <!-- ... mobile menu code same as before ... -->
            </div>
        </header>

        <div class="relative isolate px-6 pt-20 lg:px-8">
            <!-- Background gradients (unchanged) -->
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>

            <!-- Hero Content -->
            <div class="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
                <!-- Announcement Badge -->
                <div class="hidden sm:mb-6 sm:flex sm:justify-center">
                    <div
                        class="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-colors">
                        Announcing our next round of funding.
                        <a href="#" class="font-semibold text-indigo-600">Read more <span
                                aria-hidden="true">&rarr;</span></a>
                    </div>
                </div>

                <!-- Main Heading -->
                <div class="text-center">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Find your next opportunity
                    </h1>
                    <p class="mt-6 text-lg leading-8 text-gray-600">
                        Discover thousands of jobs from the best companies. Search by role, location, or company.
                    </p>

                    <!-- Job Search Bar -->
                    <div class="mt-10 max-w-xl mx-auto">
                        <div
                            class="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
                            <!-- Job Title / Keyword -->
                            <div class="flex-1 relative">
                                <input type="text" v-model="searchKeyword" placeholder="Job title, keyword, or company"
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-colors text-gray-900 placeholder:text-gray-400" />
                            </div>

                            <!-- Location -->
                            <div class="flex-1 relative">
                                <input type="text" v-model="searchLocation" placeholder="City, state, or remote"
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-colors text-gray-900 placeholder:text-gray-400" />
                            </div>

                            <!-- Search Button -->
                            <button @click="searchJobs"
                                class="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom gradient -->
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const navigation = [
    { name: 'Find Jobs', href: '#' },
    { name: 'Companies', href: '#' },
    { name: 'For Employers', href: '#' },
]

const searchKeyword = ref('')
const searchLocation = ref('')

const searchJobs = () => {
    if (searchKeyword.value || searchLocation.value) {
        console.log('Searching for:', searchKeyword.value, 'in', searchLocation.value)
        // Add your search logic here
    }
}

const mobileMenuOpen = ref(false)
</script>
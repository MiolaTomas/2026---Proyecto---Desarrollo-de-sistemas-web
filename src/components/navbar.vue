<template>
    <nav class="">
        <div class="logo">StackHire</div>
        <div v-for="item in navItems" :key="item.name">
            {{ item.name }}
        </div>

        <div v-for="item in actionButtons" :key="item.name">
            {{ item.name }}
        </div>
        <!-- <button class="md:hidden">☰</button> -->
        <!-- <div class="mobile-menu">Mobile Menu</div> -->
    </nav>

</template>

<script setup>

const logo = []; //El logo va directamente en el html creo

const navItems = [
    {
        name: "Trabajos",
        path: "/trabajos",
        children: []
    }
]

const actionButtons = [
    {
        name: "Login",
        path: "/login",
        children: []
    },
    {
        name: "Post a Job",
        path: "/post-job",
        children: []
    }
]

</script>
<template>
    <div class="">
        <NavBar />
    </div>
    <div class="p-pt-3 p-px-6">
        <slot />
    </div>
    <div class="p-mt-6">
        <Footer />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        NavBar,
        Footer,
    },
};
</script>

<style></style>

<template>
    <Menubar :model="items">
        <template #start>
            <img
                alt="logo"
                src="../assets/logo-nobg.png"
                height="40"
                class="p-ml-2"
            />
        </template>
        <template #end>
            <i class="pi pi-user"></i>
            Bianca Gomes
        </template>
    </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
    name: "NavBar",
    components: {
        Menubar,
    },
    data() {
        return {
            items: [
                {
                    label: "Novo Agendamento",
                    icon: "pi pi-calendar-plus",
                    to: "/agendamento",
                },
            ],
        };
    },
};
</script>

<style>
.p-menubar {
    background: unset;
    color: #000000;
    border: unset;
    border-radius: unset;
}
.p-menubar-start {
    margin-right: 1rem;
}
</style>

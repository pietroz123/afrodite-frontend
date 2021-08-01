<template>
    <h2>Selecionar Serviço</h2>

    <Card
        v-for="service in services"
        :key="service.sfid"
        class="shadow-box p-shadow-1"
        @click="notifySelection(service)"
    >
        <template #title> {{ service.name }} </template>
        <template #content>
            <p>Mais informações</p>
        </template>
    </Card>
</template>

<script>
import Card from "primevue/card";

export default {
    components: {
        Card,
    },
    emits: ["service-selected", "professional-selected"],
    data() {
        return {
            services: [],
        };
    },
    mounted() {
        this.getServices();
    },
    methods: {
        getServices() {
            this.$axios
                .get(`https://afrodite-backend.herokuapp.com/api/servicos`)
                .then((res) => {
                    console.log("services", res);
                    this.services = res.data.rows;
                });
        },
        notifySelection(service) {
            this.$emit("service-selected", service);
            this.$emit("professional-selected", null); // clears selected professional
        },
    },
};
</script>

<style></style>

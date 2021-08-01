<template>
    <h2>Selecionar Serviço</h2>

    <div class="p-d-flex p-flex-wrap">
        <Card
            v-for="service in services"
            :key="service.sfid"
            :class="{
                'p-shadow-1 p-mr-2 p-mb-2 c-selection-card': true,
                selected:
                    serviceSelected && serviceSelected.sfid === service.sfid,
            }"
            @click="notifySelection(service)"
        >
            <template #title> {{ service.name }} </template>
            <template #content>
                R${{ service.af_preco__c }} &bull;
                {{ service.af_tempo_de_execucao_em_minutos__c }} min
            </template>
        </Card>
    </div>
</template>

<script>
import Card from "primevue/card";

export default {
    components: {
        Card,
    },
    props: {
        serviceSelected: Object,
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

<style lang="scss">
.p-card-title {
    font-size: 1rem !important;
}
.p-card-content {
    padding: 0 !important;
}
</style>

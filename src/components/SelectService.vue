<template>
    <h2>Selecionar Serviço</h2>

    <p>{{ professional.name }}</p>

    <ul>
        <li
            v-for="service in services"
            :key="service.sfid"
            @click="notifySelection(service)"
        >
            {{ service.name }}
        </li>
    </ul>
</template>

<script>
export default {
    emits: ["service-selected"],
    props: {
        professional: Object,
    },
    data() {
        return {
            services: [],
        };
    },
    mounted() {
        this.getServices();
    },
    watch: {
        professional: function (newValue, oldValue) {
            if (oldValue != newValue) {
                this.getServices();
            }
        },
    },
    methods: {
        getServices() {
            this.$axios
                .get(
                    `https://afrodite-backend.herokuapp.com/api/profissionais/${this.professional.sfid}/servicos`
                )
                .then((res) => {
                    console.log("services", res);
                    this.services = res.data.rows;
                });
        },
        notifySelection(service) {
            this.$emit("service-selected", service);
        },
    },
};
</script>

<style></style>

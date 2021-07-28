<template>
    <h2>Selecionar Profissional</h2>

    <div class="p-d-flex p-jc-evenly p-pt-4">
        <template v-if="!profissionais.length">
            Nenhum profissional encontrado para esse serviço.
        </template>

        <template
            v-for="professional in profissionais"
            :key="professional.sfid"
        >
            <Button
                type="button"
                class="p-px-3 p-button-raised p-button-secondary p-button-text"
                @click="notifySelection(professional)"
            >
                <div class="p-d-flex p-flex-column p-ai-center">
                    <Avatar size="xlarge" shape="circle" class="p-mx-2">
                        {{ professional.name.charAt(0).toUpperCase() }}
                    </Avatar>

                    <p>{{ professional.name }}</p>
                </div>
            </Button>
        </template>
    </div>
</template>

<script>
import Avatar from "primevue/avatar";
import Button from "primevue/button";

export default {
    props: {
        service: Object,
    },
    components: {
        Avatar,
        Button,
    },
    emits: ["professional-selected"],
    data() {
        return {
            profissionais: [],
        };
    },
    mounted() {
        this.getProfessionals();
    },
    watch: {
        service: function (newValue, oldValue) {
            if (oldValue != newValue) {
                this.getProfessionals();
            }
        },
    },
    methods: {
        getProfessionals() {
            this.$axios
                .get(
                    `https://afrodite-backend.herokuapp.com/api/servicos/${this.service.sfid}/profissionais`
                )
                .then((res) => {
                    console.log("professionals", res);
                    this.profissionais = res.data.rows;
                });
        },
        notifySelection(professional) {
            this.$emit("professional-selected", professional);
        },
    },
};
</script>

<style></style>

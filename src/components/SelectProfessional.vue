<template>
    <h2>Selecionar Profissional</h2>

    <div class="p-d-flex p-jc-evenly">
        <template
            v-for="professional in profissionais"
            :key="professional.sfid"
        >
            <div class="p-d-flex p-flex-column">
                <Avatar
                    size="xlarge"
                    shape="circle"
                    class="p-mx-2"
                >
                    {{ professional.name.charAt(0).toUpperCase() }}
                </Avatar>

                <p>{{ professional.name }}</p>
            </div>
        </template>
    </div>
</template>

<script>
import Avatar from "primevue/avatar";

export default {
    components: {
        Avatar,
    },
    data() {
        return {
            profissionais: [],
        };
    },
    mounted() {
        this.getProfissionais();
    },
    methods: {
        getProfissionais() {
            this.$axios
                .get("https://afrodite-backend.herokuapp.com/api/profissionais")
                .then((res) => {
                    console.log("res", res);
                    this.profissionais = res.data.rows;
                });
        },
    },
};
</script>

<style></style>

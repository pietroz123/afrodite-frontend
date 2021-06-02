<template>
    <p>Profissional Step</p>

    <ul>
        <li v-for="profissional in profissionais" :key="profissional.sfid">
            {{ profissional.name }}
        </li>
    </ul>
</template>

<script>
export default {
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

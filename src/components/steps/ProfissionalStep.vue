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
                .get(`${process.env.VUE_APP_SERVER_URL}/api/profissionais`)
                .then((res) => {
                    console.log("res", res);
                    this.profissionais = res.data.rows;
                });
        },
    },
};
</script>

<style></style>

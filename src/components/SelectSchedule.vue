<template>
    <h2>Selecionar Horário</h2>

    <p>{{ professional.name }}</p>
    <p>{{ service.name }}</p>
</template>

<script>
export default {
    props: {
        professional: Object,
        service: Object,
    },
};
</script>

<style></style>

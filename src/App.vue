<template>
    <router-view />
</template>

<style lang="scss">
// É necessário ter esse #app para funcionar os arquivos .scss
#app {
}
.c-main-divider {
    padding-bottom: 1rem;
    &::after {
        height: 5px;
        background: #7a664c;
        content: "";
        display: block;
        width: 100px;
        position: absolute;
    }
}
</style>

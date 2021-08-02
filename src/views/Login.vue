<template>
    <div class="p-d-flex p-flex-column p-ai-center p-jc-center p-mt-6">
        <img alt="logo" src="../assets/logo-nobg.png" height="150" />

        <div class="p-mt-4"></div>

        <form @submit.prevent="handleSubmit">
            <div class="p-fluid">
                <div class="p-field">
                    <label for="input-mobile" class="p-text-bold">
                        Celular
                    </label>
                    <InputMask
                        v-model="mobilePhone"
                        id="input-mobile"
                        mask="(99) 99999-9999"
                        placeholder="(99) 99999-9999"
                    />
                </div>

                <div class="p-field">
                    <label for="input-password" class="p-text-bold">
                        Senha
                    </label>
                    <Password
                        v-model="password"
                        id="input-password"
                        :feedback="false"
                        :toggleMask="true"
                        autocomplete="off"
                    />
                </div>
            </div>

            <Button
                type="submit"
                label="Login"
                icon="pi pi-arrow-right"
                iconPos="right"
                style="width: 100%"
            />
        </form>
    </div>
</template>

<script>
import InputMask from "primevue/inputmask";
import Password from "primevue/password";
import Button from "primevue/button";

export default {
    components: {
        InputMask,
        Password,
        Button,
    },
    data() {
        return {
            mobilePhone: "",
            password: "",
        };
    },
    methods: {
        handleSubmit() {
            console.log("🚀 / password", this.password);
            console.log("🚀 / mobilePhone", this.mobilePhone);

            if (this.mobilePhone && this.password) {
                // login
            }
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep(.p-button) {
    background: #7a664c;
    border-color: #7a664c;
    &:hover {
        background: #61513d;
        border-color: #61513d;
    }
}
</style>

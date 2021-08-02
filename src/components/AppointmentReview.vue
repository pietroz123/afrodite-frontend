<template>
    <Card class="p-shadow-1">
        <template #content>
            <div class="p-d-flex p-jc-between">
                <div class="p-d-flex p-flex-column p-ai-center c-w-100">
                    <p class="p-m-0 p-text-bold p-pb-3">
                        {{ serviceSelected.name }}
                    </p>
                    <p class="p-m-0">R${{ serviceSelected.af_preco__c }}</p>
                    <p class="p-m-0">
                        {{ serviceSelected.af_tempo_de_execucao_em_minutos__c }}
                        min
                    </p>
                </div>

                <Divider layout="vertical" />

                <div class="p-d-flex p-flex-column p-ai-center c-w-100">
                    <p class="p-m-0 p-text-bold p-pb-3">
                        {{ professionalSelected.name }}
                    </p>
                    <div>
                        <Avatar size="xlarge" shape="circle" class="p-mx-2">
                            {{
                                professionalSelected.name
                                    .charAt(0)
                                    .toUpperCase()
                            }}
                        </Avatar>
                    </div>
                </div>

                <Divider layout="vertical" />

                <div class="p-d-flex p-flex-column p-ai-center c-w-100">
                    <p class="p-m-0 p-text-bold p-pb-3">
                        {{ timeSelected.format("dddd - DD/MM/YYYY") }}
                    </p>
                    <p class="p-m-0">{{ timeSelected.format("HH:mm") }}</p>
                </div>
            </div>

            <div class="p-mt-4">
                <ConfirmDialog />
                <Button
                    @click="scheduleAppointment()"
                    icon="pi pi-check"
                    label="Confirmar agendamento"
                    class="p-mr-3"
                ></Button>
            </div>
        </template>
    </Card>

    <ProgressSpinner v-if="isLoading" class="c-loading-indicator" />
</template>

<script>
import Card from "primevue/card";
import Divider from "primevue/divider";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import ProgressSpinner from "primevue/progressspinner";

export default {
    components: {
        Card,
        Divider,
        Avatar,
        Button,
        ConfirmDialog,
        ProgressSpinner,
    },
    props: {
        serviceSelected: Object,
        professionalSelected: Object,
        timeSelected: Object,
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        /**
         * Appointment confirmation
         */
        scheduleAppointment() {
            console.log(this.serviceSelected);
            console.log(this.professionalSelected);
            console.log(this.timeSelected);

            this.$confirm.require({
                header: "Confirmação",
                message: "Vamos confirmar seu agendamento, tudo bem?",
                icon: "pi pi-exclamation-triangle",
                acceptLabel: "Sim",
                rejectLabel: "Não",
                accept: () => {
                    this.isLoading = true;

                    // create appointment
                    this.$axios
                        .post(
                            `${process.env.VUE_APP_SERVER_URL}/api/agendamentos`,
                            {
                                horario: this.timeSelected.toISOString(),
                                idCliente: JSON.parse(
                                    localStorage.getItem("user")
                                ).sfid,
                                idServico: this.serviceSelected.sfid,
                                idProfissional: this.professionalSelected.sfid,
                            }
                        )
                        .then((res) => {
                            console.log("res", res);

                            // redirect
                            this.$router.push("meus-agendamentos");
                        })
                        .finally(() => {
                            this.isLoading = false;
                        });
                },
                reject: () => {
                    // do nothing
                },
            });
        },
    },
};
</script>

<style>
.c-loading-indicator {
    position: fixed;
    z-index: 999;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
/* Transparent Overlay */
.c-loading-indicator:before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.53);
}
@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: #b99973;
    }
    40% {
        stroke: #b99973;
    }
    66% {
        stroke: #b99973;
    }
    80%,
    90% {
        stroke: #b99973;
    }
}
</style>

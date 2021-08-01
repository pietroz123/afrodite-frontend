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
                <Button
                    label="Confirmar agendamento"
                    @click="scheduleAppointment"
                    class="p-mt-3"
                />
            </div>
        </template>
    </Card>
</template>

<script>
import Card from "primevue/card";
import Divider from "primevue/divider";
import Avatar from "primevue/avatar";
import Button from "primevue/button";

export default {
    components: {
        Card,
        Divider,
        Avatar,
        Button,
    },
    props: {
        serviceSelected: Object,
        professionalSelected: Object,
        timeSelected: Object,
    },
    methods: {
        /**
         * Appointment confirmation
         */
        scheduleAppointment() {
            console.log(this.serviceSelected);
            console.log(this.professionalSelected);
            console.log(this.timeSelected);
        },
    },
};
</script>

<style></style>

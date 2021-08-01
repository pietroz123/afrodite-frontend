<template>
    <div class="">
        <NavBar />
    </div>
    <!-- <div>
        <Steps :model="items" :readonly="false" />
    </div>
    <div>
        <router-view
            v-slot="{ Component }"
            :formData="formObject"
            @prev-page="prevPage($event)"
            @next-page="nextPage($event)"
            @complete="complete"
        >
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div> -->

    <div class="p-pt-3 p-px-6">
        <h2 class="c-appointment-divider">Selecionar Serviço</h2>

        <SelectService
            :service-selected="serviceSelected"
            @service-selected="handleServiceSelection"
            @professional-selected="handleProfessionalSelection"
        />
    </div>

    <div v-if="serviceSelected" class="p-pt-3 p-px-6">
        <h2 class="c-appointment-divider">Selecionar Profissional</h2>

        <SelectProfessional
            :service="serviceSelected"
            :professional-selected="professionalSelected"
            @professional-selected="handleProfessionalSelection"
        />
    </div>

    <div v-if="serviceSelected && professionalSelected" class="p-pt-3 p-px-6">
        <h2 class="c-appointment-divider">Selecionar Horário</h2>

        <SelectSchedule
            :professional="professionalSelected"
            :service="serviceSelected"
            @time-selected="handleTimeSlotSelection"
        />
    </div>

    <div
        v-if="serviceSelected && professionalSelected && timeSelected"
        class="p-pt-3 p-px-6"
    >
        <h2 class="c-appointment-divider">Resumo</h2>

        <p>Serviço: {{ serviceSelected.name }}</p>
        <p>Profissional: {{ professionalSelected.name }}</p>
        <p>Horário: {{ timeSelected.format("dddd - DD/MM/YYYY") }}</p>

        <Button label="Confirmar agendamento" @click="scheduleAppointment" />
    </div>

    <ScrollTop :threshold="200" />
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import SelectProfessional from "@/components/SelectProfessional.vue";
import SelectService from "@/components/SelectService.vue";
import SelectSchedule from "@/components/SelectSchedule.vue";

// import Steps from "primevue/steps";
import Button from "primevue/button";
import ScrollTop from "primevue/scrolltop";

export default {
    components: {
        NavBar,
        SelectProfessional,
        SelectService,
        SelectSchedule,
        // Steps,
        Button,
        ScrollTop,
    },
    data() {
        return {
            items: [
                {
                    label: "Profissionais",
                    to: "/agendamento",
                },
                {
                    label: "Serviços",
                    to: "/agendamento/servicos",
                },
                {
                    label: "Horários",
                    to: "/agendamento/horarios",
                },
                {
                    label: "Resumo",
                    to: "/agendamento/resumo",
                },
            ],
            formObject: {},
            // new
            professionalSelected: null,
            serviceSelected: null,
            timeSelected: null,
        };
    },
    methods: {
        nextPage(event) {
            console.log("nextPage event", event);
            for (let field in event.formData) {
                this.formObject[field] = event.formData[field];
            }
            this.$router.push(this.items[event.pageIndex + 1].to);
        },
        prevPage(event) {
            console.log("prevPage event", event);
            this.$router.push(this.items[event.pageIndex - 1].to);
        },
        complete() {
            this.$toast.add({
                severity: "success",
                summary: "Order submitted",
                detail:
                    "Dear, " +
                    this.formObject.firstname +
                    " " +
                    this.formObject.lastname +
                    " your order completed.",
            });
        },
        /**
         * Appointment confirmation
         */
        scheduleAppointment() {
            console.log(this.serviceSelected);
            console.log(this.professionalSelected);
            console.log(this.timeSelected);
        },
        /**
         * Handlers
         */
        handleProfessionalSelection(professionalSelected) {
            console.log("🚀 / professionalSelected", professionalSelected);
            this.professionalSelected = professionalSelected;
        },
        handleServiceSelection(serviceSelected) {
            console.log("🚀 / serviceSelected", serviceSelected);
            this.serviceSelected = serviceSelected;
        },
        handleTimeSlotSelection(timeSlotSelected) {
            console.log("🚀 / timeSlotSelected", timeSlotSelected);
            this.timeSelected = timeSlotSelected;
        },
    },
};
</script>

<style lang="scss">
.c-appointment-divider {
    &::after {
        height: 5px;
        background: #7a664c;
        content: "";
        display: block;
        width: 100px;
        position: absolute;
    }
}
.c-selection-card {
    width: calc((100% / 6) - 0.5rem);
    &:hover {
        cursor: pointer;
        background: rgba(96, 125, 139, 0.04);
    }
    &.selected {
        border: 3px solid #b99973;
    }
}
</style>

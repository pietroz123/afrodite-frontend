<template>
    <layout-default>
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
            <h2 class="c-main-divider p-pb-3">Selecionar Serviço</h2>

            <SelectService
                :service-selected="serviceSelected"
                @service-selected="handleServiceSelection"
                @professional-selected="handleProfessionalSelection"
            />
        </div>

        <div v-if="serviceSelected" class="p-pt-3 p-px-6">
            <h2 class="c-main-divider p-pb-3">Selecionar Profissional</h2>

            <SelectProfessional
                :service="serviceSelected"
                :professional-selected="professionalSelected"
                @professional-selected="handleProfessionalSelection"
            />
        </div>

        <div
            v-if="serviceSelected && professionalSelected"
            class="p-pt-3 p-px-6"
        >
            <h2 class="c-main-divider p-pb-3">Selecionar Horário</h2>

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
            <h2 class="c-main-divider p-pb-3">Resumo</h2>

            <AppointmentReview
                :service-selected="serviceSelected"
                :professional-selected="professionalSelected"
                :time-selected="timeSelected"
            />
        </div>

        <ScrollTop :threshold="200" />
    </layout-default>
</template>

<script>
import SelectProfessional from "@/components/SelectProfessional.vue";
import SelectService from "@/components/SelectService.vue";
import SelectSchedule from "@/components/SelectSchedule.vue";
import AppointmentReview from "@/components/AppointmentReview.vue";

// import Steps from "primevue/steps";
import ScrollTop from "primevue/scrolltop";

export default {
    components: {
        SelectProfessional,
        SelectService,
        SelectSchedule,
        AppointmentReview,
        // Steps,
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
.c-w-100 {
    width: 100%;
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

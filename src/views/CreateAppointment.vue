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
        <SelectService
            @service-selected="handleServiceSelection"
            @professional-selected="handleProfessionalSelection"
        />
    </div>

    <div v-if="serviceSelected" class="p-pt-3 p-px-6">
        <SelectProfessional
            :service="serviceSelected"
            @professional-selected="handleProfessionalSelection"
        />
    </div>

    <div v-if="serviceSelected && professionalSelected" class="p-pt-3 p-px-6">
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
        <h2>Resumo</h2>

        <p>Serviço: {{ serviceSelected.name }}</p>
        <p>Profissional: {{ professionalSelected.name }}</p>
        <p>Horário: {{ timeSelected.format("dddd - DD/MM/YYYY") }}</p>
    </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
// import Steps from "primevue/steps";
import SelectProfessional from "../components/SelectProfessional.vue";
import SelectService from "../components/SelectService.vue";
import SelectSchedule from "../components/SelectSchedule.vue";

export default {
    components: {
        NavBar,
        // Steps,
        SelectProfessional,
        SelectService,
        SelectSchedule,
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

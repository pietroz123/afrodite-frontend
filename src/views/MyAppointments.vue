<template>
    <div class="">
        <NavBar />
    </div>
    <div class="p-pt-3 p-px-6">
        <h2 class="c-main-divider p-pb-3">Meus Agendamentos</h2>

        <FullCalendar v-if="options.events.length" :options="options" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import dayjs from "dayjs";
require("dayjs/locale/pt-br");
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import brLocale from "@fullcalendar/core/locales/pt-br";

export default {
    components: {
        NavBar,
        FullCalendar,
    },
    data() {
        return {
            options: {
                locale: brLocale,
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ],
                headerToolbar: {
                    left: "prev,next,today",
                    center: "title",
                    right: "listMonth,dayGridMonth,timeGridWeek,timeGridDay",
                },
                initialView: "listMonth",
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                events: [],
            },
            appointments: [],
        };
    },
    mounted() {
        dayjs.locale("pt-br");
        this.getAppointments();
    },
    methods: {
        /**
         * Recupera os agendamentos do cliente logado
         */
        getAppointments() {
            let authUser = JSON.parse(localStorage.getItem("user"));
            let mobilePhone = authUser.af_telefone_celular__c;

            this.$axios
                .get(
                    `${process.env.VUE_APP_SERVER_URL}/api/agendamentos/${mobilePhone}`
                )
                .then((res) => {
                    let appointments = res.data.rows;
                    this.appointments = appointments;
                    console.log("🚀 / appointments", appointments);

                    this.createEventsFromAppointments(appointments);
                });
        },
        /**
         * Transforma os agendamentos em eventos para a biblioteca FullCalendar
         */
        createEventsFromAppointments(sfAppointments) {
            let events = sfAppointments.map((app, i) => {
                return {
                    id: i,
                    title: `${app.pf_name} - ${app.sv_name}`,
                    start: new Date(app.ag_horario),
                };
            });
            console.log("🚀 / events", events);
            this.options.events = events;
        },
    },
};
</script>

<style>
.fc {
    max-height: calc(100vh - 200px);
}
</style>

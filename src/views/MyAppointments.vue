<template>
    <div class="">
        <NavBar />
    </div>
    <div class="p-pt-3 p-px-6">
        <h2>Meus Agendamentos</h2>

        <ul v-for="ap in appointments" :key="ap.ag_sfid">
            <li>{{ ap.ag_horario }}</li>
            <li>{{ ap.pf_name }}</li>
            <li>{{ ap.sv_name }}</li>
        </ul>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
    components: {
        NavBar,
    },
    data() {
        return {
            appointments: [],
        };
    },
    mounted() {
        this.getAppointments();
    },
    methods: {
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
                });
        },
    },
};
</script>

<style></style>

<template>
    <Menubar :model="items" class="p-px-6">
        <template #start>
            <img
                alt="logo"
                src="../assets/logo-nobg.png"
                height="40"
                class="p-ml-2"
            />
        </template>
        <template #end>
            <div class="p-mr-2" v-if="isLoggedIn">
                <Button
                    type="button"
                    class="p-button p-button-outlined p-button-secondary"
                    @click="toggle"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                >
                    <i class="pi pi-user p-pr-2"></i>
                    {{ authUser.name }}
                </Button>
                <Menu
                    v-if="isLoggedIn"
                    id="overlay_menu"
                    ref="menu"
                    :model="userItems"
                    :popup="true"
                    class="p-mr-2"
                />
            </div>
        </template>
    </Menubar>
</template>

<script>
import { mapActions } from "vuex";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";

export default {
    name: "NavBar",
    components: {
        Menubar,
        Menu,
    },
    data() {
        return {
            items: [
                {
                    label: "Novo Agendamento",
                    icon: "pi pi-calendar-plus",
                    to: "/agendamento",
                },
            ],
            userItems: [
                {
                    label: "Logout",
                    icon: "pi pi-sign-out",
                    command: () => {
                        this.logout();
                    },
                },
            ],
        };
    },
    computed: {
        isLoggedIn() {
            return localStorage.getItem("user") != null;
        },
        authUser() {
            return JSON.parse(localStorage.getItem("user"));
        },
    },
    methods: {
        ...mapActions(["logout"]),

        toggle(event) {
            this.$refs.menu.toggle(event);
        },
    },
};
</script>

<style>
.p-menubar {
    background: unset;
    color: #000000;
    border: unset;
    border-radius: unset;
}
.p-menubar-start {
    margin-right: 1rem;
}
</style>

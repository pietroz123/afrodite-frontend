<template>
    <div class="">
        <NavBar />
    </div>
    <div>
        <Steps :model="items" />
    </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Steps from 'primevue/steps';

export default {
    name: "Home",
    components: {
        NavBar,
		Steps,
    },
    data() {
        return {
            items: [
                {
                    label: "Personal",
                    to: "/steps",
                },
                {
                    label: "Seat",
                    to: "/steps/seat",
                },
                {
                    label: "Payment",
                    to: "/steps/payment",
                },
                {
                    label: "Confirmation",
                    to: "/steps/confirmation",
                },
            ],
        };
    },
};
</script>

<template>
  <div class="">
    <NavBar />
  </div>
</template>

<script>

// @ is an alias to /src
import CreateAppointment from "@/components/CreateAppointment.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    CreateAppointment,
  },
};
</script>


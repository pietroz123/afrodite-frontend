<template>
  <Menubar :model="items">
    <template #start>
      <img
        alt="logo"
        src="../assets/logoAfrodite.jpg"
        height="40"
        class="p-mr-2"
      />
    </template>
    <template #end>
      <i class="pi pi-user"></i>
      Bianca Gomes
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
  name: "NavBar",
  components: {
    Menubar,
  },
  data() {
    return {
      items: [
        {
        },
      ],
    };
  },
};
</script>


<style scoped>
.p-menubar {
  background: unset;
  color: #000000;
  border: unset;
  border-radius: unset;
}
</style>
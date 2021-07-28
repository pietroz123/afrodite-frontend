import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import api from "./modules/api";
import axios from "axios";

import PrimeVue from "primevue/config";

import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(PrimeVue).use(store).use(router).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import api from "./modules/api";
import axios from "axios";

/**
 * PrimeVue
 */
import PrimeVue from "primevue/config";
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

/**
 * Layouts
 */
app.component("layout-default", require("./layouts/LayoutDefault.vue").default);

/**
 * Global Libraries
 */
app.config.globalProperties.$axios = axios;

import ConfirmationService from "primevue/confirmationservice";
app.use(ConfirmationService);

app.use(PrimeVue).use(store).use(router).mount("#app");

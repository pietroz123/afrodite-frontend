import { createStore } from "vuex";

// Modules
import authModule from "./modules/auth";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: authModule,
    },
});

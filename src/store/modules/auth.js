import axios from "axios";
import router from "../../router";

export default {
    state: {
        status: {},
        authUser: null,
    },
    getters: {},
    mutations: {
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.authUser = user;
        },
        logout(state) {
            state.status = {};
            state.authUser = null;
        },
    },
    actions: {
        login({ commit }, mobilePhone, password) {
            console.log("🚀 / password", password);
            console.log("🚀 / mobilePhone", mobilePhone);

            mobilePhone = mobilePhone
                .replace("(", "")
                .replace(")", "")
                .replace("-", "")
                .replace(" ", "");

            axios
                .get(
                    `${process.env.VUE_APP_SERVER_URL}/api/clientes/${mobilePhone}`
                )
                .then((res) => {
                    let user = res.data;
                    console.log("user", user);

                    localStorage.setItem("user", JSON.stringify(user));
                    commit("loginSuccess", user);

                    router.push("/agendamento");
                })
                .catch((err) => {
                    console.log("error", err);
                });
        },
        logout({ commit }) {
            localStorage.removeItem("user");
            commit("logout");

            router.push("/");
        },
    },
};

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/agendamento",
        component: () => import("../views/CreateAppointment.vue"),
        children: [
            {
                path: "/agendamento/",
                component: () =>
                    import("../components/steps/ProfissionalStep.vue"),
            },
            {
                path: "/agendamento/servicos",
                component: () => import("../components/steps/ServicoStep.vue"),
            },
            {
                path: "/agendamento/horarios",
                component: () => import("../components/steps/HorariosStep.vue"),
            },
            {
                path: "/agendamento/resumo",
                component: () => import("../components/steps/ResumoStep.vue"),
            },
        ],
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/meus-agendamentos",
        component: () => import("../views/MyAppointments.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

/**
 * Middleware para verificação de páginas protegidas
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem("user") == null) {
            next({
                path: "/login",
                params: { nextUrl: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

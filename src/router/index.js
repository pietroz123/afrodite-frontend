import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/new-appointment",
		component: () => import('../views/CreateAppointment.vue'),
		children: [{
            path: '/new-appointment/',
            component: () => import('../components/steps/ProfissionalStep.vue')
        },
        {
            path: '/new-appointment/servicos',
            component: () => import('../components/steps/ServicoStep.vue')
        },
        {
            path: '/new-appointment/horarios',
            component: () => import('../components/steps/HorariosStep.vue')
        },
        {
            path: '/new-appointment/resumo',
            component: () => import('../components/steps/ResumoStep.vue')
        }]
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

export default router;

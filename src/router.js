import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';

import AdvancedSearch from './pages/AdvancedSearch.vue';

import SingleApartment from './pages/SingleApartment.vue';

import AboutUs from './pages/AboutUs.vue';

import NotFound from './pages/NotFound.vue';

import ThankYou from './pages/ThankYou.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },

        {
            path: '/advanced-search/:searchCity?/:distance?/:n_rooms?/:n_beds?/:services?',
            name: 'AdvancedSearch',
            component: AdvancedSearch,
        },

        {
            path: '/about-us',
            name: 'AboutUs',
            component: AboutUs,
        },

        {
            path: '/apartment/:slug',
            name: 'SingleApartment',
            component: SingleApartment,
        },

        {
            path: '/thank-you',
            name: 'thank-you',
            component: ThankYou,
        },

        {
            path: '/pagina-non-trovata',
            name: 'not-found',
            component: NotFound
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/pagina-non-trovata'
        }
    ]
})


export { router };
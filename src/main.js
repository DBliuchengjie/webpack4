import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './router/router';
import axios from 'axios';
import App from './view/app.vue';
import './lib/flexible';
import store from './store/index';

Vue.prototype.axios = axios;
Vue.use(VueRouter);
const router = new VueRouter({
    // mode: 'history',
    routes: routers
});
new Vue({
    el: '#app',
    router,
    store,
    render:h => h(App)
});
import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './router/router';
import axios from 'axios';
import App from './view/app.vue';
import './lib/flexible';
import store from './store/index';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.prototype.axios = axios;
Vue.use(VueRouter);
Vue.use(MintUI);
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
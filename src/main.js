import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import tooltipDirective from '@/directives/tooltip.directive';
import firebase from 'firebase/app';
import Loader from '@/components/app/Loader.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
    apiKey: 'AIzaSyDoHjJBCXdp1_xu68w8sbS41LTpf1BbVjg',
    authDomain: 'vue-crm-23342.firebaseapp.com',
    databaseURL: 'https://vue-crm-23342.firebaseio.com',
    projectId: 'vue-crm-23342',
    storageBucket: 'vue-crm-23342.appspot.com',
    messagingSenderId: '713370228371',
    appId: '1:713370228371:web:6a4e5e255476203846df66',
    measurementId: 'G-QRVY6Z0NEP',
});

let app;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount('#app');
    }
});

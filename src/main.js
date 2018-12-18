import Raphael from 'raphael/raphael'
import Morris from 'morris.js/morris'
import './assets/scripts.bundle.js'
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

global.colors = {
    brand: "#716aca",
    metal: "#c4c5d6",
    light: "#ffffff",
    accent: "#00c5dc",
    primary: "#5867dd",
    success: "#34bfa3",
    info: "#36a3f7",
    warning: "#ffb822",
    danger: "#f4516c"
};

new Vue({
    el: '#app',
    render: h => h(App)
});


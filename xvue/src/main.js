import Vue from 'vue'
import App from './App.vue'
import router from './router'
import animate from 'animate.css'
/*import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.use(VueAxios,axios);

Vue.use(ElementUI);
Vue.use(animate)


Vue.config.productionTip = false



// eslint-disable-next-line no-undef
/*alert($)*/

new Vue({
 router,
 render: h => h(App)
}).$mount('#app')


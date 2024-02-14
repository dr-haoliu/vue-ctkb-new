import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ECharts from 'vue-echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// import 'echarts/theme/shine'
// import 'echarts/theme/macarons'
// import 'echarts/theme/cool'




import locale from 'element-ui/lib/locale/lang/en'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import SimpleLineIcons from 'vue-simple-line'

// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'


Vue.use(LayoutPlugin)

// register BootstrapVue
Vue.use(BootstrapVue)
// optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(ElementUI, { locale })
Vue.use(axios)




// register component to use
Vue.component('simple-line-icons', SimpleLineIcons)

Vue.component('v-chart', ECharts)

// register global variables to use
// dev
Vue.prototype.$apiUrl = "http://localhost:8081";
// production
// Vue.prototype.$apiUrl = "http://34.69.146.90:8081/";
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

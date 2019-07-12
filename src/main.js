import Vue from 'vue'
import App from './App.vue'

import VueScrollTo from 'vue-scrollto'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faPencilAlt)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueScrollTo)

import UUID from 'vue-uuid';
 
Vue.use(UUID);

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

import router from './router'
import { i18n } from '@/services/i18n'
import { Trans } from './services/Translation'

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)


Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')

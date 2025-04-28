import { createApp } from 'vue'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.use(VueKeyCloak, {
  config: {
    url: 'http://localhost:8080',
    realm: 'inciteful',
    clientId: 'nextjs-app',
  },
  onReady(keycloak) {
    console.log('Keycloak ready', keycloak)
  },
  onAuthRefreshSuccess(keycloak) {
    console.log('Keycloak refresh success', keycloak)
  },
  onAuthLogout(keycloak) {
    console.log('Keycloak logout', keycloak)
  }
})
app.mount('#app')

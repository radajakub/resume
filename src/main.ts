import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

// create new application instance
const app = createApp(App)

// app.use(router)

// mount the app to the template in App to render the contents
app.mount('#app')

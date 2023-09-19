import '@/assets/main.css';

import { createApp } from 'vue';
import App from '@/App.vue';
// import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faEnvelope, faMobile, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faDiscord, faHackerrank, faKaggle } from '@fortawesome/free-brands-svg-icons';


/* add icons to the library */
library.add(
    faEnvelope,
    faMobile,
    faMapLocationDot,
    faLinkedin,
    faGithub,
    faDiscord,
    faHackerrank,
    faKaggle,
);

// create new application instance
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    // .use(router)
    .mount('#app');


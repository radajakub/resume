import "@/assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faEnvelope, faMobile, faMapLocationDot, faCalendarDays, faCakeCandles, faLanguage, faCode, faBrain, faPerson, faDumbbell, faChevronLeft, faChevronRight, faHeart, faUser, faInfo, faAward, faGraduationCap, faCodeBranch, faComputer, faLightbulb, faPaperclip, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faDiscord, faHackerrank, faKaggle, faAppStoreIos } from "@fortawesome/free-brands-svg-icons";

import { Data } from "@/data.ts";

/* add icons to the library */
library.add(
    faEnvelope,
    faMobile,
    faMapLocationDot,
    faCalendarDays,
    faCakeCandles,
    faLanguage,
    faCode,
    faBrain,
    faPerson,
    faDumbbell,
    faChevronLeft,
    faChevronRight,
    faLinkedin,
    faGithub,
    faDiscord,
    faHackerrank,
    faKaggle,
    faAppStoreIos,
    faHeart,
    faUser,
    faInfo,
    faAward,
    faGraduationCap,
    faCodeBranch,
    faComputer,
    faLightbulb,
    faPaperclip,
    faBuildingColumns,
);

const data: Data = Data.init();

// create new application instance
createApp(App)
    .provide("data", data)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");


import { createApp, h } from "vue";
import router from "./router/router";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "./index.css";

createApp(App).use(router).use(VueAxios, axios).mount("#app");

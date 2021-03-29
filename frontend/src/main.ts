import { createApp, h } from "vue";
import router from "./router/router";
import App from "./App.vue";
import "./index.css";

createApp(App).use(router).mount("#app");

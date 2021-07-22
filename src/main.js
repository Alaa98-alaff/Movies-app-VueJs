import { createApp } from "vue";
import routing from "./router/index";

import App from "./App.vue";

createApp(App).use(routing).mount("#app");

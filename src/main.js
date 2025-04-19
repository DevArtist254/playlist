import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});

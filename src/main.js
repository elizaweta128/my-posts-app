import {createApp} from 'vue'
import '@/theme.css'
import '@/reset.css'
import App from './App.vue'
import router from "@/router/router";
import directives from '@/directives'
import store from "@/store/index";


const app = createApp(App);


directives.forEach((directive) => {
    app.directive(directive.name, directive)
});

app
    .use(router)
    .use(store)
    .mount('#app')



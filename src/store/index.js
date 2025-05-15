import {createStore} from "vuex";
import {postModule} from "@/store/postModule";


const store = createStore({
    modules: {
        posts: postModule,
    },
});

export default store;
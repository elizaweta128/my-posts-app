import axios from "axios";

export const postModule = {
    state: () => {
        return {
            posts: [],
            isPostsLoading: false,
            selectedSort: "",
            sortOptions: [
                {value: "title", name: "По названию"},
                {value: "body", name: "По описанию"}
            ],
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
            arrayOfPages: [],
        }
    },
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) => {
                return post.title.toLowerCase().includes(state.searchQuery.toLowerCase());
            })
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPage(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
        async fetchPosts({commit, state}) {
            try {
                commit('setLoading', true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page:state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers["x-total-count"] / state.limit));
                commit('setPosts',response.data);
            } catch (error) {
                console.log(error.message);
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({commit, state}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers["x-total-count"] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    namespaced: true,
}
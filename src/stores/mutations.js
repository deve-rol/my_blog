import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_ADD_ARTICLE](state, payload) {
        let article = {
            ...payload,
            ...{
                id: state.articles.length > 0 ? state.articles[state.articles.length - 1].id + 1 : 1,
                comments: []
            }
        };
        state.articles.push(article);
        localStorage.setItem("articles", JSON.stringify(state.articles))
    },
    [mutation_types.M_EDIT_ARTICLE](state, payload) {
        state.articles.forEach( (val, key) => {
            if (val.id == payload.id){
                state.articles[key].title = payload.form.title;
                state.articles[key].short_description = payload.form.short_description;
                state.articles[key].description = payload.form.description;
            }
        });
        localStorage.setItem("articles", JSON.stringify(state.articles))
    },
    [mutation_types.M_ADD_COMMENT](state, payload) {
        state.articles.forEach((val, key) => {
            if (val.id === payload.id) {
                state.articles[key].comments.push(payload.form)
            }
        });
        localStorage.setItem("articles", JSON.stringify(state.articles))
    },
    [mutation_types.M_DELETE_COMMENTS](state, payload) {
        state.articles.forEach((val, key) => {
            if (val.id === payload.id) {
                state.articles[key].comments = state.articles[key].comments.filter((val, key2) => {
                   return !payload.comments.some(val => val === key2)
                })
            }
        });
        localStorage.setItem("articles", JSON.stringify(state.articles))
    },
    [mutation_types.M_DELETE_ARTICLE](state, payload) {
        state.articles = state.articles.filter(val => val.id !== payload);
        localStorage.setItem("articles", JSON.stringify(state.articles))
    }
};


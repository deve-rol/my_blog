import * as types from "./types";
import * as mutation_types from "./mutation_types";

export default {
    [types.A_ADD_ARTICLE] ( context, payload ) {
        context.commit(mutation_types.M_ADD_ARTICLE, payload);
    },
    [types.A_EDIT_ARTICLE] ( context, payload ) {
        context.commit(mutation_types.M_EDIT_ARTICLE, payload);
    },
    [types.A_ADD_COMMENT] ( context, payload ) {
        context.commit(mutation_types.M_ADD_COMMENT, payload);
    },
    [types.A_DELETE_COMMENTS] ( context, payload ) {
        context.commit(mutation_types.M_DELETE_COMMENTS, payload);
    },
    [types.A_DELETE_ARTICLE] ( context, payload ) {
        context.commit(mutation_types.M_DELETE_ARTICLE, payload);
    }
};
import { FluxStore } from "../../shared/flux/Util/Store.js";

const homeStore = new FluxStore({
    characters: []
});

homeStore.reduce = function(state, action) {
    if(action.type === ACTION_APPEND_EPISODES().type) {
        
    }
}

episodesStore.reduce = function (state, action) {
    /*  For following appends, you will mantain attributes for same id object */
    if (action.type === ACTION_APPEND_EPISODES().type) {
        const newEpisodes = action.episodes.filter((newEp) => {
            return state.episodes.findIndex(savedEp => {
                return savedEp.isEqual(newEp)
            }) == -1
        })
        
        return {
            episodes: state.episodes.concat(newEpisodes),
        }
    } else {
        return state
    }
}
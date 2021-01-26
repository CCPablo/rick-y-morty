import { FluxStore } from '../../flux/Util/Store.js'
import { ACTION_APPEND_EPISODES } from './episodes.actions.js'

const episodesStore = new FluxStore({
    episodes: [],
})

episodesStore.reduce = function (state, action) {
    /*  For following appends, you will mantain attributes for same id object */
    if (ACTION_APPEND_EPISODES().type) {
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

export function subscribeEpisodes(listener) {
    return {
        remove: episodesStore.onChange(listener),
        current: episodesStore.getState(),
    }
}

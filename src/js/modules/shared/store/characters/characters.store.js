import { FluxStore } from '../../flux/Util/Store.js'

const charactersStore = new FluxStore({
    characters: [],
})

charactersStore.reduce = function (state, action) {
    if (action.type == 'append-characters') {
        const newCharacters = action.characters.filter((newEp) =>
            state.characters.some((savedEp) => savedEp.id == newEp.id)
        )
        return {
            characters: state.characters.concat(newCharacters),
        }
    } else {
        return state
    }
}

export function charactersSub(listener) {
    return {
        remove: charactersStore.onChange(listener),
        current: charactersStore.getState(),
    }
}

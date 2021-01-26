import { FluxStore } from '../../shared/flux/Util/Store.js'
import { Episode } from './Epsiode.js'
import { Character } from './Character.js'
import { ACTION_APPEND_SIDENAV, ACTION_SET_SIDENAV, ACTION_RESET_STATE, ACTION_SET_CHARACTERS } from './sidenav.actions.js'

const sidenavStore = new FluxStore({
    episodes: [],
    characters: [],
    locations: []
})

sidenavStore.reduce = function (state, action) {
    if (action.type === ACTION_APPEND_SIDENAV().type) {
        const newOrChangedState = {}
        for(const type in action.payload) {
            newOrChangedState[type] = state[type].concat(action.payload[type]
            .map(item => mapToClass(item, type))
            .filter((item) => {
                return (
                    state[type].findIndex(stored =>
                        stored.isEqual(item)
                    ) === -1
                )
            }))
        }
        return newOrChangedState
    } else if(action.type === ACTION_SET_SIDENAV().type) {
        const newState = {}
        for(const type in action.payload) {
            newState[type] = action.payload[type].map(item => mapToClass(item, type))
        }
        return newState

    } else if(action.type === ACTION_SET_CHARACTERS().type) {
        const newCharacters = action.characters.map(rawCharacter => new Character(rawCharacter))
        return {
            episodes: [],
            characters: newCharacters,
            locations: []
        }
    } else if(action.type === ACTION_RESET_STATE().type) {
        return {
            episodes: [],
            characters: [],
            locations: []
        }
    } else {
        return state
    }

    function mapToClass(object, type) {
        if(type === 'episodes') {
            return new Episode(object)
        } else if(type === 'characters') {
            return new Character(object)
        } else {
            return null
        }
    }
}

export function getState() {
    return sidenavStore.getState()
}

sidenavStore.areEqual = function(starting, ending) {
    //TODO
    console.log('starting state', starting)
    console.log('ending state', ending)
    return false
}

export function subscribeSidenav(listener) {
    const removeListener = sidenavStore.onChange(listener);
    return () => {
        removeListener()
        sidenavStore.unregister()
    }
}

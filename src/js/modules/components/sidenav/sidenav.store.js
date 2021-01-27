import { FluxStore } from '../../shared/flux/Util/Store.js'
import { Episode } from './model/Epsiode.js'
import { Character } from './model/Character.js'
import { ACTION_APPEND_SIDENAV, ACTION_SET_SIDENAV, ACTION_RESET_STATE } from './sidenav.actions.js'
import { Location } from './model/Location.js'

const sidenavStore = new FluxStore({
    episode: [],
    character: [],
    location: []
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
    } else if(action.type === ACTION_RESET_STATE().type) {
        return {
            episode: [],
            character: [],
            location: []
        }
    } else {
        return state
    }

    function mapToClass(object, type) {
        if(type === 'episode') {
            return new Episode(object)
        } else if(type === 'character') {
            return new Character(object)
        } else if(type === 'location') {
            return new Location(object)
        }
    }
}

export function getState() {
    return sidenavStore.getState()
}

sidenavStore.areEqual = function(starting, ending) {
    //TODO
    return false
}

export function subscribeSidenav(listener) {
    const removeListener = sidenavStore.onChange(listener);
    return () => {
        removeListener()
        sidenavStore.unregister()
    }
}

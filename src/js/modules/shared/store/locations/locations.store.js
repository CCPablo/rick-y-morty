import { FluxStore } from "../../flux/Util/Store.js"
import { ACTION_APPEND_LOCATION } from "./locations.actions.js"

const locationsStore = new FluxStore({
    locations: []
})

locationsStore.reduce = function(state, action) {
    if(ACTION_APPEND_LOCATION.type) {
        const newLocations = action.locations.filter((newLoc) =>
            state.locations.some((savedLoc) => savedLoc.id == newLoc.id)
        )        
        return {
            locations: state.locations.concat(newLocations)
        }
    } else {
        return state
    }
}

export function subscribeLocations(listener) {
    return {
        remove: locationsStore.onChange(listener),
        current: locationsStore.getState()
    }
}
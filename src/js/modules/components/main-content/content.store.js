import { FluxStore } from "../../shared/flux/Util/Store.js";
import { Character } from "./model/Character.js";
import { ACTION_SET_CONTENT } from "./content.actions.js";
import { Episode } from "./model/Episode.js";
import { Location } from "./model/Location.js";

const contentStore = new FluxStore({
    item: {},
    type: ''
});

contentStore.reduce = function(state, action) {

    if(action.type === ACTION_SET_CONTENT().type) {
        return {
            item: mapToClass(action.payload),
            type: action.type
        }
    } else {
        return state
    }

    function mapToClass(payload) {
        switch(payload.type) {
            case 'episode': {
                return new Episode(payload.payload)
            }
            case 'character': {
                return new Character(payload.payload)
            }
            case 'location': {
                return new Location(payload.payload)
            }
        }
    }
}

export function subscribeContent(listener) {
    const removeListener = contentStore.onChange(listener);
    return () => {
        removeListener()
        sidenavStore.unregister()
    }
}

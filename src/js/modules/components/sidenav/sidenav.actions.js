export const ACTION_APPEND_SIDENAV = (payload) => {
    return {
        type: 'append-sidenav',
        payload: payload,
    }
}

export const ACTION_SET_SIDENAV = (payload) => {
    return {
        type: 'set-sidenav',
        payload: payload
    }
}

export const ACTION_SET_CHARACTERS = (characters) => {
    return {
        type: 'set-episodes',
        characters: characters,
    }
}

export const ACTION_RESET_STATE = () => {
    return {
        type: 'reset-state'
    }
}

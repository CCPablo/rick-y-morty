
const PREFIX = 'ID_'

export class Dispatcher {
    constructor() {
        this._callbacks = {}
        this._lastID = 1
    }

    register(callback) {
        var id = PREFIX + this._lastID++
        this._callbacks[id] = callback
        return id
    }

    unregister(id) {
        delete this._callbacks[id]
    }

    dispatch(action) {
		for (var id in this._callbacks) {
			this._callbacks[id](action)
		}
    }
}

import { DISPATCHER } from '../dispatcher.js'
import { EventEmitter } from './EventEmitter.js'

const CHANGE_EVENT = 'change'

export class FluxStore {
    
    constructor(initialState = {}) {
        this._state = initialState

        /* Shared dispatcher for the application */
        this._dispatcher = DISPATCHER

        this._emitter = new EventEmitter()
        this._dispatchId = this._dispatcher.register((action) => {
            this._invokeOnDispatch(action)
        })
    }

    /*  You must override this method
    *   Ex:
    *       reduce(state, action): number {
    *           switch(action.type) {
    *           case: 'add':
    *               return state + action.value;
    *           case: 'double':
    *               return state * 2;
    *           default:
    *               return state;
    *           }
    *       }
    */
    reduce(state, action) {
        throw new Error('you must implement this method')
    }

    /* You must override this method in case state is inmutable */
    areEqual(startingState, endingState) {
        return startingState == endingState
    }

    getState() {
        return this._state
    }

    unregister() {
        DISPATCHER.unregister(this._dispatchId)
    }

    onChange(callback) {
        return this._emitter.addListener(CHANGE_EVENT, callback.bind(this))
    }

    _invokeOnDispatch(action) {
        let changed = false;
    
        const startingState = this._state;
        const endingState = this.reduce(startingState, action);
    
        if (!this.areEqual(startingState, endingState)) {
          this._state = endingState;
          changed = true
        }
    
        if (changed) {
          this._emitter.emit(CHANGE_EVENT, this._state);
        }
      }
}

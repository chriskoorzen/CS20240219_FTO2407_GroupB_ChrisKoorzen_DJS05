/**
 * @typedef {Object} GenericStore A generic store that keeps track of application state.
 * @prop {function(Dispatcher): [State, State]} dispatch Triggers the passed user-defined Dispatcher. Returns current State and previous State.
 * @prop {function} rewind A method to rewind application state to an earlier version (if exists)
 * @prop {function} forward A method to forward application state to a newer version (if exists)
 * @prop {function} getState Returns the current state of the application.
 * @prop {function} subscribe Registers a Subscriber. Returns the unsubscribe function bound to the Subscriber passed
 * @prop {function} unsubscribe Removes a Subscriber.
 */
/**
 * @typedef {Object} State
 * A user-defined object that represents the state of the application
 */
/**
 * A user-defined function that accepts the current state of the application, modifies it in some way (or not)
 * and returns the updated state of the application.
 * @callback Dispatcher
 * @param {State} currentState 
 * @returns {State} Newly updated State object
 */
/**
 * A callback function that wants to stay updated on any changes in application state. On state change, the current and previous
 * (immutable) states of the application is passed to this callback.
 * @callback Subscriber
 * @param {State} currentState
 * @param {State} previousState
 */


/**
 * Factory function to create GenericStore objects. A user-defined application state object is passed to initialize the store.
 *
 * @constructs GenericStore
 * @param {State} initial
 */
export const createStore = (initial) => {

    const states = [Object.freeze(initial)];
    let history = 0;
    const subscribers = new Set();


    /**
     * Triggers the passed user-defined Dispatcher. Returns current State and previous State to the dispatcher.
     *
     * @param {Dispatcher} action A user defined function that accepts a State object (read-only), and must return a new State object.
     * @returns {[State, State]} An Array with the new State at index 0, and the previous State at index 1.
     */
    const dispatch = (action) => {
        if(typeof action !== "function"){
            throw new Error("action is required to be a function");
        };

        /**
         * If the user navigated away from the most current state, and calls a dispatch,
         * we must prune the state-branch at that position, and start a new history.
         */
        if (history !== (states.length-1)){
            states.splice(history+1, (states.length-history));
        };

        const prev = getState();
        const next = Object.freeze(action(prev));

        _trigger_subscribers(next, prev);

        history = states.push(next) - 1;

        return [next, prev];
    };


    /** A method to rewind application state to an earlier version (if exists) */
    const rewind = () => {
        if (history === 0) return;

        const prev = getState();
        history -= 1;
        const next = getState();

        _trigger_subscribers(next, prev);
    };

    /** A method to forward application state to a newer version (if exists) */
    const forward = () => {
        if (history === (states.length-1)) return;

        const prev = getState();
        history += 1;
        const next = getState();

        _trigger_subscribers(next, prev);
    };

    
    /**
     * Returns the current state of the application.
     *
     * @returns {State}
     */
    const getState = () => {
        return states[history];
    };

    
    /**
     * Registers a Subscriber. Returns the unsubscribe function bound to the Subscriber passed.
     *
     * @param {Subscriber} handler
     * @returns {unsubscribe(handler:Subscriber)}
     */
    const subscribe = (handler) => {
        if(typeof handler !== "function"){
            throw new Error("handler is required to be a function");
        };

        subscribers.add(handler);

        const removeSubscriber = () => {
            return unsubscribe(handler);
        };

        return removeSubscriber;
    };

    
    /**
     * Removes a Subscriber.
     * 
     * @param {Subscriber} handler
     * @returns {Boolean}
     */
    const unsubscribe = (handler) => {
        return subscribers.delete(handler);
    };

    /** Internal function that runs all registered subscribers */
    const _trigger_subscribers = (next, prev) => {
        subscribers.forEach(
            (handler) => { 
                try {                       // Subscriber failure shouldn't break state updates
                    handler(next, prev); 
                } catch (error){
                    console.error("Subscriber handler function failed on dispatch.", error);
                };
            }
        );
    };

    return {
        dispatch,
        rewind,
        forward,
        getState,
        subscribe,
        unsubscribe
    };
};
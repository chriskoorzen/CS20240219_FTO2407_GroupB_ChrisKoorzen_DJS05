/**
 * @typedef {Object} GenericStore A generic store that keeps track of application state.
 * @prop {function(Dispatcher): [CurrentState, PreviousState]} dispatch Triggers the passed user-defined Dispatcher. Returns CurrentState and PreviousState.
 * @prop {function} getState Returns the current state of the application.
 * @prop {function} subscribe Registers a Subscriber.
 * @prop {function} unsubscribe Removes a Subscriber.
 */
/**
 * @typedef {Object} CurrentState
 * A user-defined object that represents the current state of the application
 */

/**
 * @typedef {Object} PreviousState
 * A user-defined object that represents the previous state of the application
 */
/**
 * A user-defined function that accepts the current state of the application, modifies it in some way (or not)
 * and returns the updated state of the application.
 * @callback Dispatcher
 * @param {CurrentState} currentState
 * @returns {CurrentState}
 */
/**
 * A callback function that wants to stay updated on any changes in application state. On state change, the current and previous
 * (immutable) states of the application is passed to this callback.
 * @callback Subscriber
 * @param {CurrentState} currentState
 * @param {PreviousState} previousState
 */


/**
 * Factory function to create GenericStore objects. A user-defined application state object is passed to initialize the store.
 *
 * @constructs GenericStore
 * @param {Object} initial
 */
export const createStore = (initial) => {

    const states = [Object.freeze(initial)];
    const subscribers = new Set();

    
    /**
     * Triggers the passed user-defined Dispatcher. Returns CurrentState and PreviousState.
     *
     * @param {Dispatcher} action
     * @returns {[CurrentState, PreviousState]}
     */
    const dispatch = (action) => {
        if(typeof action !== "function"){
            throw new Error("action is required to be a function");
        };

        const prev = getState();
        const next = Object.freeze(action(prev));

        subscribers.forEach(
            (handler) => { 
                try {
                    handler(next, prev); 
                } catch (error){
                    console.error("Subscriber handler function failed on dispatch.");
                    console.error(error);
                };
            }
        );
        
        states.push(next);

        return [next, prev];
    };

    
    /**
     * Returns the current state of the application.
     *
     * @returns {CurrentState}
     */
    const getState = () => {
        return states[states.length -1];
    };

    
    /**
     * Registers a Subscriber.
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

    return {
        dispatch,
        getState,
        subscribe,
        unsubscribe
    };
};
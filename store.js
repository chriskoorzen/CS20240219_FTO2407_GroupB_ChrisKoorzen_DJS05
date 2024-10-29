
export const createStore = (initial) => {

    const states = [Object.freeze(initial)];
    const subscribers = new Set();

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

    const getState = () => {
        return states[states.length -1];
    };

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
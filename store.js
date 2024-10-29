
const createStore = (initial) => {

    const states = [Object.freeze(initial)];
    const subscribers = new Set();

    const dispatch = (action) => {

        const prev = getState();
        const next = Object.freeze(action(prev));

        subscribers.forEach(
            (handler) => { handler(next, prev); }
        );
        
        states.push(next);

        return [next, prev];
    };

    const getState = () => {
        return states[states.length -1];
    };

    const subscribe = (handler) => {
        subscribers.add(handler);

        const removeSubscriber = () => {
            return unsubscribe(handler);
        };

        return removeSubscriber;
    };

    const unsubscribe = (handler) => {
        return subscribers.delete(handler);
    };

    return [dispatch, getState, subscribe, unsubscribe];
};

const createStore = (initial) => {

    const states = [initial];
    const subscribers = new Set();

    const dispatch = (action) => {};

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
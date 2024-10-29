
const createStore = (initial) => {

    const states = [initial];
    const subscribers = [];

    const dispatch = (action) => {};

    const getState = () => {
        return states[states.length -1];
    };

    const subscribe = (handler) => {};

    return [dispatch, getState, subscribe];
};
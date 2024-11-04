/**
 * Define application state object structure.
 * @param count Keeps track of the count.
 */
export const initialCounter = {
    count: 0
};

/**
 * A method to add one to the count.
 */
export const add = (counter) => {
    return {
        count: counter.count +1
    };
};

/**
 * A method to remove one from the count.
 */
export const subtract = (counter) => {
    return {
        count: counter.count -1
    };
};

/**
 * A method to reset the counter to zero.
 */
export const reset = (counter) => {
    return {
        count: 0
    };
};

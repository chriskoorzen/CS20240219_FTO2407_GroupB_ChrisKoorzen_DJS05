
export const initialCounter = {
    count: 0
};

export const add = (counter) => {
    return {
        count: counter.count +1
    };
};

export const subtract = (counter) => {
    return {
        count: counter.count -1
    };
};

export const reset = (counter) => {
    return {
        count: 0
    };
};

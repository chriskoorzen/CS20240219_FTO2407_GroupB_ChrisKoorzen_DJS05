
const initialCounter = {
    count: 0
};

const add = (counter) => {
    return {
        count: counter.count +1
    };
};

const subtract = (counter) => {
    return {
        count: counter.count -1
    };
};

const reset = (counter) => {
    return {
        count: 0
    };
};

import { createStore } from "./store.js";
import { 
    add,
    subtract,
    reset
} from "./tally.js";
import { sleep } from "./utility.js";

// -- Init --
const tallyStore = createStore(
    { count: 0 }
);

// Register anonymous listener function
tallyStore.subscribe((current, old)=>{
    console.log("My old value is:", old, '\n', "My new value is: ", current);
})

// Scenario 1
await sleep(1000);
console.log("Scenario 1: ", tallyStore.getState());

// Scenario 2
await sleep(750);
tallyStore.dispatch(add);
tallyStore.dispatch(add);
console.log("Scenario 2: ", tallyStore.getState());

// Scenario 3
await sleep(750);
tallyStore.dispatch(subtract);
console.log("Scenario 3: ", tallyStore.getState());

// Scenario 4
await sleep(750);
tallyStore.dispatch(reset);
console.log("Scenario 4: ", tallyStore.getState());
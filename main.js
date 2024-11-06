import { createStore } from "./store.js";
import { 
    add,
    subtract,
    reset
} from "./tally.js";

import { update } from "./note.js";

import { sleep } from "./utility.js";

// -- Demonstrate project brief --
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


// ---- Demonstrate UI coupling ----
// Setup
const noteStore = createStore(
    { words: "begin" }
);

// Subscribe to changes
noteStore.subscribe((next, prev)=>{
    document.getElementById("display").innerText = next.words;
});
// Sync to UI
document.getElementById("display").innerText = noteStore.getState().words;

// Navigate history
document.getElementById("back").addEventListener("click", noteStore.rewind);
document.getElementById("forward").addEventListener("click", noteStore.forward);

// Update with new input
document.getElementById("save").addEventListener("click", ()=>{
    const input = document.getElementById("input").value;

    const save = update.bind(null, input);          // Bind extra parameters
    noteStore.dispatch(save);                       // Dispatch

    document.getElementById("input").value = "";     // Reset

});

// (for ease of use) Listen on Enter as well
document.getElementById("input").addEventListener("keyup", (event)=>{
    if (event.key === "Enter"){
        const input = document.getElementById("input").value;

        const save = update.bind(null, input);          // Bind extra parameters
        noteStore.dispatch(save);                       // Dispatch
    
        document.getElementById("input").value = "";     // Reset
    };

});
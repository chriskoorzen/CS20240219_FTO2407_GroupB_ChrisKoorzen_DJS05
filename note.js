/**
 * Define application state object structure.
 * @param words Keeps track words saved by the user.
 */
export const initialNotepad = {
    words: "start"
};

/**
 * A method to update the stored words
 */
export const update = (newInput, notepad) => {
    return {
        words: newInput
    };
};

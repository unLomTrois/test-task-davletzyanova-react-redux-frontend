import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const notesAdapter = createEntityAdapter({
  selectId: (note) => note.id,

  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = notesAdapter.getInitialState({
  value: [
    {
      title: "kek",
      description: "lorem keksum",
      id: 0,
    },
    {
      title: "lol",
      description: "lorem lolsum",
      id: 1,
    },
  ],
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // addNote: (state, action) => {
    //   state.push(action.payload);
    // },
    // editNoteTitle: (state, action) => {
    //   console.log(action.payload);
    //   // state[]
    // },
  },
});

export const { testStore } = notesSlice.actions;

export const selectNotes = (state) => state.notes.value;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds
  // Pass in a selector that returns the posts slice of state
} = notesAdapter.getSelectors(state => state.posts)

export default notesSlice.reducer;

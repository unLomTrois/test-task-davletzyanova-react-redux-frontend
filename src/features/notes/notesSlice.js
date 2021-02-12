import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk("notes/fetchAll", async () => {
  const response = await fetch("api/notes", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  return response;
});

export const notesAdapter = createEntityAdapter({
  selectId: (note) => note.id,
});

const emptyState = notesAdapter.getInitialState();

const filledState = notesAdapter.upsertMany(emptyState, []);

export const notesSlice = createSlice({
  name: "notes",
  initialState: filledState,
  reducers: {
    setAllNotes: notesAdapter.setAll,
    notesAddOne: notesAdapter.addOne,
    notesAddMany: notesAdapter.addMany,
    notesUpdate: notesAdapter.updateOne,
    notesRemove: notesAdapter.removeOne,
  },
  extraReducers: {
    [fetchNotes.fulfilled]: (state, action) => {
      notesAdapter.setAll(state, action.payload);
    },
  },
});

// actions
export const {
  setAllNotes,
  notesAddOne,
  notesAddMany,
  notesUpdate,
  notesRemove,
} = notesSlice.actions;

// selectors
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  selectTotal: selectTotalNotes,
  // Pass in a selector that returns the posts slice of state
} = notesAdapter.getSelectors((state) => state.notes);

export const getLastNoteID = (state) => {
  const notes = selectAllNotes(state);

  return notes[notes.length - 1]?.id ?? -1;
};

export default notesSlice.reducer;

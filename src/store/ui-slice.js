import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { gameIsVisible: false },
    reducers: {
        next(state, action) {
            state.gameIsVisible = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
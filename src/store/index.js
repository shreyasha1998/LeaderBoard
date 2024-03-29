import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import gameSlice from './game-slice';


const store = configureStore({
    reducer: { ui: uiSlice.reducer, game: gameSlice.reducer },
});

export default store;
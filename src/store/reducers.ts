import { PayloadAction } from '@reduxjs/toolkit';
import eGameType from '../enums/eGameType';
import IGameState from '../interfaces/IGameState';

const reducers = {
    changeHistory(state: IGameState, action: PayloadAction<string[]>) {
        const nextHistory = [...state.history.slice(0, state.currentMove + 1), action.payload];
        state.history = nextHistory;
    },
    resetHistory(state: IGameState, action: PayloadAction<string[][]>) {
        state.history = action.payload;
    },
    changeCurrentMove(state: IGameState) {
        state.currentMove = state.history.length - 1;
    },
    changeCurrentMoveToIndex(state: IGameState, action: PayloadAction<number>) {
        state.currentMove = action.payload;
    },
    resetCurrentMove(state: IGameState, action: PayloadAction<number>) {
        state.currentMove = action.payload;
    },
    changeGameType(state: IGameState, action: PayloadAction<eGameType>) {
        state.gameType = action.payload;
    },
};

export default reducers;

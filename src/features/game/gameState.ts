import { createSlice } from '@reduxjs/toolkit';
import { ALL_SQUARES, EMPTY, STARTING_MOVE } from '../../constants/constants';
import eGameType from '../../enums/eGameType';
import IGameState from '../../interfaces/IGameState';
import gameReducers from '../../store/reducers';
import { RootState } from '../../store/store';

const initialState: IGameState = { history: [Array(ALL_SQUARES).fill(EMPTY)], currentMove: STARTING_MOVE, gameType: eGameType.Two_Players };

const gameState = createSlice({
    name: 'game',
    initialState,
    reducers: gameReducers,
});

export const { changeHistory, changeCurrentMove, changeGameType, resetHistory, resetCurrentMove, changeCurrentMoveToIndex } =
    gameState.actions;
export const selectGame = (state: RootState) => state.game;

export default gameState.reducer;

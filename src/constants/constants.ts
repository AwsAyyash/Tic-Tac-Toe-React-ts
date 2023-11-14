import eScores from '../enums/eScores';

export const DIMENSIONS = 3;
export const ALL_SQUARES = 9;
export const WinnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
export const GAME_OVER = 'game-over';
export const WIN_SCORE = eScores.O;
export const LOSE_SCORE = eScores.X;
export const DRAW_SCORE = eScores.draw;
export const POSITIVE_INFINITY = Infinity;
export const NEGATIVE_INFINITY = -Infinity;
export const EMPTY = '';
export const MINUS_ONE = -1;
export const GOTO_MOVE = 'Go to move #';
export const GOTO_START = 'Go to game start';
export const STARTING_MOVE = 0;

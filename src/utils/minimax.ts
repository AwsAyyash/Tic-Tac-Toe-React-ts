import { ALL_SQUARES, DRAW_SCORE, EMPTY, LOSE_SCORE, NEGATIVE_INFINITY, POSITIVE_INFINITY, WIN_SCORE } from '../constants/constants';
import ePlayerLetter from '../enums/ePlayerLetter';
import IWinnerResult from '../interfaces/IWinnerResult';
import { calculateWinner, isDraw } from './utils';

const minimax = (squares: string[], depth: number = 0, isMaximizing: boolean): number => {
    const winningResult: IWinnerResult | null = calculateWinner(squares);
    let score: number;

    if (winningResult) {
        if (winningResult.winner === ePlayerLetter.X) {
            score = LOSE_SCORE;
        } else {
            score = WIN_SCORE;
        }
        return score;
    } else if (isDraw(squares)) {
        score = DRAW_SCORE;
        return score;
    }

    const evaluateMove = (index: number, playerLetter: ePlayerLetter): number => {
        squares[index] = playerLetter;
        const scoreM = minimax(squares, depth + 1, !isMaximizing);
        squares[index] = EMPTY;
        return isMaximizing ? Math.max(scoreM, currentBestScore) : Math.min(scoreM, currentBestScore);
    };

    let currentBestScore: number = isMaximizing ? NEGATIVE_INFINITY : POSITIVE_INFINITY;

    for (let i = 0; i < ALL_SQUARES; i++) {
        if (squares[i] === EMPTY) {
            const currentPlayerLetter = isMaximizing ? ePlayerLetter.O : ePlayerLetter.X; // assuming the 'O' is for the AI
            const scoreM = evaluateMove(i, currentPlayerLetter);
            currentBestScore = isMaximizing ? Math.max(scoreM, currentBestScore) : Math.min(scoreM, currentBestScore);
        }
    }

    return currentBestScore;
};

export default minimax;

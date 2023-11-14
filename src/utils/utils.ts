import { ALL_SQUARES, EMPTY, MINUS_ONE, NEGATIVE_INFINITY, WinnerLines } from '../constants/constants';
import ePlayerLetter from '../enums/ePlayerLetter';
import EPlayerLetter from '../enums/ePlayerLetter';
import eStatus from '../enums/eStatus';
import ITurnStatusResult from '../interfaces/ITurnStatusResult';
import IWinnerResult from '../interfaces/IWinnerResult';
import minimax from './minimax';

export function calculateWinner(squares: string[]): IWinnerResult | null {
    for (let i = 0; i < WinnerLines.length; i++) {
        const [a, b, c] = WinnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winnerLetter = squares[a] === ePlayerLetter.X ? ePlayerLetter.X : ePlayerLetter.O;
            return { winner: winnerLetter, lines: WinnerLines[i] };
        }
    }

    return null;
}

export function isDraw(squares: string[]): boolean {
    return squares.every(element => element !== EMPTY);
}

export const aiMove = (nextSquares: string[]): string[] | null => {
    const winningResult = calculateWinner(nextSquares);
    if (winningResult || isDraw(nextSquares)) {
        return null;
    }
    let bestScore: number = NEGATIVE_INFINITY;
    let bestMove: number = MINUS_ONE;

    const nextSquaresCopy = [...nextSquares];

    for (let i = 0; i < ALL_SQUARES; i++) {
        // play only if it is an available spot
        if (nextSquaresCopy[i] === EMPTY) {
            nextSquaresCopy[i] = EPlayerLetter.O; // the ai letter is assumed to be 'O'
            let score = minimax(nextSquaresCopy, 0, false);
            nextSquaresCopy[i] = EMPTY;

            if (score >= bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    nextSquaresCopy[bestMove] = EPlayerLetter.O;

    return nextSquaresCopy;
};

export function calculateStatus(winnerResult: IWinnerResult | null, currentSquares: string[], xIsNext: boolean): ITurnStatusResult {
    let turnStatus;
    let isGameOver: boolean = false;
    if (winnerResult) {
        turnStatus = eStatus.Winner + ': ' + winnerResult.winner;
        isGameOver = true;
    } else {
        if (isDraw(currentSquares)) {
            turnStatus = eStatus.Draw;
        } else {
            turnStatus = eStatus.Next + ': ' + (xIsNext ? 'X' : 'O');
        }
    }
    return { turnStatus: turnStatus, isGameOver: isGameOver };
}

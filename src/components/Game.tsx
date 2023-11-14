import { useCallback } from 'react';
import { ALL_SQUARES, EMPTY, STARTING_MOVE } from '../constants/constants';
import eGameType from '../enums/eGameType';
import ePlayer from '../enums/ePlayer';
import ePlayerLetter from '../enums/ePlayerLetter';
import {
    changeCurrentMove,
    changeCurrentMoveToIndex,
    changeGameType,
    changeHistory,
    resetCurrentMove,
    resetHistory,
} from '../features/game/gameState';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import IWinnerResult from '../interfaces/IWinnerResult';
import { aiMove, calculateStatus, calculateWinner } from '../utils/utils';
import { Board } from './Board';
import GameType from './GameType';
import History from './History';
import Status from './Status';

export default function Game() {
    const history = useAppSelector(state => state.game.history);
    const currentMove = useAppSelector(state => state.game.currentMove);
    const gameType = useAppSelector(state => state.game.gameType);

    const dispatch = useAppDispatch();

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    let currentPlayer: ePlayer = ePlayer.Human;

    const winnerResult: IWinnerResult | null = calculateWinner(currentSquares);
    const { turnStatus, isGameOver } = calculateStatus(winnerResult, currentSquares, xIsNext);

    const resetGame = useCallback(() => {
        dispatch(resetHistory([Array(ALL_SQUARES).fill(EMPTY)]));
        dispatch(resetCurrentMove(STARTING_MOVE));
    }, []);
    function onChangeGameType(event: any) {
        dispatch(changeGameType(event.target.value));
        resetGame();
    }

    const handleSquareOnClickAI = (index: number): void => {
        const winner = calculateWinner(currentSquares); // isGameOver
        if (currentSquares[index] || winner || currentPlayer === ePlayer.AI) {
            return;
        }
        const nextSquares = [...currentSquares];
        nextSquares[index] = ePlayerLetter.X;
        dispatch(changeHistory(nextSquares));
        dispatch(changeCurrentMove());
        currentPlayer = ePlayer.AI;
        const newSquares = aiMove(nextSquares);

        if (newSquares) {
            dispatch(changeHistory(newSquares));
            dispatch(changeCurrentMove());
        }
        currentPlayer = ePlayer.Human;
    };

    const handleSquareOnClickTwoPlayers = (index: number): void => {
        const winner = calculateWinner(currentSquares); // isGameOver
        if (currentSquares[index] || winner) {
            return;
        }
        const nextSquares = [...currentSquares];

        if (xIsNext) {
            nextSquares[index] = ePlayerLetter.X;
        } else {
            nextSquares[index] = ePlayerLetter.O;
        }
        dispatch(changeHistory(nextSquares));
        dispatch(changeCurrentMove());
    };

    function jumpTo(nextMove: number) {
        dispatch(changeCurrentMoveToIndex(nextMove));
    }

    const squareButtonOnClick = gameType === eGameType.Two_Players ? handleSquareOnClickTwoPlayers : handleSquareOnClickAI;
    return (
        <>
            <header>
                <GameType handleRadioOnClick={onChangeGameType} />
                <Status status={turnStatus} />
            </header>
            <main className="game">
                <div className="game-board">
                    <Board handleSquareButtonOnClick={squareButtonOnClick} isGameOver={isGameOver} winnerLine={winnerResult?.lines} />
                </div>
                <History handleJumpTo={jumpTo} />
            </main>
        </>
    );
}

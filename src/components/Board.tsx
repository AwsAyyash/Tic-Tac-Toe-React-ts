import { FC } from 'react';
import { DIMENSIONS } from '../constants/constants';
import { useAppSelector } from '../hooks/hooks';
import IBoardProps from '../interfaces/IBoardProps';
import Square from './Square';

export const Board: FC<IBoardProps> = ({ handleSquareButtonOnClick, isGameOver, winnerLine }) => {
    const history = useAppSelector(state => state.game.history);
    const currentMove = useAppSelector(state => state.game.currentMove);
    const currentSquares = history[currentMove];

    const renderSquare = (squareIndex: number) => {
        const chooseIsGameOver = isGameOver && winnerLine?.includes(squareIndex);

        return (
            <Square
                key={squareIndex}
                handleButtonOnClick={() => handleSquareButtonOnClick(squareIndex)}
                value={currentSquares[squareIndex]}
                isGameOver={chooseIsGameOver}
            />
        );
    };

    const renderBoardRow = (row: number) => {
        const squaresInRow: JSX.Element[] = Array(DIMENSIONS)
            .fill(null)
            .map((_, col) => renderSquare(row * DIMENSIONS + col));
        return (
            <div key={row} className="board-row">
                {squaresInRow}
            </div>
        );
    };

    const boardRows = Array(DIMENSIONS)
        .fill(null)
        .map((_, row) => renderBoardRow(row));

    return <>{boardRows}</>;
};

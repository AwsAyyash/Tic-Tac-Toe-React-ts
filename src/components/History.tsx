import { FC } from 'react';
import { GOTO_MOVE, GOTO_START } from '../constants/constants';
import { useAppSelector } from '../hooks/hooks';
import IHistoryProps from '../interfaces/IHistoryProps';

const History: FC<IHistoryProps> = ({ handleJumpTo }) => {
    const history = useAppSelector(state => state.game.history);

    const historyMoves = history.map((_, move) => {
        const description = move ? GOTO_MOVE + move : GOTO_START;

        return (
            <li key={move}>
                <button onClick={() => handleJumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <div className="game-info">
            <ol>{historyMoves}</ol>
        </div>
    );
};

export default History;

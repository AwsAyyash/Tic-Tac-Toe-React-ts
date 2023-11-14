import { FC } from 'react';
import eGameType from '../enums/eGameType';
import { useAppSelector } from '../hooks/hooks';
import IGameTypeProps from '../interfaces/IGameTypeProps';

const GameType: FC<IGameTypeProps> = ({ handleRadioOnClick }) => {
    const gameType: string = useAppSelector(state => state.game.gameType);

    return (
        <div>
            <label>Choose game type: </label>
            {Object.values(eGameType).map((type: eGameType) => (
                <span key={type}>
                    <label htmlFor={type}>{type}</label>
                    <input type="radio" value={type} name="type" checked={gameType === type} onChange={handleRadioOnClick} />
                </span>
            ))}
        </div>
    );
};

export default GameType;

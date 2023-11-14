import { FC } from 'react';
import { EMPTY, GAME_OVER } from '../constants/constants';
import ISquareProps from '../interfaces/ISquareProps';

const Square: FC<ISquareProps> = ({ handleButtonOnClick, value, isGameOver }) => {
    const className = isGameOver ? GAME_OVER : EMPTY;
    return (
        <button className={'square ' + className} onClick={handleButtonOnClick} color="white">
            {value}
        </button>
    );
};

export default Square;

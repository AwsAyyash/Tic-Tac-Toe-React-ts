import eGameType from '../enums/eGameType';

export default interface IGameState {
    history: string[][];
    currentMove: number;
    gameType: eGameType;
}

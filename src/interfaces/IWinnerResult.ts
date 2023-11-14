import ePlayerLetter from "../enums/ePlayerLetter";

export default interface IWinnerResult {
    lines: number[];
    winner: ePlayerLetter;
}

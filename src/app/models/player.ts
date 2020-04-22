import { Character } from './characters/character';
import { EnumPlayers } from './enum-player';

export class Player {
    player: EnumPlayers;
    deck: Character[] = [];

    constructor() {

    }
}

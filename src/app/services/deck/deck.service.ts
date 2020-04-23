import { Character } from 'src/app/models/characters/character';
import { EnumPlayers } from './../../models/enum-player';
import { Human } from './../../models/characters/human';
import { HybridOrc } from './../../models/characters/hybrid-orc';
import { Injectable } from '@angular/core';
import { MessagesBattleService } from './../messages/messages-battle.service';
import { Player } from './../../models/player';
import { StormElf } from './../../models/characters/storm-elf';
import { characters } from 'src/app/models/characters/characters';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private playerOne: Player = new Player();
  private playerTwo: Player = new Player();

  constructor(private messageBattleService: MessagesBattleService) { }

  createCharSelected(player: EnumPlayers, character: number) {
    switch (`${player}|${character}`) {
      case `${EnumPlayers.Player1}|1`:
        this.createDeckToPlayer(player, new Human());
        this.messageBattleService.characterSelectedMessage(player, characters[0]);
        break;
      case `${EnumPlayers.Player1}|2`:
        this.createDeckToPlayer(player, new HybridOrc());
        this.messageBattleService.characterSelectedMessage(player, characters[1]);
        break;
      case `${EnumPlayers.Player1}|3`:
        this.createDeckToPlayer(player, new StormElf());
        this.messageBattleService.characterSelectedMessage(player, characters[2]);
        break;

      case `${EnumPlayers.Player2}|1`:
        this.createDeckToPlayer(player, new Human());
        this.messageBattleService.characterSelectedMessage(player, characters[0]);
        break;
      case `${EnumPlayers.Player2}|2`:
        this.createDeckToPlayer(player, new HybridOrc());
        this.messageBattleService.characterSelectedMessage(player, characters[1]);
        break;
      case `${EnumPlayers.Player2}|3`:
        this.createDeckToPlayer(player, new StormElf());
        this.messageBattleService.characterSelectedMessage(player, characters[2]);
        break;
    }
  }

  private createDeckToPlayer(player: EnumPlayers, character: Character): void {
    if (EnumPlayers.Player1 === player) {
      this.playerOne.player = player;
      this.playerOne.deck.push(character);
    } else if (EnumPlayers.Player2 === player) {
      this.playerTwo.player = player;
      this.playerTwo.deck.push(character);
    }
  }

  isSelectionDone(): boolean {
    if (this.playerOne.deck.length === 3 && this.playerTwo.deck.length === 3) {
      console.log(this.playerOne.deck.length);
      return true;
    }
    return false;
  }

  getPlayers(): any {
    return [{
      player: this.playerOne
    }, {
      player: this.playerTwo
    }];
  }
}

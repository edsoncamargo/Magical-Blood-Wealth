import { Character } from 'src/app/models/characters/character';
import { DeckService } from './../deck/deck.service';
import { EnumPlayers } from './../../models/enum-player';
import { Injectable } from '@angular/core';
import { MessagesBattleService } from './../messages/messages-battle.service';
import { Player } from './../../models/player';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  private playerOne: Player = new Player();
  private playerTwo: Player = new Player();

  private numberOneFighter: Character = null;
  private numberTwoFighter: Character = null;

  private wins: EnumPlayers[] = [];

  constructor(private deckService: DeckService, private messagesBattleService: MessagesBattleService) { }

  startRandomicBattle(): void {
    this.messagesBattleService.startBattleMessage();
    this.getPlayers();
    this.selectFighters();
    this.startBattle();
  }

  private getPlayers(): void {
    this.playerOne = this.deckService.getPlayers()[0].player;
    this.playerTwo = this.deckService.getPlayers()[1].player;
  }

  private selectFighters(): void {
    const randomic = this.checkingSelectedFighterLife();
    this.numberOneFighter = this.playerOne.deck[randomic[0]];
    this.numberTwoFighter = this.playerTwo.deck[randomic[1]];
  }

  private genereteRandomicNumber($min: number = 0, $max: number = 3): number {
    const min = Math.ceil($min);
    const max = Math.floor($max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private checkingSelectedFighterLife(): any {
    let randomicNumberOne: number;
    let randomicNumberTwo: number;
    while (this.playerOne.deck[randomicNumberOne = this.genereteRandomicNumber()].life <= 0) {
      return;
    }
    while (this.playerTwo.deck[randomicNumberTwo = this.genereteRandomicNumber()].life <= 0) {
      return;
    }
    return {
      0: randomicNumberOne,
      1: randomicNumberTwo
    };
  }

  private startBattle(): void {
    while (this.numberOneFighter.life > 0 && this.numberTwoFighter.life > 0) {
      const attack = this.genereteRandomicNumber(0, 2);
      if (attack === 1) {
        this.numberTwoFighter.life = this.isDemageBiggerThanLife(this.numberTwoFighter.life, this.numberOneFighter.demage);
      } else {
        this.numberOneFighter.life = this.isDemageBiggerThanLife(this.numberOneFighter.life, this.numberTwoFighter.demage);
      }
    }
    this.checkCharacterWinner();
  }

  private isDemageBiggerThanLife(life, demage): number {
    if (life > demage) {
      return life - demage;
    } else {
      return 0;
    }
  }

  private checkCharacterWinner(): void {
    const winner = this.numberOneFighter.life === 0 ? EnumPlayers.Player2 : EnumPlayers.Player1;
    const loser = this.numberOneFighter.life === 0 ? EnumPlayers.Player1 : EnumPlayers.Player2;
    this.messagesBattleService.characterWinnerMessage(winner === EnumPlayers.Player1
      ? 'Player 1'
      : 'Player 2', this.numberOneFighter.name,
      loser === EnumPlayers.Player1
        ? 'Player 1'
        : 'Player 2', this.numberTwoFighter.name);
    this.wins.push(winner);
  }
}

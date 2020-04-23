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

  startRandomicBattle() {
    this.messagesBattleService.startBattleMessage();
    this.getPlayers();
    while (this.isBattleNotEnd()) {
      this.selectFighters();
      this.startBattle();
    }
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
    do {
      randomicNumberOne = this.genereteRandomicNumber();
    } while (this.playerOne.deck[randomicNumberOne].life <= 0);
    do {
      randomicNumberTwo = this.genereteRandomicNumber();
    } while (this.playerTwo.deck[randomicNumberTwo].life <= 0);
    return {
      0: randomicNumberOne,
      1: randomicNumberTwo
    };
  }

  private startBattle(): void {
    while (this.numberOneFighter.life > 0 && this.numberTwoFighter.life > 0) {
      const attack = this.genereteRandomicNumber(0, 2);
      if (attack === 1) {
        this.messagesBattleService.characterHitMessage('Player 1', this.numberOneFighter.name,
          this.numberOneFighter.demage, this.numberTwoFighter.name);
        this.numberTwoFighter.life = this.isDemageBiggerThanLife(this.numberTwoFighter.life, this.numberOneFighter.demage);
      } else {
        this.messagesBattleService.characterHitMessage('Player 2', this.numberTwoFighter.name,
          this.numberTwoFighter.demage, this.numberOneFighter.name);
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

  private isBattleNotEnd(): boolean {
    let countOne = 0;
    let countTwo = 0;
    if (this.wins.length > 0) {
      this.wins.forEach(win => {
        if (win === 0) {
          countOne = countOne + 1;
        } else {
          countTwo = countTwo + 1;
        }
      });
    }
    if (countOne === 3) {
      this.messagesBattleService.playerWinnerMessage('Player 1');
    } else if (countTwo === 3) {
      this.messagesBattleService.playerWinnerMessage('Player 2');
    }
    return countOne === 3 || countTwo === 3 ? false : true;
  }
}

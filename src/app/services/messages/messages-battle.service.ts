import { EventEmitter, Injectable } from '@angular/core';

import { EnumPlayers } from 'src/app/models/enum-player';
import { characters } from 'src/app/models/characters/characters';

@Injectable({
  providedIn: 'root'
})
export class MessagesBattleService {

  messages: EventEmitter<string> = new EventEmitter();

  constructor() { }

  startMessage(): string {
    return `
      Type start and see the magic... <br><br>
    `;
  }

  selectableCharactersMessage(player: string): string {
    return `<br> ==================================================
      <br> <b>Select your partner ${player}:</b> <br>
      1 - ${characters[0]} <br>
      Skills: life(100), demage(15), agility(15), defense(15) <br><br>

      2 - ${characters[1]} <br>
      Skills: life(150), demage(25), agility(5), defense(15) <br><br>

      3 - ${characters[2]} <br>
      Skills: life(80), demage(12), agility(35), defense(5) <br>
    ================================================== <br><br>`;
  }

  characterSelectedMessage(player: EnumPlayers, selected: string): void {
    switch (`${player}|${selected}`) {
      case `${EnumPlayers.Player1}|${characters[0]}`:
        this.addBattleMessage(`
          Player 1 selected Human character <br>
        `);
        break;
      case `${EnumPlayers.Player1}|${characters[1]}`:
        this.addBattleMessage(`
          Player 1 selected Hybrid Orc character <br>
      `);
        break;
      case `${EnumPlayers.Player1}|${characters[2]}`:
        this.addBattleMessage(`
          Player 1 selected Storm Elf character <br>
      `);
        break;

      case `${EnumPlayers.Player2}|${characters[0]}`:
        this.addBattleMessage(`
          Player 2 selected Human character <br>
        `);
        break;
      case `${EnumPlayers.Player2}|${characters[1]}`:
        this.addBattleMessage(`
          Player 2 selected Hybrid Orc character <br>
      `);
        break;
      case `${EnumPlayers.Player2}|${characters[2]}`:
        this.addBattleMessage(`
          Player 2 selected Storm Elf character <br>
      `);
        break;
    }
  }

  invalidCommandMessage(): void {
    this.addBattleMessage(`<br> Invalid command, sorry. <br>`);
  }

  characterWinnerMessage(playerWinner: string, characterWinner: string, playerDown: string, characterDown: string): void {
    this.addBattleMessage(`
    ${playerWinner}'s ${characterWinner} <span class="winner">won</span> <br>
    ${playerDown}'s ${characterDown} <span class="loser">died</span> <br>
    `);
  }

  startBattleMessage(): void {
    this.addBattleMessage(`<br> The battle has began... <br>`);
  }

  addBattleMessage(message: string): void {
    window.scrollTo(0, document.body.scrollHeight);
    this.messages.emit(message);
  }
}

import { Component, OnInit } from '@angular/core';

import { BattleService } from './../services/battle/battle.service';
import { DeckService } from './../services/deck/deck.service';
import { EnumPlayers } from '../models/enum-player';
import { MessagesBattleService } from './../services/messages/messages-battle.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  history = '';

  stages = {
    start: true,
    'player-one-selection': false,
    'player-two-selection': false,
    'start-battle': false
  };

  constructor(
    private messagesBattleService: MessagesBattleService,
    private deckService: DeckService,
    private battleService: BattleService) {
  }

  ngOnInit() {
    this.getMessageChanges();
    this.messagesBattleService.addBattleMessage(this.messagesBattleService.startMessage());
  }

  getMessageChanges(): void {
    this.messagesBattleService.messages.subscribe((message: string) => {
      this.history = this.history.concat(message);
    });
  }

  terminal(input: KeyboardEvent): void {
    const terminal = (input.target as HTMLInputElement).value;
    switch (`${terminal.toLocaleLowerCase().trim()}|true`) {
      case `start|${this.stages.start}`:
        this.changeCurrentStage(1);
        this.messagesBattleService.addBattleMessage(this.messagesBattleService.selectableCharactersMessage('Player 1'));
        break;

      case `1|${this.stages['player-one-selection']}`:
        this.deckService.createCharSelected(EnumPlayers.Player1, 1);
        this.changeCurrentStage(2);
        break;
      case `2|${this.stages['player-one-selection']}`:
        this.deckService.createCharSelected(EnumPlayers.Player1, 2);
        this.changeCurrentStage(2);
        break;
      case `3|${this.stages['player-one-selection']}`:
        this.deckService.createCharSelected(EnumPlayers.Player1, 3);
        this.changeCurrentStage(2);
        break;

      case `1|${this.stages['player-two-selection']}`:
        this.deckService.createCharSelected(EnumPlayers.Player2, 1);
        this.changeCurrentStage(3);
        break;
      case `2|${this.stages['player-two-selection']}`:
        this.deckService.createCharSelected(EnumPlayers.Player2, 2);
        this.changeCurrentStage(3);
        break;
      case `3|${this.stages['player-two-selection']}`:
        this.deckService.createCharSelected(EnumPlayers.Player2, 3);
        this.changeCurrentStage(3);
        break;

      case `start|${this.stages['start-battle']}`:
        // TODO
        break;

      default:
        this.messagesBattleService.invalidCommandMessage();
        break;
    }
    (input.target as HTMLInputElement).value = '';
  }

  changeCurrentStage(stage: number) {
    switch (stage) {
      case 1:
        this.stages.start = this.stages.start === true ? true : false;
        this.stages['player-one-selection'] = true;
        break;
      case 2:
        this.stages['player-one-selection'] = this.stages['player-one-selection'] === true
          && this.checkPlayerOneSelectionMustBeFalse() ? false : true;
        if (this.stages['player-one-selection'] === false) {
          this.stages['player-two-selection'] = true;
          this.messagesBattleService.addBattleMessage(this.messagesBattleService.selectableCharactersMessage('Player 2'));
        }
        break;
      case 3:
        this.stages['player-two-selection'] = this.stages['player-two-selection'] === true
          && this.checkPlayerTwoSelectionMustBeFalse() ? false : true;
        if (this.stages['player-two-selection'] === false) {
          this.stages['start-battle'] = true;
          this.battleService.startRandomicBattle();
        }
        break;
    }
  }

  checkPlayerOneSelectionMustBeFalse(): boolean {
    return this.deckService.getPlayers()[0].player.deck && this.deckService.getPlayers()[0].player.deck.length >= 3;
  }

  checkPlayerTwoSelectionMustBeFalse(): boolean {
    return this.deckService.getPlayers()[1].player.deck && this.deckService.getPlayers()[1].player.deck.length >= 3;
  }
}

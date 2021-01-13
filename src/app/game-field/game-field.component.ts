import { Component } from '@angular/core';
import { GameFieldService } from './game-field.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
  providers: [GameFieldService]
})
export class GameFieldComponent {
  constructor(private gameFieldService: GameFieldService) {}

  getClassName = item => {
    let className = 'player-piece';

    if (this.gameFieldService.selectedPlayerItem) {
      const { x, y, item: itemIdx } = this.gameFieldService.selectedPlayerItem;
      if (item.x === x && item.y === y && item.item === itemIdx) {
        className = className + ' selected';
      }
    }

    const playerColors = [' red', ' green', ' orange', ' blue'];
    className = className + playerColors[item.player - 1];

    return className;
  }
}

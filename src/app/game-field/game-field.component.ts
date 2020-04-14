import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent {
  public field = Array(13).fill(Array(13).fill(0));
  public shipsCoords = [[0, 6], [6, 0], [6, 12], [12, 6]]

  shouldRenderShipItem = (x, y) => {
    return this.shipsCoords.find(item => item[0] === x && item[1] === y)
  }

  shouldRenderBlankItem = (x, y) => {
    return x === 0 || x === 12 || y === 0 || y === 12 || x === 1 && y === 11 || x === 1 && y === 1 || y === 1 && x === 11 || x === 11 && y === 11;
  }
}

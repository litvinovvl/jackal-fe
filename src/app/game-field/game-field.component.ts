import { Component } from '@angular/core';
import { fieldItems } from './field-items';

type fieldItem = { img: null | string, isOpened: boolean }
type fieldRow = fieldItem[];
type field = fieldRow[];

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent {
  public fieldItems = fieldItems;
  public field: field = Array(13).fill(Array(13).fill({ img: null, isOpened: false }));
  public shipsCoords = [[0, 6], [6, 0], [6, 12], [12, 6]];

  shouldRenderShipItem = (x, y) => {
    return this.shipsCoords.find(item => item[0] === x && item[1] === y);
  }

  openItem = (x, y) => {
    const isSea = this.shouldRenderBlankItem(x, y) && !this.shouldRenderShipItem(x, y);
    const isShip = this.shouldRenderShipItem(x, y);
  
    if (!isSea && !isShip && !this.field[x][y].isOpened) {
      const randomFieldItemIndex = Math.floor(Math.random() * this.fieldItems.length);
      const img = this.fieldItems[randomFieldItemIndex].imageURL;
      this.fieldItems[randomFieldItemIndex].balance -= 1;

      if (!this.fieldItems[randomFieldItemIndex].balance) {
        this.fieldItems.splice(randomFieldItemIndex, 1);
      }
      const updatedRow = this.field[x].map((item, index) => index === y ? { img, isOpened: true } : item);
      const updatedField = this.field.map((row, index) => index === x ? updatedRow : row);

      this.field = updatedField;
    }
  }

  shouldRenderBlankItem = (x, y) => {
    return x === 0
    || x === 12
    || y === 0
    || y === 12
    || x === 1
    && y === 11 || x === 1
    && y === 1 || y === 1
    && x === 11 || x === 11
    && y === 11;
  }
}

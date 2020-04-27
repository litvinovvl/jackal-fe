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
  public playersCoords = [
    {
      1: [0, 6],
      2: [0, 6],
      3: [0, 6]
    },
    {
      1: [6, 0],
      2: [6, 0],
      3: [6, 0]
    },
    {
      1: [6, 12],
      2: [6, 12],
      3: [6, 12]
    },
    {
      1: [12, 6],
      2: [12, 6],
      3: [12, 6]
    }
  ];

  shouldRenderShipItem = (x, y) => {
    return this.shipsCoords.find(item => item[0] === x && item[1] === y);
  }

  shouldRenderPlayerItem = (x, y) => {
    const coords = this.playersCoords.map(item => Object.keys(item).map(key => item[key])).flat();

    return coords.filter(item => item[0] === x && item[1] === y);
  }

  shouldRenderFirstPlayerItem = (x, y) => {
    const coords = Object.keys(this.playersCoords[0]).map(key => this.playersCoords[0][key]);

    return coords.filter(item => item[0] === x && item[1] === y);
  }

  shouldRenderSecondPlayerItem = (x, y) => {
    const coords = Object.keys(this.playersCoords[1]).map(key => this.playersCoords[1][key]);

    return coords.filter(item => item[0] === x && item[1] === y);
  }

  shouldRenderThirdPlayerItem = (x, y) => {
    const coords = Object.keys(this.playersCoords[2]).map(key => this.playersCoords[2][key]);

    return coords.filter(item => item[0] === x && item[1] === y);
  }

  shouldRenderFourthPlayerItem = (x, y) => {
    const coords = Object.keys(this.playersCoords[3]).map(key => this.playersCoords[3][key]);

    return coords.filter(item => item[0] === x && item[1] === y);
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

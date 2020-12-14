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
  public playersCoords = {
    1: {
      1: { x: 0, y: 6 },
      2: { x: 0, y: 6 },
      3: { x: 0, y: 6 },
    },
    2: {
      1: { x: 6, y: 0 },
      2: { x: 6, y: 0 },
      3: { x: 6, y: 0 },
    },
    3: {
      1: { x: 6, y: 12 },
      2: { x: 6, y: 12 },
      3: { x: 6, y: 12 },
    },
    4: {
      1: { x: 12, y: 6 },
      2: { x: 12, y: 6 },
      3: { x: 12, y: 6 },
    }
  };
  public selectedPlayerItem = null;

  shouldRenderShipItem = (x, y) => {
    return this.shipsCoords.find(item => item[0] === x && item[1] === y);
  }

  shouldRenderPlayerItem = (x, y) => {
    const coords = Object.keys(this.playersCoords).map(key => Object.keys(this.playersCoords[key]).map(itemKey => ({ ...this.playersCoords[key][itemKey], player: Number(key), item: Number(itemKey) }))).flat();

    return coords.filter(item => item.x === x && item.y === y);
  }

  openItem = (x, y) => {
    const isSea = this.shouldRenderBlankItem(x, y) && !this.shouldRenderShipItem(x, y);
    const isShip = this.shouldRenderShipItem(x, y);

    if (!isSea && !isShip && !this.field[x][y].isOpened && this.selectedPlayerItem) {
      const randomFieldItemIndex = Math.floor(Math.random() * this.fieldItems.length);
      const img = this.fieldItems[randomFieldItemIndex].imageURL;
      this.fieldItems[randomFieldItemIndex].balance -= 1;

      if (!this.fieldItems[randomFieldItemIndex].balance) {
        this.fieldItems.splice(randomFieldItemIndex, 1);
      }
      const updatedRow = this.field[x].map((item, index) => index === y ? { img, isOpened: true } : item);
      const updatedField = this.field.map((row, index) => index === x ? updatedRow : row);

      this.field = updatedField;

      this.movePlayerItem(x, y);
    } else if (this.field[x][y].isOpened && this.selectedPlayerItem) {
      this.movePlayerItem(x, y);
    }
  }

  movePlayerItem = (x, y) => {
    const { player, item } = this.selectedPlayerItem;
    this.playersCoords[player][item] = { ...this.playersCoords[player][item], x, y }
    this.selectedPlayerItem = null;
    this.openItem(x, y);
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

  getClassName = item => {
    let className = 'player-piece';

    if (this.selectedPlayerItem) {
      const { x, y, item: itemIdx } = this.selectedPlayerItem;
      if (item.x === x && item.y === y && item.item === itemIdx) {
        className = className + ' selected';
      }
    }

    const playerColors = [' red', ' green', ' orange', ' blue'];
    className = className + playerColors[item.player - 1];

    return className;
  }

  handlePlayerItemSelection = (e, item) => {
    e.stopPropagation();
    this.selectedPlayerItem = item;
  }
}

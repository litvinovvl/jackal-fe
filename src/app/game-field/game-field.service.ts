import { Injectable } from '@angular/core';
import { fieldItems } from './field-items';

type FieldItem = { img: null | string, isOpened: boolean }
type FieldRow = FieldItem[];
export type Field = FieldRow[];

const initialPositions = {
  1: { x: 0, y: 6 },
  2: { x: 6, y: 0 },
  3: { x: 6, y: 12 },
  4: { x: 12, y: 6 },
}

@Injectable()
export class GameFieldService {
  public fieldItems = fieldItems;
  public field: Field = Array(13).fill(Array(13).fill({ img: null, isOpened: false }));
  public shipsCoords = { ...initialPositions };
  getPlayerCoords = (playerNumber) => ({
    1: initialPositions[playerNumber],
    2: initialPositions[playerNumber],
    3: initialPositions[playerNumber],
  })
  public playersCoords = {
    1: this.getPlayerCoords(1),
    2: this.getPlayerCoords(2),
    3: this.getPlayerCoords(3),
    4: this.getPlayerCoords(4),
  };
  public selectedPlayerItem = null;

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

  shouldRenderShipItem = (x, y) => {
    return Object
      .keys(this.shipsCoords)
      .find(key => this.shipsCoords[key].x === x && this.shipsCoords[key].y === y);
  }

  shouldRenderPlayerItem = (x, y) => {
    const coords =
      Object.keys(this.playersCoords)
        .map(key => Object.keys(this.playersCoords[key])
        .map(itemKey => ({
          ...this.playersCoords[key][itemKey],
          player: Number(key),
          item: Number(itemKey)
        })))
        .flat();

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

  handlePlayerItemSelection = (e, item) => {
    e.stopPropagation();
    this.selectedPlayerItem = item;
  }
}
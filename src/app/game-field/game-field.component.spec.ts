import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldComponent } from './game-field.component';

describe('GameFieldComponent', () => {
  let fixture: ComponentFixture<GameFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFieldComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const component: GameFieldComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render 13 rows', () => {
    const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
    expect(fieldRows.length).toBe(13);
  });

  it('should render 13 items in each row', () => {
    const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
    fieldRows.forEach(row => {
      const fieldItems = row.querySelectorAll('.field-item');
      expect(fieldItems.length).toBe(13);
    });
  });

  describe('game field', () => {
    it('should render sea field items for corners and first/last columns/rows', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const isSea = (item: Element) => expect(item.getAttribute('src')).toBe('../../assets/img/sea.svg');

      fieldRows.forEach((row, x) => {
        const fieldItems = row.querySelectorAll('img.field-item');

        if (x === 0 || x === 12) {
          fieldItems.forEach((item, y) => {
            if (y !== 6) {
              isSea(item);
            }
          });
        }

        if (x === 1 || x === 11) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 1 || y === 11 || y === 12) {
              isSea(item);
            }
          });
        }

        if (x !== 0 && x !== 1 && x !== 11 && x !== 12 && x !== 6) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 12) {
              isSea(item);
            }
          });
        }
      });
    });

    it('should render ships in default places', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const isShip = (item: Element) => expect(item.getAttribute('src')).toBe('../../assets/img/ship.svg');

      fieldRows.forEach((row, x) => {
        const fieldItems = row.querySelectorAll('img.field-item');

        if (x === 0 || x === 12) {
          fieldItems.forEach((item, y) => {
            if (y === 6) {
              isShip(item);
            }
          });
        }

        if (x === 6) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 12) {
              isShip(item);
            }
          });
        }
      });
    });

    it('should render default fields', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const isDefault = (item: Element) => expect(item.getAttribute('src')).toBe('../../assets/img/default.svg');

      fieldRows.forEach((row, x) => {
        const fieldItems = row.querySelectorAll('img.field-item');

        if (x === 1 || x === 11) {
          fieldItems.forEach((item, y) => {
            if (y !== 0 && y !== 1 && y !== 11 && y !== 12) {
              isDefault(item);
            }
          });
        }

        if (x !== 0 && x !== 1 && x !== 11 && x !== 12) {
          fieldItems.forEach((item, y) => {
            if (y !== 0 && y !== 12) {
              isDefault(item);
            }
          });
        }
      });
    });

    it('should randomly set image on click by field items and set isOpened flag to true', () => {
      const initialFieldItems = [
        {
          name: 'test1',
          imageURL: 'test1',
          balance: 1
        },
        {
          name: 'test2',
          imageURL: 'test2',
          balance: 1
        }
      ];

      fixture.componentInstance.fieldItems = initialFieldItems;
      fixture.detectChanges();

      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const fieldItem = fieldRows[5].querySelectorAll('p')[5];

      fieldItem.click();
      fixture.detectChanges();

      const updatedFieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const firstImg = updatedFieldRows[5].querySelectorAll('img')[5].getAttribute('src');
      expect(firstImg).not.toBe('../../assets/img/default.svg');

      fixture = TestBed.createComponent(GameFieldComponent);
      fixture.detectChanges();

      const newFieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const newFieldItem = newFieldRows[5].querySelectorAll('img')[5];

      newFieldItem.click();
      fixture.detectChanges();

      const newUpdatedFieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const secondImg = newUpdatedFieldRows[5].querySelectorAll('img')[5].getAttribute('src');
      expect(secondImg).not.toBe('../../assets/img/default.svg');
      expect(secondImg).not.toEqual(firstImg);
    });

    it('should not randomly set image on click by sea fields', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const isSeaAferClick = (item: HTMLParagraphElement, x: number, y: number) => {
        item.click();
        fixture.detectChanges();
        const updatedFieldRow: HTMLElement = fixture.nativeElement.querySelectorAll('.field-row')[x];
        const updatedFieldItem = updatedFieldRow.querySelectorAll('img.field-item')[y];
        expect(updatedFieldItem.getAttribute('src')).toBe('../../assets/img/sea.svg');
      };

      fieldRows.forEach((row, x) => {
        const fieldItems = row.querySelectorAll('p');

        if (x === 0 || x === 12) {
          fieldItems.forEach((item, y) => {
            if (y !== 6) {
              isSeaAferClick(item, x, y);
            }
          });
        }

        if (x === 1 || x === 11) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 1 || y === 11 || y === 12) {
              isSeaAferClick(item, x, y);
            }
          });
        }

        if (x !== 0 && x !== 1 && x !== 11 && x !== 12 && x !== 6) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 12) {
              isSeaAferClick(item, x, y);
            }
          });
        }
      });
    });

    it('should not randomly set image on click by ship fields', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const isShipAfterClick = (item: HTMLParagraphElement, x: number, y: number) => {
        item.click();
        fixture.detectChanges();
        const updatedFieldRow: HTMLElement = fixture.nativeElement.querySelectorAll('.field-row')[x];
        const updatedFieldItem = updatedFieldRow.querySelectorAll('img.field-item')[y];
        expect(updatedFieldItem.getAttribute('src')).toBe('../../assets/img/ship.svg');
      };

      fieldRows.forEach((row, x) => {
        const fieldItems = row.querySelectorAll('p');

        if (x === 0 || x === 12) {
          fieldItems.forEach((item, y) => {
            if (y === 6) {
              isShipAfterClick(item, x, y);
            }
          });
        }

        if (x === 6) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 12) {
              isShipAfterClick(item, x, y);
            }
          });
        }
      });
    });

    it('should decrease used field items', () => {
      const initialFieldItems = [{
        name: 'test',
        imageURL: 'test',
        balance: 2
      }];

      fixture.componentInstance.fieldItems = initialFieldItems;

      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const fieldItem = fieldRows[5].querySelectorAll('p')[5];

      fieldItem.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.fieldItems[0].balance).toBe(1);
    });

    it('should delete used field items if balance is 0', () => {
      const initialFieldItems = [{
        name: 'test',
        imageURL: 'test',
        balance: 1
      }];

      fixture.componentInstance.fieldItems = initialFieldItems;
      fixture.detectChanges();

      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const fieldItem = fieldRows[5].querySelectorAll('p')[5];

      fieldItem.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.fieldItems.length).toBe(0);
    });

    it('should render players pieces in default fields', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const player1 = fieldRows[0].querySelectorAll('p')[6];
      const pieces1 = player1.querySelectorAll('img.player-piece')
      const player2 = fieldRows[6].querySelectorAll('p')[0];
      const pieces2 = player2.querySelectorAll('img.player-piece.green')
      const player3 = fieldRows[6].querySelectorAll('p')[12];
      const pieces3 = player3.querySelectorAll('img.player-piece.orange')
      const player4 = fieldRows[12].querySelectorAll('p')[6];
      const pieces4 = player4.querySelectorAll('img.player-piece.blue')

      expect(pieces1.length).toBe(3);
      expect(pieces2.length).toBe(3);
      expect(pieces3.length).toBe(3);
      expect(pieces4.length).toBe(3);
    });
  });
});

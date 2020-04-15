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

  describe('initial game field', () => {
    it('should render blank field items for corners and first/last columns/rows', () => {
      const fieldRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.field-row');
      const isBlankField = (item: Element) => expect(item.getAttribute('src')).toBe('../../assets/img/sea.svg');

      fieldRows.forEach((row, x) => {
        const fieldItems = row.querySelectorAll('img.field-item');

        if (x === 0 || x === 12) {
          fieldItems.forEach((item, y) => {
            if (y !== 6) {
              isBlankField(item);
            }
          });
        }

        if (x === 1 || x === 11) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 1 || y === 11 || y === 12) {
              isBlankField(item);
            }
          });
        }

        if (x !== 0 && x !== 1 && x !== 11 && x !== 12 && x !== 6) {
          fieldItems.forEach((item, y) => {
            if (y === 0 || y === 12) {
              isBlankField(item);
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
  });
});

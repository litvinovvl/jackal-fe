import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameFieldComponent } from './game-field/game-field.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        GameFieldComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jackal-fe'`, () => {
    expect(app.title).toEqual('jackal-fe');
  });

  it('should render game field component', () => {
    const appEl: HTMLElement = fixture.nativeElement;
    expect(appEl.querySelector('app-game-field')).toBeTruthy();
  });
});

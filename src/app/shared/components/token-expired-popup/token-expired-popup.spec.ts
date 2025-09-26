import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpiredPopup } from './token-expired-popup';

describe('TokenExpiredPopup', () => {
  let component: TokenExpiredPopup;
  let fixture: ComponentFixture<TokenExpiredPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenExpiredPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenExpiredPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

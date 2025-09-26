import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalTable } from './universal-table';

describe('UniversalTable', () => {
  let component: UniversalTable;
  let fixture: ComponentFixture<UniversalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversalTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

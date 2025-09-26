import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsuario } from './create-usuario';

describe('CreateUsuario', () => {
  let component: CreateUsuario;
  let fixture: ComponentFixture<CreateUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

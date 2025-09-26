import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaciente } from '.create-paciente';

describe('CreatePaciente', () => {
  let component: CreatePaciente;
  let fixture: ComponentFixture<CreatePaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

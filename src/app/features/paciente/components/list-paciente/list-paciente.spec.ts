import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPacienteComponent } from './list-paciente';

describe('ListPaciente', () => {
  let component: ListagemPacienteComponent;
  let fixture: ComponentFixture<ListagemPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ListagemPacienteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

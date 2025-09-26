import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoDTO } from '@/shared/models/endereco.DTO';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';

import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.html',
  styleUrls: ['./endereco-form.scss'],
  imports: [
    CommonModule,
    SelectModule,
    ReactiveFormsModule,
    SelectButtonModule,
    InputTextModule
  ],
})
export class EnderecoFormComponent implements OnInit {
  @Input() endereco?: EnderecoDTO;
  @Output() enderecoChange = new EventEmitter<EnderecoDTO>();

  enderecoForm: FormGroup;

  estados = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
    'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
  ];

  constructor(private fb: FormBuilder) {
    this.enderecoForm = this.createForm();
  }

  ngOnInit() {
    // Se já tiver um endereço, preenche o formulário
    if (this.endereco) {
      this.enderecoForm.patchValue(this.endereco);
    }

    // Ouvir mudanças no formulário e emitir para o componente pai
    this.enderecoForm.valueChanges.subscribe(value => {
      this.enderecoChange.emit(value);
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      cep: ['', [Validators.pattern(/^\d{5}-?\d{3}$/)]],
      logradouro: ['', [Validators.maxLength(200)]],
      numero: ['', [Validators.maxLength(10)]],
      complemento: ['', [Validators.maxLength(100)]],
      bairro: ['', [Validators.maxLength(100)]],
      cidade: ['', [Validators.maxLength(100)]],
      estado: ['', [Validators.maxLength(2)]],
      pais: ['Brasil']
    });
  }

  onCepBlur() {
    const cep = this.enderecoForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.buscarCep(cep);
    }
  }

  private buscarCep(cep: string) {
    // Implemente a busca do CEP via API aqui
    console.log('Buscando CEP:', cep);
    // Exemplo: this.cepService.buscar(cep).subscribe(...)
  }

  get formControls() {
    return this.enderecoForm.controls;
  }
}

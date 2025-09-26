// src/features/paciente/pages/create-paciente.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';

import { PacienteService } from '../../services/paciente.service';
import { ApiResponse } from '@/shared/models/apiResponse';
import { ResponsePacienteDTO } from '../../dtos/responsePaciente.DTO';
import { CreatePacienteDTO } from '../../dtos/createPaciente.DTO';
import { UpdatePacienteDTO } from '../../dtos/updatePaciente.DTO';

// import { EnderecoFormComponent } from '@/shared/components/endereco-form/endereco-form';
import { EnderecoDTO } from '@/shared/models/endereco.DTO';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './create-paciente.html',
  styleUrls: ['./create-paciente.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    // EnderecoFormComponent
  ]
})
export class CadastroPacienteComponent implements OnInit {
  cadastroForm!: FormGroup;
  isEditMode: boolean = false;
  pacienteId: string | null = null;

  maxDate: Date = new Date();
  currentYear: number = new Date().getFullYear();

  sexoOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Intersexo', value: 'I' }
  ];

  etniaOptions = [
    { label: 'Branca', value: 'BR' },
    { label: 'Preta', value: 'PR' },
    { label: 'Indígena', value: 'IN' },
    { label: 'Amarela', value: 'AM' },
    { label: 'Parda', value: 'PA' }
  ];

  get prontuario() { return this.cadastroForm.get('prontuario')!; }
//   get nomeCompleto() { return this.cadastroForm.get('nomeCompleto')!; }
  get nome() { return this.cadastroForm.get('nome')!; }
  get nomeSocial() { return this.cadastroForm.get('nomeSocial')!; }
  get nomeMae() { return this.cadastroForm.get('nomeMae')!; }
  get cpf() { return this.cadastroForm.get('cpf')!; }
  get cartaoSus() { return this.cadastroForm.get('cartaoSus')!; }
  get telefone() { return this.cadastroForm.get('telefone')!; }
  get telefoneResponsavel() { return this.cadastroForm.get('telefoneResponsavel')!; }
  get responsavel() { return this.cadastroForm.get('responsavel')!; }
  get sexo() { return this.cadastroForm.get('sexo')!; }
  get etnia() { return this.cadastroForm.get('etnia')!; }
  get observacoes() { return this.cadastroForm.get('observacoes')!; }

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cadastroForm = this.fb.group({
        prontuario: ['', [Validators.required, Validators.maxLength(20)]],
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        nomeSocial: ['', [Validators.maxLength(100)]],
        nomeMae: ['', [Validators.minLength(5), Validators.maxLength(100)]],
        dataNascimento: [''],
        cpf: [''],
        cartaoSus: [''],
        telefone: [''],
        telefoneResponsavel: [''],
        responsavel: [''],
        endereco: [null],
        sexo: [''],
        etnia: [''],
        observacoes: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.pacienteId = params['id'];
        this.carregarPacienteParaEdicao(this.pacienteId!);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/pages/list-paciente']);
  }

  private carregarPacienteParaEdicao(id: string): void {
    this.pacienteService.getById(id).subscribe({
      next: (response: ApiResponse<ResponsePacienteDTO>) => {
        this.cadastroForm.patchValue({
          prontuario: response.data.prontuario,
          nome: response.data.nome,
          email: response.data.email,
          telefone: response.data.telefone,
          dataNascimento: response.data.dataNascimento ? new Date(response.data.dataNascimento) : null,
          cpf: response.data.cpf,
          rg: response.data.rg,
          endereco: response.data.endereco,
          observacoes: response.data.observacoes,
          status: response.data.status
        });
      },
      error: (error) => {
        console.error('Erro ao carregar paciente:', error);
      }
    });
  }

  onEnderecoChange(endereco: EnderecoDTO): void {
    this.cadastroForm.patchValue({ endereco });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      if (this.isEditMode && this.pacienteId) {
        const pacienteData: UpdatePacienteDTO = this.cadastroForm.value;
        this.pacienteService.update(this.pacienteId, pacienteData).subscribe({
          next: (response) => {
            console.log('Paciente atualizado com sucesso!', response);
            this.router.navigate(['/pages/list-paciente']);
          },
          error: (error) => {
            console.error('Erro ao atualizar o paciente:', error);
          }
        });
      } else {
        const pacienteData: CreatePacienteDTO = this.cadastroForm.value;
        this.pacienteService.create(pacienteData).subscribe({
          next: (response) => {
            console.log('Paciente cadastrado com sucesso!', response);
            this.router.navigate(['/pages/list-paciente']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar o paciente:', error);
          }
        });
      }
    } else {
      console.log('Formulário inválido!');
    }
  }
}

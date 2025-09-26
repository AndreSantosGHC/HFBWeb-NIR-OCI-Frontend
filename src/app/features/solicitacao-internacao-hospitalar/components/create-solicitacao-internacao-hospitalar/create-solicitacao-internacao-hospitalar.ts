import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea'; // Adicionei esse import, porque o de cima não tinha.

import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@/shared/models/apiResponse';
import { MessageService } from 'primeng/api';

import { ResponseSolicitacaoInternacaoHospitalarDTO } from '../../dtos/ResponseSolicitacaoInternacaoHospitalarDTO';
import { CreateSolicitacaoInternacaoHospitalarDTO } from '../../dtos/CreateSolicitacaoInternacaoHospitalarDTO';
import { UpdateSolicitacaoInternacaoHospitalarDTO } from '../../dtos/UpdateSolicitacaoInternacaoHospitalarDTO';
import { SolicitacaoInternacaoHospitalarService } from '../../services/solicitacao-internacao-hospitalar.service';
import { PacienteService } from '@/features/paciente/services/paciente.service';
import { ResponsePacienteDTO } from '@/features/paciente/dtos/responsePaciente.DTO';

import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-create-solicitacao-internacao-hospitalar',
    templateUrl: './create-solicitacao-internacao-hospitalar.html',
    styleUrls: ['./create-solicitacao-internacao-hospitalar.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, CheckboxModule, ButtonModule, SelectModule, InputTextModule, RadioButtonModule, TextareaModule, ToastModule, DatePickerModule],
    providers: [MessageService]
})
export class CreateSolicitacaoInternacaoHospitalarComponent implements OnInit {
    form!: FormGroup;
    isEditMode: boolean = false;
    solicitacaoId: string | null = null;

    filteredPacientes: ResponsePacienteDTO[] = [];
    selectedPatient: ResponsePacienteDTO | null = null;
    vinculosOptions = ['Empregado', 'Empregador', 'Autônomo', 'Desempregado', 'Aposentado', 'Não segurado'];

    constructor(
        private fb: FormBuilder,
        private service: SolicitacaoInternacaoHospitalarService,
        private pacienteService: PacienteService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            // IDENTIFICAÇÃO DO ESTABELECIMENTO DE SAÚDE
            nomeEstabelecimentoSolicitante: ['', Validators.required],
            cnesSolicitante: ['', Validators.required],
            nomeEstabelecimentoExecutante: ['', Validators.required],
            cnesExecutante: ['', Validators.required],

            // IDENTIFICAÇÃO DO PACIENTE
            pacienteId: ['', Validators.required],
            codigoIbgeMunicipio: ['', Validators.required],

            // JUSTIFICATIVA DA INTERNAÇÃO
            principaisSinaisSintomas: ['', Validators.required],
            condicoesJustificamInternacao: ['', Validators.required],
            principaisResultadosProvasDiagnosticas: ['', Validators.required],
            diagnosticoInicial: ['', Validators.required],
            hdPrincipal: ['', Validators.required],
            hdSecundario: [''],
            hdCausasAssociadas: [''],

            // PROCEDIMENTO SOLICITADO
            descricaoProcedimentoSolicitado: ['', Validators.required],
            codigoProcedimento: ['', Validators.required],
            clinica: ['', Validators.required],
            caraterInternacao: ['', Validators.required],
            docsProfissionalSolicitante: ['', Validators.required],
            numDocsProfissionalSolicitante: ['', Validators.required],
            nomeProfissionalSolicitante: ['', Validators.required],
            dataSolicitacao: ['', Validators.required],
            assinaturaCarimbo: ['', Validators.required],

            // CAUSAS EXTERNAS (acidentes/violências)
            acidenteTransito: [false],
            acidenteTrabalhoTipico: [false],
            acidenteTrabalhoTrajeto: [false],
            cnpjSeguradora: [''],
            numBilhete: [''],
            serie: [''],
            cnpjEmpresa: [''],
            cnaeEmpresa: [''],
            cbor: [''],
            vinculo: ['']
        });

        this.form.get('pacienteId')?.valueChanges.subscribe((pacienteId) => {
            if (pacienteId) {
                this.pacienteService.getById(pacienteId).subscribe((resp) => {
                    this.selectedPatient = resp.data;
                });
            }
        });

        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.solicitacaoId = params['id'];
                this.loadSolicitacao(params['id']);
            }
        });
    }

    loadSolicitacao(id: string) {
        this.service.getById(id).subscribe({
            next: (response: ApiResponse<ResponseSolicitacaoInternacaoHospitalarDTO>) => {
                const data = response.data;
                this.form.patchValue(data);
                this.pacienteService.getById(data.pacienteId).subscribe((resp) => {
                    this.filteredPacientes = [resp.data];
                    this.selectedPatient = resp.data;
                });
            },
            error: (error) => {
                console.error('Erro ao carregar a solicitação:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar a solicitação'
                });
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            const formValue = this.form.value;

            if (this.isEditMode) {
                const dto = new UpdateSolicitacaoInternacaoHospitalarDTO({ id: this.solicitacaoId!, ...formValue });
                this.service.update(this.solicitacaoId!, dto).subscribe({
                    next: () => this.router.navigate(['/pages/list-solicitacao-internacao-hospitalar']),
                    error: () =>
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Falha ao atualizar a solicitação'
                        })
                });
            } else {
                const dto = new CreateSolicitacaoInternacaoHospitalarDTO(formValue);
                this.service.create(dto).subscribe({
                    next: () => this.router.navigate(['/pages/list-solicitacao-internacao-hospitalar']),
                    error: () =>
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Falha ao criar a solicitação'
                        })
                });
            }
        }
    }

    cancelar() {
        this.router.navigate(['/pages/list-solicitacao-internacao-hospitalar']);
    }

    searchPacientes(event: any): void {
        const query = event.filter?.trim();
        if (!query || query.length < 2) {
            this.filteredPacientes = [];
            return;
        }

        this.pacienteService.getByName(query).subscribe({
            next: (resp: ApiResponse<ResponsePacienteDTO[]>) => {
                this.filteredPacientes = resp.data || [];
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao buscar pacientes'
                });
                this.filteredPacientes = [];
            }
        });
    }
}

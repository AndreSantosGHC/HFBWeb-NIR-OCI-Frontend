import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@/shared/models/apiResponse';
import { MessageService } from 'primeng/api';

import { ResponsePacienteDTO } from '@/features/paciente/dtos/responsePaciente.DTO';
import { SolicitacaoExamesService } from '../../services/solicitacao-exames.service';
import { CreateSolicitacaoExamesDTO } from '../../dtos/createSolicitacaoExames.DTO';
import { UpdateSolicitacaoExamesDTO } from '../../dtos/updateSolicitacaoExames.DTO';
import { ResponseSolicitacaoExamesDTO } from '../../dtos/responseSolicitacaoExames.DTO';

import { PacienteService } from '@/features/paciente/services/paciente.service';

@Component({
    selector: 'app-create-solicitacao-exames',
    templateUrl: './create-solicitacao-exames.html',
    styleUrls: ['./create-solicitacao-exames.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, CheckboxModule, ButtonModule, SelectModule]
})
export class CreateSolicitacaoExamesComponent implements OnInit {
    form!: FormGroup;
    isEditMode: boolean = false;
    solicitacaoId: string | null = null;

    filteredPacientes: ResponsePacienteDTO[] = [];

    examesOptions = [
        'HEMOGRAMA COMPLETO',
        'GLICOSE EM JEJUM',
        'UREIA',
        'CREATININA',
        'SÓDIO',
        'POTÁSSIO',
        'COAGULOGRAMA (TAP/INR/PTT)',
        'EAS',
        'FOSFATASE ALCALINA',
        'GAMA-GT',
        'BILIRRUBINA TOTAL E FRAÇÕES',
        'RAIO X TÓRAX (PA E PERFIL)',
        'ECG',
        'ULTRASSONOGRAFIA DO ABDOME TOTAL',
        'ECOENDOSCOPIA',
        'ECOCARDIOGRAMA',
        'TOMOGRAFIA DO ABDOME TOTAL',
        'ESPIROMETRIA',
        'AVALIAÇÃO CLÍNICA',
        'AVALIAÇÃO CARDIOLÓGICA'
    ];

    constructor(
        private fb: FormBuilder,
        private service: SolicitacaoExamesService,
        private pacienteService: PacienteService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            pacienteId: [''],
            exames: this.fb.group(this.examesOptions.reduce((acc, curr) => ({ ...acc, [curr]: false }), {}))
        });
    }

    get exames(): FormGroup {
        return this.form.get('exames') as FormGroup;
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.solicitacaoId = params['id'];
                this.loadSolicitacao(params['id']);
            }
        });
    }

    private loadSolicitacao(id: string) {
        this.service.getById(id).subscribe({
            next: (response: ApiResponse<ResponseSolicitacaoExamesDTO>) => {
                const resp = response.data; // <-- aqui é o objeto real
                this.form.patchValue({
                    pacienteId: resp.pacienteId,
                    exames: resp.exames?.reduce((acc, e) => ({ ...acc, [e]: true }), {})
                });
            },
            error: (error) => {
                console.error('Erro ao carregar a solicitação:', error);
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            // Pegamos o valor do formulário e tipamos com DTO
            const formValue = this.form.value;

            if (this.isEditMode && this.solicitacaoId) {
                const updateData: UpdateSolicitacaoExamesDTO = {
                    pacienteId: formValue.pacienteId,
                    exames: Object.keys(formValue.exames).filter((key) => formValue.exames[key])
                };

                this.service.update(this.solicitacaoId, updateData).subscribe({
                    next: () => this.router.navigate(['/pages/list-solicitacao-exames']),
                    error: (err) => console.error('Erro ao atualizar a solicitação:', err)
                });
            } else {
                const createData: CreateSolicitacaoExamesDTO = {
                    pacienteId: formValue.pacienteId,
                    exames: Object.keys(formValue.exames).filter((key) => formValue.exames[key])
                };

                this.service.create(createData).subscribe({
                    next: () => this.router.navigate(['/pages/list-solicitacao-exames']),
                    error: (err) => console.error('Erro ao cadastrar a solicitação:', err)
                });
            }
        } else {
            console.log('Formulário inválido!');
        }
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

    imprimir(): void {
        if (!this.form.valid) return;

        const payload = {
            pacienteNome: this.form.get('pacienteId')?.value?.nome,
            pacienteProntuario: this.form.get('pacienteId')?.value?.prontuario,
            exames: this.examesOptions.filter((exame) => this.form.get(['exames', exame])?.value),
            dataSolicitacao: new Date().toLocaleDateString(),
            horaSolicitacao: new Date().toLocaleTimeString().slice(0, 5)
        };

        this.service.gerarDocumento(payload).subscribe((res: Blob) => {
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'solicitacao_exame.docx';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    cancelar() {
        this.router.navigate(['/pages/list-solicitacao-exames']);
    }
}

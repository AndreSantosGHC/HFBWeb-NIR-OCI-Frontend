import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '@/shared/models/apiResponse';

import { PrescricaoMedicaService } from '../../services/prescricao-medica.service';
import { PacienteService } from '@/features/paciente/services/paciente.service';
import { CreatePrescricaoMedicaDTO } from '../../dtos/CreatePrescricaoMedicaDTO';
import { UpdatePrescricaoMedicaDTO } from '../../dtos/UpdatePrescricaoMedicaDTO';
import { ResponsePacienteDTO } from '@/features/paciente/dtos/responsePaciente.DTO';
import { ResponsePrescricaoMedicaDTO } from '../../dtos/ResponsePrescricaoMedicaDTO';

@Component({
    selector: 'app-create-prescricao-medica',
    templateUrl: './create-prescricao-medica.html',
    styleUrls: ['./create-prescricao-medica.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, DatePickerModule, SelectModule, CheckboxModule, RadioButtonModule, ToastModule],
    providers: [MessageService]
})
export class CreatePrescricaoMedicaComponent implements OnInit {
    form!: FormGroup;
    isEditMode: boolean = false;
    prescricaoId: string | null = null;
    pacienteIdFromRoute: string | null = null;

    filteredPacientes: ResponsePacienteDTO[] = [];

    // O selectedPaciente não será mais necessário para controle no HTML
    // Apenas para armazenar a referência em caso de edição, se você precisar

    tipoProcedimentoOptions = [
        { label: 'EXAME', value: 'EXAME' },
        { label: 'IMAGEM', value: 'IMAGEM' },
        { label: 'PROCEDIMENTO', value: 'PROCEDIMENTO' }
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private prescricaoService: PrescricaoMedicaService,
        private pacienteService: PacienteService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            pacienteId: ['', Validators.required],
            medicamento: ['', Validators.required],
            dose: ['', Validators.required],
            dataInicio: [new Date(), Validators.required],
            horario: [this.getCurrentTime(), Validators.required],
            observacoes: [''],

            // Procedimentos
            tipoProcedimento: [null],
            dataSolicitacaoProcedimento: [null],
            horaSolicitacaoProcedimento: [''],
            justificativaProcedimento: [''],

            // Antimicrobianos
            indicacaoClinica: [''],
            terapeuticaEmpirica: [false],
            profilatica: [false],
            terapeuticaGermeIsolado: [false],
            infeccaoHospitalar: [false],
            infeccaoPosCirurgica: [false],
            microrganismo: [''],
            materialClinico: [''],
            tempoProvavelUso: [null],
            assinaturaCarimbo: ['']
        });

        this.route.paramMap.subscribe((params) => {
            this.prescricaoId = params.get('id');
            this.pacienteIdFromRoute = params.get('pacienteId');
            this.isEditMode = !!this.prescricaoId;

            if (this.isEditMode) {
                this.loadPrescricao(this.prescricaoId!);
            } else if (this.pacienteIdFromRoute) {
                this.loadPaciente(this.pacienteIdFromRoute);
            }
        });
    }

    getCurrentTime(): string {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    loadPrescricao(id: string): void {
        this.prescricaoService.getById(id).subscribe({
            next: (response) => {
                const data = response.data;
                this.form.patchValue(data);
                this.loadPaciente(data.pacienteId);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar a prescrição.' });
            }
        });
    }

    loadPaciente(pacienteId: string): void {
        this.pacienteService.getById(pacienteId).subscribe({
            next: (response) => {
                const paciente = response.data;
                // Adiciona o paciente carregado na lista para que o p-select possa renderizá-lo
                this.filteredPacientes = [paciente];
                // Define o valor do formControl para o ID do paciente, o p-select automaticamente o selecionará
                this.form.get('pacienteId')?.setValue(paciente.id);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar os dados do paciente.' });
            }
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos obrigatórios.' });
            return;
        }

        const formValue = this.form.getRawValue();

        if (this.isEditMode) {
            const dto = new UpdatePrescricaoMedicaDTO({ id: this.prescricaoId!, ...formValue });
            this.prescricaoService.update(this.prescricaoId!, dto).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Prescrição atualizada com sucesso.' });
                    this.router.navigate(['/pages/list-prescricao-medica']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar a prescrição.' });
                }
            });
        } else {
            const dto = new CreatePrescricaoMedicaDTO(formValue);
            this.prescricaoService.create(dto).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Prescrição criada com sucesso.' });
                    this.router.navigate(['/pages/list-prescricao-medica']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar a prescrição.' });
                }
            });
        }
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-prescricao-medica']);
    }

    searchPacientes(event: any) {
        const query = event.filter;
        if (query && query.length > 2) {
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
        } else {
            this.filteredPacientes = [];
        }
    }
}

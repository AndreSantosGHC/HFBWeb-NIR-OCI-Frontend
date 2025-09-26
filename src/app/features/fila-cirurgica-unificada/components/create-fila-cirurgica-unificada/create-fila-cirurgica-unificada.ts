import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@/shared/models/apiResponse';
import { MessageService } from 'primeng/api';

import { ResponsePacienteDTO } from '@/features/paciente/dtos/responsePaciente.DTO';
import { FilaCirurgicaUnificadaService } from '../../services/fila-cirurgica-unificada.service';
import { CreateFilaCirurgicaUnificadaDTO } from '../../dtos/createFilaCirurgicaUnificadaDTO';
import { UpdateFilaCirurgicaUnificadaDTO } from '../../dtos/updateFilaCirurgicaUnificadaDTO';
import { PacienteService } from '@/features/paciente/services/paciente.service';

@Component({
    selector: 'app-create-fila-cirurgica-unificada',
    templateUrl: './create-fila-cirurgica-unificada.html',
    styleUrls: ['./create-fila-cirurgica-unificada.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, DatePickerModule, SelectModule, ButtonModule]
})

export class CreateFilaCirurgicaUnificadaComponent implements OnInit {
    form!: FormGroup;
    isEditMode = false;
    filaId: string | null = null;

    pacientesOptions: any[] = [];
    selectedPaciente: any = null;
    filteredPacientes: ResponsePacienteDTO[] = [];

    prioridades = ['Verde', 'Amarelo', 'Vermelho', 'Sem informação'];
    lateralidades = ['Não se aplica', 'Esquerdo', 'Direito', 'Ambos'];
    riscosCirurgicos = ['Sem RI', 'ASA 1', 'ASA 2', 'ASA 3', 'ASA 4', 'Sem informação'];

    constructor(
        private fb: FormBuilder,
        private service: FilaCirurgicaUnificadaService,
        private pacienteService: PacienteService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            pacienteId: [''],

            // Campos da cirurgia/procedimento
            nomeMedico: [''],
            dataEntradaFila: [''],
            especialidade: [''],
            cirurgiaSequencial: [false],
            sequencia: [''],
            codigoProcedimento: [''],
            descricaoProcedimento: [''],
            prioridade: [''],
            lateralidade: [''],
            cid: [''],
            dataRiscoCirurgico: [''],
            riscoCirurgico: [''],
            doencasAssociadas: [''],
            cadastroRegulacao: [''],
            sisregNumero: [''],
            serNumero: [''],

            outrosProcedimentos: this.fb.array([]),

            assinaturaMedico: [''],
            dataSolicitacao: ['']
        });
    }

    ngOnInit(): void {
        this.pacienteService.getAll().subscribe({
            next: (resp) => (this.pacientesOptions = resp.data),
            error: (err) => console.error('Erro ao carregar pacientes:', err)
        });

        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.filaId = params['id'];
                this.loadFilaCirurgica(params['id']);
            }
        });
    }

    onPacienteChange() {
        this.selectedPaciente = this.pacientesOptions.find((p) => p.id === this.form.value.pacienteId);
    }

    private loadFilaCirurgica(id: string) {
        this.service.getById(id).subscribe({
            next: (resp) => {
                this.form.patchValue(resp.data);
                this.selectedPaciente = this.pacientesOptions.find((p) => p.id === resp.data.pacienteId);
            },
            error: (err) => console.error('Erro ao carregar fila cirúrgica:', err)
        });
    }

    onSubmit() {
        if (!this.form.valid) return;

        const dto = this.isEditMode ? new UpdateFilaCirurgicaUnificadaDTO(this.form.value) : new CreateFilaCirurgicaUnificadaDTO(this.form.value);

        const request = this.isEditMode && this.filaId ? this.service.update(this.filaId, dto) : this.service.create(dto);

        request.subscribe({
            next: () => this.router.navigate(['/pages/list-fila-cirurgica-unificada']),
            error: (err) => console.error('Erro ao salvar fila cirúrgica:', err)
        });
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

    cancelar() {
        this.router.navigate(['/pages/list-fila-cirurgica-unificada']);
    }

    get outrosProcedimentos() {
        return this.form.get('outrosProcedimentos') as FormArray;
    }
}

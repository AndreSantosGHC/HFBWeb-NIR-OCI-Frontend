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

import { EvolucaoMultidisciplinarService } from '../../services/evolucao-multidisciplinar.service';
import { PacienteService } from '@/features/paciente/services/paciente.service';
import { CreateEvolucaoMultidisciplinarDTO } from '../../dtos/CreateEvolucaoMultidisciplinarDTO';
import { UpdateEvolucaoMultidisciplinarDTO } from '../../dtos/UpdateEvolucaoMultidisciplinarDTO';
import { ResponseEvolucaoMultidisciplinarDTO } from '../../dtos/ResponseEvolucaoMultidisciplinarDTO';
import { ResponsePacienteDTO } from '@/features/paciente/dtos/responsePaciente.DTO';

@Component({
    selector: 'app-create-evolucao-multidisciplinar',
    templateUrl: './create-evolucao-multidisciplinar.html',
    styleUrls: ['./create-evolucao-multidisciplinar.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, SelectModule, TextareaModule, DatePickerModule]
})
export class CreateEvolucaoMultidisciplinarComponent implements OnInit {
    evolucaoForm!: FormGroup;
    isEditMode: boolean = false;
    evolucaoId: string | null = null;

    pacienteId!: string;
    pacienteNome?: string;
    pacienteProntuario?: string;
    pacienteEnfermaria?: string;
    pacienteLeito?: string;

    filteredPacientes: ResponsePacienteDTO[] = [];

    tipoOptions = [
        { label: 'Atendimento de Emergência', value: '19' },
        { label: 'CCIH', value: '20' },
        { label: 'Enfermagem', value: '10' },
        { label: 'Exames Laboratoriais / Resultado Crítico', value: '5' },
        { label: 'Farmacêutico', value: '21' },
        { label: 'Fisioterapia', value: '13' },
        { label: 'Fonoaudiologia', value: '17' },
        { label: 'Gestão de Risco', value: '22' },
        { label: 'Intercorrência', value: '3' },
        { label: 'Laudo', value: '4' },
        { label: 'Médica', value: '2' },
        { label: 'Nutrição', value: '15' },
        { label: 'Odontologia', value: '18' },
        { label: 'Psicologia', value: '16' },
        { label: 'Rotina', value: '12' },
        { label: 'Serviço Social', value: '14' }
    ];

    constructor(
        private fb: FormBuilder,
        private service: EvolucaoMultidisciplinarService,
        private pacienteService: PacienteService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.evolucaoForm = this.fb.group({
            pacienteId: ['', Validators.required],
            tipo: ['', Validators.required],
            evolucao: ['', Validators.required],
            dataEvolucao: [new Date(), Validators.required],
            horaEvolucao: ['', Validators.required],
            enfermaria: [''],
            leito: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.evolucaoId = params['id'];
                this.carregarEvolucao(this.evolucaoId);
            }
        });
    }

    searchPacientes(event: any) {
        const query = event.filter?.trim();
        if (!query) {
            this.filteredPacientes = [];
            return;
        }

        this.pacienteService.getByName(query).subscribe({
            next: (res) => (this.filteredPacientes = res.data),
            error: (err) => console.error(err)
        });
    }

    carregarEvolucao(id: string | null): void {
        if (!id) return;

        this.service.getById(id).subscribe({
            next: (response) => {
                this.evolucaoForm.patchValue(response.data);
                // Preencher campos de paciente caso existam
                // if (response.data.paciente) {
                //     this.pacienteNome = response.data.paciente.nome;
                //     this.pacienteProntuario = response.data.paciente.prontuario;
                //     this.pacienteEnfermaria = response.data.paciente.enfermaria;
                //     this.pacienteLeito = response.data.paciente.leito;
                // }
            },
            error: (err) => console.error(err)
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-evolucao-multidisciplinar']);
    }

    onSubmit(): void {
        if (this.evolucaoForm.valid) {
            const data = this.evolucaoForm.value;
            if (this.isEditMode && this.evolucaoId) {
                const dto: UpdateEvolucaoMultidisciplinarDTO = data;
                this.service.update(this.evolucaoId, dto).subscribe(() => this.cancelar());
            } else {
                const dto: CreateEvolucaoMultidisciplinarDTO = data;
                this.service.create(dto).subscribe(() => this.cancelar());
            }
        }
    }
}

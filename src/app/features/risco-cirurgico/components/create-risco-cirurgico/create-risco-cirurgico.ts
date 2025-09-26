import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

import { RiscoCirurgicoService } from '../../services/risco-cirurgico.service';
import { CreateRiscoCirurgicoDTO } from '../../dtos/CreateRiscoCirurgicoDTO';
import { UpdateRiscoCirurgicoDTO } from '../../dtos/UpdateRiscoCirurgicoDTO';
import { ResponseRiscoCirurgicoDTO } from '../../dtos/ResponseRiscoCirurgicoDTO';

import { Validators } from '@angular/forms';

@Component({
    selector: 'app-create-risco-cirurgico',
    templateUrl: './create-risco-cirurgico.html',
    styleUrls: ['./create-risco-cirurgico.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, SelectModule, ButtonModule, DatePickerModule, RadioButtonModule, TextareaModule],
    providers: [MessageService]
})
export class CreateRiscoCirurgicoComponent implements OnInit {
    form!: FormGroup;
    isEditMode = false;
    riscoId: string | null = null;

    distCoagulacao = [
        { label: 'Epistaxe ou sangramento gengival frequente', controlName: 'epistaxe' },
        { label: 'Hipermenorrea c/ déficit de ferro', controlName: 'hipermenorrea' },
        { label: 'Hematoma no tronco, não provocado, > 5 cm', controlName: 'hematoma' },
        { label: 'História de sangramento cirúrgico excessivo', controlName: 'sangramentoCirurgico' },
        { label: 'Hemartrose devido a pequeno trauma', controlName: 'hemartrose' },
        { label: 'História familiar de sangramento anormal', controlName: 'historicoFamiliar' },
        { label: 'Doença hepática ou renal grave', controlName: 'doencaHepaticaRenal' }
    ];

    constructor(
        private fb: FormBuilder,
        private service: RiscoCirurgicoService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            // dados clínicos
            historiaPatologica: [''],
            alergias: [''],
            interrogatorioDirigido: [''],
            medicamentosEmUso: [''],

            // distúrbios de coagulação
            epistaxe: ['', Validators.required],
            hipermenorrea: ['', Validators.required],
            hematoma: ['', Validators.required],
            sangramentoCirurgico: ['', Validators.required],
            hemartrose: ['', Validators.required],
            historicoFamiliar: ['', Validators.required],
            doencaHepaticaRenal: ['', Validators.required],

            // exame físico
            pa: [''],
            fc: [''],
            temperatura: [''],
            peso: [''],

            // exames clínicos
            acv: [''],
            aparelhoRespiratorio: [''],
            abdome: [''],
            membros: [''],
            outrosAchados: [''],

            // exames complementares
            hb: [''],
            hct: [''],
            glicose: [''],
            creatinina: [''],
            ptt: [''],
            outros: [''],
            ecg: [''],
            raioxTorax: [''],

            // risco cirúrgico
            riscoCirurgico: [''],
            recomendacoesEspeciais: ['']
        });

        this.riscoId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.riscoId;

        if (this.isEditMode) {
            this.service.getById(this.riscoId!).subscribe((data) => this.form.patchValue(data));
        }
    }

    onSubmit() {
        if (!this.form.valid) return;

        const dto = this.isEditMode ? new UpdateRiscoCirurgicoDTO({ id: this.riscoId!, ...this.form.value }) : new CreateRiscoCirurgicoDTO(this.form.value);

        const request = this.isEditMode ? this.service.update(this.riscoId!, dto) : this.service.create(dto);

        request.subscribe({
            next: () => this.router.navigate(['/pages/list-risco-cirurgico']),
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao salvar'
                })
        });
    }

    cancelar() {
        this.router.navigate(['/pages/list-risco-cirurgico']);
    }
}

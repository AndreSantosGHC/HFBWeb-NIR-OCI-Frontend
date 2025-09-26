import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { MedicoService } from '../../services/medico.service';
import { ApiResponse } from '@/shared/models/apiResponse';
import { ResponseMedicoDTO } from '../../dtos/ResponseMedicoDTO';
import { CreateMedicoDTO } from '../../dtos/CreateMedicoDTO';
import { UpdateMedicoDTO } from '../../dtos/UpdateMedicoDTO';

@Component({
    selector: 'app-cadastro-medico',
    templateUrl: './create-medico.html',
    styleUrls: ['./create-medico.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, CheckboxModule, TextareaModule, ToastModule],
    providers: [MessageService]
})
export class CadastroMedicoComponent implements OnInit {
    cadastroForm: FormGroup;
    isEditMode: boolean = false;
    medicoId: string | null = null;

    get nome() {
        return this.cadastroForm.get('nome')!;
    }

    constructor(
        private fb: FormBuilder,
        private medicoService: MedicoService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.cadastroForm = this.fb.group({
            nome: ['', Validators.required],
            cns: [''],
            dataEntrada: [''],
            cbo: [''],
            descricao: [''],
            SUS: [false],
            vinculacao: [''],
            tipo: [''],
            subtipo: [''],
            portaria134: [''],
            chOutro: [0],
            chAmb: [0],
            chHosp: [0],
            total: [0]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.medicoId = params['id'];
                this.carregarMedicoParaEdicao(this.medicoId!);
            }
        });
    }

    private carregarMedicoParaEdicao(id: string): void {
        this.medicoService.getById(id).subscribe({
            next: (response: ApiResponse<ResponseMedicoDTO>) => {
                this.cadastroForm.patchValue(response.data);
            },
            error: (error) => {
                console.error('Erro ao carregar médico:', error);
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-medico']);
    }

    onSubmit(): void {
        if (this.cadastroForm.valid) {
            if (this.isEditMode && this.medicoId) {
                const medicoData: UpdateMedicoDTO = this.cadastroForm.value;
                this.medicoService.patch(this.medicoId, medicoData).subscribe({
                    next: () => this.router.navigate(['/pages/list-medico']),
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar médico' });
                        console.error(error);
                    }
                });
            } else {
                const medicoData: CreateMedicoDTO = this.cadastroForm.value;
                this.medicoService.create(medicoData).subscribe({
                    next: () => this.router.navigate(['/pages/list-medico']),
                    error: (error) => console.error(error)
                });
            }
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ProcedimentoService } from '../../services/procedimento.service';
import { ApiResponse } from '@/shared/models/apiResponse';
import { ResponseProcedimentoDTO } from '../../dtos/ResponseProcedimentoDTO';
import { CreateProcedimentoDTO } from '../../dtos/CreateProcedimentoDTO';
import { UpdateProcedimentoDTO } from '../../dtos/UpdateProcedimentoDTO';

@Component({
    selector: 'app-cadastro-procedimento',
    templateUrl: './create-procedimento.html',
    styleUrls: ['./create-procedimento.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, TextareaModule, ToastModule],
    providers: [MessageService]
})
export class CadastroProcedimentoComponent implements OnInit {
    cadastroForm: FormGroup;
    isEditMode: boolean = false;
    procedimentoId: string | null = null;

    get nome() {
        return this.cadastroForm.get('nome')!;
    }

    constructor(
        private fb: FormBuilder,
        private procedimentoService: ProcedimentoService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.cadastroForm = this.fb.group({
            nome: ['', Validators.required],
            codigo: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.procedimentoId = params['id'];
                this.carregarProcedimentoParaEdicao(this.procedimentoId!);
            }
        });
    }

    private carregarProcedimentoParaEdicao(id: string): void {
        this.procedimentoService.getById(id).subscribe({
            next: (response: ApiResponse<ResponseProcedimentoDTO>) => {
                this.cadastroForm.patchValue({
                    nome: response.data.nome,
                    codigo: response.data.codigo
                });
            },
            error: (error) => {
                console.error('Erro ao carregar procedimento:', error);
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-procedimento']);
    }

    onSubmit(): void {
        if (this.cadastroForm.valid) {
            if (this.isEditMode && this.procedimentoId) {
                const data: UpdateProcedimentoDTO = this.cadastroForm.value;
                this.procedimentoService.patch(this.procedimentoId, data).subscribe({
                    next: () => this.router.navigate(['/pages/list-procedimento']),
                    error: (error) => console.error('Erro ao atualizar:', error)
                });
            } else {
                const data: CreateProcedimentoDTO = this.cadastroForm.value;
                this.procedimentoService.create(data).subscribe({
                    next: () => this.router.navigate(['/pages/list-procedimento']),
                    error: (error) => console.error('Erro ao criar:', error)
                });
            }
        } else {
            console.log('Formulário inválido!');
        }
    }
}

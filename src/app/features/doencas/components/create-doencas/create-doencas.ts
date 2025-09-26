import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ApiResponse } from '@/shared/models/apiResponse';

import { MessageService } from 'primeng/api';
import { DoencaService } from '../../services/doencas.service';

import { ResponseDoencaDTO } from '../../dtos/ResponseDoencasDTO';
import { CreateDoencaDTO } from '../../dtos/CreateDoencasDTO';
import { UpdateDoencaDTO } from '../../dtos/UpdateDoencasDTO';

@Component({
    selector: 'app-cadastro-doenca',
    templateUrl: './create-doencas.html',
    styleUrls: ['./create-doencas.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, ToastModule],
    providers: [MessageService]
})
export class CadastroDoencaComponent implements OnInit {
    cadastroForm: FormGroup;
    isEditMode: boolean = false;
    doencaId: string | null = null;

    get nome() {
        return this.cadastroForm.get('nome')!;
    }

    constructor(
        private fb: FormBuilder,
        private doencaService: DoencaService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.cadastroForm = this.fb.group({
            nome: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.doencaId = params['id'];
                this.carregarDoencaParaEdicao(this.doencaId!);
            }
        });
    }

    private carregarDoencaParaEdicao(id: string): void {
        this.doencaService.getById(id).subscribe({
            next: (response: ApiResponse<ResponseDoencaDTO>) => {
                this.cadastroForm.patchValue({
                    nome: response.data.nome
                });
            },
            error: (error) => {
                console.error('Erro ao carregar doença:', error);
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-doenca']);
    }

    onSubmit(): void {
        if (this.cadastroForm.valid) {
            if (this.isEditMode && this.doencaId) {
                const doencaData: UpdateDoencaDTO = this.cadastroForm.value;
                this.doencaService.patch(this.doencaId, doencaData).subscribe({
                    next: (response) => {
                        console.log('Doença atualizada com sucesso!', response);
                        this.router.navigate(['/pages/list-doenca']);
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Falha ao atualizar doença'
                        });
                        console.error('Erro ao atualizar doença:', error);
                    }
                });
            } else {
                const doencaData: CreateDoencaDTO = this.cadastroForm.value;
                this.doencaService.create(doencaData).subscribe({
                    next: (response) => {
                        console.log('Doença cadastrada com sucesso!', response);
                        this.router.navigate(['/pages/list-doenca']);
                    },
                    error: (error) => {
                        console.error('Erro ao cadastrar doença:', error);
                    }
                });
            }
        } else {
            console.log('Formulário inválido!');
        }
    }
}

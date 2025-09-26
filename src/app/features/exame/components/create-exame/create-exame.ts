import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

import { ExameService } from '../../services/exame.service';
import { CreateExameDTO } from '../../dtos/createExame.DTO';
import { UpdateExameDTO } from '../../dtos/updateExame.DTO';
import { ApiResponse } from '@/shared/models/apiResponse';
import { ResponseExameDTO } from '../../dtos/responseExame.DTO';

@Component({
    selector: 'app-create-exame',
    templateUrl: './create-exame.html',
    styleUrls: ['./create-exame.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, TextareaModule]
})
export class CreateExameComponent implements OnInit {
    exameForm!: FormGroup;
    isEditMode: boolean = false;
    exameId: string | null = null;

    get nome() {
        return this.exameForm.get('nome')!;
    }
    get descricao() {
        return this.exameForm.get('descricao')!;
    }

    constructor(
        private fb: FormBuilder,
        private exameService: ExameService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.exameForm = this.fb.group({
            nome: ['', [Validators.required, Validators.maxLength(100)]],
            descricao: ['', [Validators.maxLength(500)]]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.exameId = params['id'];
                this.carregarExameParaEdicao(this.exameId!);
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-exame']);
    }

    private carregarExameParaEdicao(id: string): void {
        this.exameService.getById(id).subscribe({
            next: (response: ApiResponse<ResponseExameDTO>) => {
                this.exameForm.patchValue({
                    nome: response.data.nome,
                    descricao: response.data.descricao
                });
            },
            error: (error) => {
                console.error('Erro ao carregar exame:', error);
            }
        });
    }

    onSubmit(): void {
        if (this.exameForm.valid) {
            if (this.isEditMode && this.exameId) {
                const exameData: UpdateExameDTO = this.exameForm.value;
                this.exameService.update(this.exameId, exameData).subscribe({
                    next: () => this.router.navigate(['/pages/list-exame']),
                    error: (error) => console.error('Erro ao atualizar exame:', error)
                });
            } else {
                const exameData: CreateExameDTO = this.exameForm.value;
                this.exameService.create(exameData).subscribe({
                    next: () => this.router.navigate(['/pages/list-exame']),
                    error: (error) => console.error('Erro ao criar exame:', error)
                });
            }
        } else {
            console.log('Formulário inválido!');
        }
    }
}

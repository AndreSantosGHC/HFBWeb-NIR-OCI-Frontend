import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CidService } from '../../services/cid.service';
import { ApiResponse } from '@/shared/models/apiResponse';
import { ResponseCidDTO } from '../../dtos/ResponseCidDTO';
import { CreateCidDTO } from '../../dtos/CreateCidDTO';
import { UpdateCidDTO } from '../../dtos/UpdateCidDTO';

@Component({
    selector: 'app-cadastro-cid',
    templateUrl: './create-cid.html',
    styleUrls: ['./create-cid.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, ToastModule],
    providers: [MessageService]
})
export class CadastroCidComponent implements OnInit {
    cadastroForm: FormGroup;
    isEditMode: boolean = false;
    cidId: string | null = null;

    get codigo() {
        return this.cadastroForm.get('codigo')!;
    }
    get nome() {
        return this.cadastroForm.get('nome')!;
    }

    constructor(
        private fb: FormBuilder,
        private cidService: CidService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.cadastroForm = this.fb.group({
            codigo: ['', Validators.required],
            nome: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.cidId = params['id'];
                this.carregarCidParaEdicao(this.cidId!);
            }
        });
    }

    private carregarCidParaEdicao(id: string): void {
        this.cidService.getById(id).subscribe({
            next: (response: ApiResponse<ResponseCidDTO>) => {
                this.cadastroForm.patchValue(response.data);
            },
            error: (error) => console.error('Erro ao carregar CID:', error)
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-cid']);
    }

    onSubmit(): void {
        if (this.cadastroForm.valid) {
            if (this.isEditMode && this.cidId) {
                const cidData: UpdateCidDTO = this.cadastroForm.value;
                this.cidService.patch(this.cidId, cidData).subscribe({
                    next: () => this.router.navigate(['/pages/list-cid']),
                    error: (error) => console.error('Erro ao atualizar CID:', error)
                });
            } else {
                const cidData: CreateCidDTO = this.cadastroForm.value;
                this.cidService.create(cidData).subscribe({
                    next: () => this.router.navigate(['/pages/list-cid']),
                    error: (error) => console.error('Erro ao criar CID:', error)
                });
            }
        }
    }
}

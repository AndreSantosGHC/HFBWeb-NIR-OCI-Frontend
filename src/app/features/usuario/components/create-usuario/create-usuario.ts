// src/features/usuario/pages/create-usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { ApiResponse } from '@/shared/models/apiResponse';
import { ResponseUsuarioDTO } from '../../dtos/responseUsuario.DTO';
import { CreateUsuarioDTO } from '../../dtos/createUsuario.DTO';
import { UpdateUsuarioDTO } from '../../dtos/updateUsuario.DTO';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './create-usuario.html',
    styleUrls: ['./create-usuario.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, SelectModule, PasswordModule, TextareaModule, ToastModule],
    providers: [MessageService]
})
export class CadastroUsuarioComponent implements OnInit {
    cadastroForm: FormGroup;
    isEditMode: boolean = false;
    usuarioId: string | null = null;
    // statusOptions = [
    //     { label: 'Ativo', value: 'ativo' },
    //     { label: 'Inativo', value: 'inativo' },
    //     { label: 'Pendente', value: 'pendente' }
    // ];

    get nome() {
        return this.cadastroForm.get('nome')!;
    }

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.cadastroForm = this.fb.group({
            nome: ['', Validators.required],
            email: ['', [Validators.email]],
            usuario: [''],
            senha: [undefined],
            // status: ['ativo'],
            codigo: [''],
            tags: [[]],
            descricao: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.usuarioId = params['id'];
                this.carregarUsuarioParaEdicao(this.usuarioId!);
            }
        });
    }

    private carregarUsuarioParaEdicao(id: string): void {
        this.usuarioService.getById(id).subscribe({
            next: (response: ApiResponse<ResponseUsuarioDTO>) => {
                this.cadastroForm.patchValue({
                    nome: response.data.nome,
                    email: response.data.email,
                    usuario: response.data.usuario,
                    // status: response.data.status,
                    codigo: response.data.codigo,
                    descricao: response.data.descricao
                });
            },
            error: (error) => {
                console.error('Erro ao carregar usuário:', error);
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/pages/list-usuario']);
    }

    onSubmit(): void {
        if (this.cadastroForm.valid) {
            if (this.isEditMode && this.usuarioId) {
                const usuarioData: UpdateUsuarioDTO = this.cadastroForm.value;
                this.usuarioService.patch(this.usuarioId, usuarioData).subscribe({
                    next: (response) => {

                        console.log('Usuário atualizado com sucesso!', response);
                        this.router.navigate(['/pages/list-usuario']);
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: error.details
                        });
                        console.error('Erro ao atualizar o usuário:', error);
                    }
                });
            } else {
                const usuarioData: CreateUsuarioDTO = this.cadastroForm.value;
                this.usuarioService.create(usuarioData).subscribe({
                    next: (response) => {
                        console.log('Usuário cadastrado com sucesso!', response);
                        this.router.navigate(['/pages/list-usuario']);
                    },
                    error: (error) => {
                        console.error('Erro ao cadastrar o usuário:', error);
                    }
                });
            }
        } else {
            console.log('Formulário inválido!');
        }
    }
}

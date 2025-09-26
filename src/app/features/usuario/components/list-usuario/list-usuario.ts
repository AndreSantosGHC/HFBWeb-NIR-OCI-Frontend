// src/features/usuario/pages/list-usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './list-usuario.html',
  styleUrls: ['./list-usuario.scss'],
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule,
    UniversalDatatableComponent
  ],
  providers: [ConfirmationService, MessageService]
})
export class ListagemUsuarioComponent implements OnInit {
  columns = [
    {
      field: 'nome',
      header: 'Nome',
      width: '25%',
      filterType: 'text',
      filterable: true
    },
    {
      field: 'email',
      header: 'Email',
      width: '25%',
      filterType: 'text',
      filterable: true
    },
    {
      field: 'usuario',
      header: 'Usuário',
      width: '20%',
      filterType: 'text',
      filterable: true
    },
    {
      field: 'ativo',
      header: 'Ativo',
      width: '15%',
      filterType: 'boolean',
    },
  ];

//   statusSeverity: { [key: string]: string } = {
//     'ATIVO': 'success',
//     'INATIVO': 'danger',
//     'PENDENTE': 'warning',
//     'BLOQUEADO': 'secondary'
//   };

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

//   getStatusSeverity(status: string): string {
//     return this.statusSeverity[status.toUpperCase()] || 'info';
//   }

  redirectToCadastro(): void {
    this.router.navigate(['/pages/create-usuario']);
  }

  editarUsuario(usuario: any): void {
    this.router.navigate(['/pages/create-usuario', usuario.id]);
  }

  excluirUsuario(event: any): void {
    const item = event.item;
    const onComplete = event.onComplete;

    this.confirmationService.confirm({
      message: `Deseja realmente excluir o usuário "${this.getNestedValue(item, 'nome')}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.usuarioService.delete(item.id).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário excluído com sucesso'
            });
            onComplete(true);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Falha ao excluir o usuário'
            });
            onComplete(false);
          }
        });
      },
      reject: () => {
        onComplete(false);
      }
    });
  }
}

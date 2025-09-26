// src/features/paciente/pages/list-paciente.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { PacienteService } from '../../services/paciente.service';

@Component({
    selector: 'app-listagem-paciente',
    templateUrl: './list-paciente.html',
    styleUrls: ['./list-paciente.scss'],
    standalone: true,
    imports: [CardModule, CommonModule, ConfirmDialogModule, ToastModule, TagModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListagemPacienteComponent implements OnInit {
    columns = [
        {
            field: 'prontuario',
            header: 'Prontuário',
            width: '15%',
            filterType: 'text',
            filterable: true
        },
        {
            field: 'nome',
            header: 'Nome',
            width: '72%',
            filterType: 'text',
            filterable: true
        }
    ];

    customActionButtons = [
        {
            icon: 'pi pi-external-link',
            tooltip: 'Solicitar Exames Pré Operatórios',
            classes: 'p-button-info',
            onClick: (row: any) => this.redirectSolicitarExames(row)
        },
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private pacienteService: PacienteService
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
        this.router.navigate(['/pages/create-paciente']);
    }

    editarPaciente(paciente: any): void {
        this.router.navigate(['/pages/create-paciente', paciente.id]);
    }

    excluirPaciente(event: any): void {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmationService.confirm({
            message: `Deseja realmente excluir o paciente "${this.getNestedValue(item, 'nome')}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.pacienteService.delete(item.id).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Paciente excluído com sucesso'
                        });
                        onComplete(true);
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Falha ao excluir o paciente'
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

    redirectSolicitarExames(row: any) {
        this.router.navigate(['/paciente', row.id, 'detalhes']);
    }
}

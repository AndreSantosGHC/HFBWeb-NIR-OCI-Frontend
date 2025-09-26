import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';

import { ExameService } from '../../services/exame.service';

@Component({
    selector: 'app-list-exame',
    templateUrl: './list-exame.html',
    styleUrls: ['./list-exame.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, ToastModule, ConfirmDialogModule, TagModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListExameComponent implements OnInit {
    columns = [
        { field: 'nome', header: 'Nome', width: '70%', filterType: 'text', filterable: true },
        { field: 'descricao', header: 'Descrição', width: '30%', filterType: 'text', filterable: true }
    ];

    customActionButtons = [];

    constructor(
        private router: Router,
        private exameService: ExameService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {}

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => (current && current[key] !== undefined ? current[key] : null), obj);
    }

    redirectToCadastro(): void {
        this.router.navigate(['/pages/create-exame']);
    }

    editarExame(exame: any): void {
        this.router.navigate(['/pages/create-exame', exame.id]);
    }

    excluirExame(event: any): void {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmationService.confirm({
            message: `Deseja realmente excluir o exame "${this.getNestedValue(item, 'nome')}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.exameService.delete(item.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Exame excluído com sucesso' });
                        onComplete(true);
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir exame' });
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}

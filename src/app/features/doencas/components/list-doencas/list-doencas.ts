import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { DoencaService } from '../../services/doencas.service';

@Component({
    selector: 'app-listagem-doenca',
    templateUrl: './list-doencas.html',
    styleUrls: ['./list-doencas.scss'],
    standalone: true,
    imports: [CardModule, CommonModule, ConfirmDialogModule, ToastModule, TagModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListagemDoencaComponent implements OnInit {
    columns = [
        {
            field: 'nome',
            header: 'Nome',
            width: '50%',
            filterType: 'text',
            filterable: true
        },
        {
            field: 'ativo',
            header: 'Ativo',
            width: '15%',
            filterType: 'boolean'
        }
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private doencaService: DoencaService
    ) {}

    ngOnInit(): void {}

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    redirectToCadastro(): void {
        this.router.navigate(['/pages/create-doenca']);
    }

    editarDoenca(doenca: any): void {
        this.router.navigate(['/pages/create-doenca', doenca.id]);
    }

    excluirDoenca(event: any): void {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmationService.confirm({
            message: `Deseja realmente excluir a doença "${this.getNestedValue(item, 'nome')}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.doencaService.delete(item.id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Doença excluída com sucesso'
                        });
                        onComplete(true);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Falha ao excluir a doença'
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { ProcedimentoService } from '../../services/procedimento.service';

@Component({
    selector: 'app-listagem-procedimento',
    templateUrl: './list-procedimento.html',
    styleUrls: ['./list-procedimento.scss'],
    standalone: true,
    imports: [CardModule, CommonModule, ConfirmDialogModule, ToastModule, TagModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListagemProcedimentoComponent implements OnInit {
    columns = [
        { field: 'nome', header: 'Nome', width: '50%', filterType: 'text', filterable: true },
        { field: 'codigo', header: 'Código', width: '30%', filterType: 'text', filterable: true },
        { field: 'ativo', header: 'Ativo', width: '15%', filterType: 'boolean' }
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private procedimentoService: ProcedimentoService
    ) {}

    ngOnInit(): void {}

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => (current && current[key] !== undefined ? current[key] : null), obj);
    }

    redirectToCadastro(): void {
        this.router.navigate(['/pages/create-procedimento']);
    }

    editarProcedimento(item: any): void {
        this.router.navigate(['/pages/create-procedimento', item.id]);
    }

    excluirProcedimento(event: any): void {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmationService.confirm({
            message: `Deseja realmente excluir o procedimento "${this.getNestedValue(item, 'nome')}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.procedimentoService.delete(item.id).subscribe({
                    next: () => {
                        onComplete(true);
                    },
                    error: () => {
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { CidService } from '../../services/cid.service';

@Component({
    selector: 'app-listagem-cid',
    templateUrl: './list-cid.html',
    styleUrls: ['./list-cid.scss'],
    standalone: true,
    imports: [CardModule, CommonModule, ConfirmDialogModule, ToastModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListagemCidComponent implements OnInit {
    columns = [
        { field: 'codigo', header: 'Código', width: '20%', filterType: 'text', filterable: true },
        { field: 'nome', header: 'Nome', width: '60%', filterType: 'text', filterable: true },
        { field: 'actions', header: 'Ações', width: '20%' }
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private cidService: CidService
    ) {}

    ngOnInit(): void {}

    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => (current && current[key] !== undefined ? current[key] : null), obj);
    }

    redirectToCadastro(): void {
        this.router.navigate(['/pages/create-cid']);
    }

    editarCid(cid: any): void {
        this.router.navigate(['/pages/create-cid', cid.id]);
    }

    excluirCid(event: any): void {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmationService.confirm({
            message: `Deseja realmente excluir o CID "${this.getNestedValue(item, 'nome')}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.cidService.delete(item.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'CID excluído com sucesso' });
                        onComplete(true);
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir CID' });
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}

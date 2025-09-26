import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { SolicitacaoExamesService } from '../../services/solicitacao-exames.service';

@Component({
    selector: 'app-list-solicitacao-exames',
    templateUrl: './list-solicitacao-exames.html',
    styleUrls: ['./list-solicitacao-exames.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule, ConfirmDialogModule, ToastModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListSolicitacaoExamesComponent implements OnInit {
    columns = [
        { field: 'pacienteNome', header: 'Nome do Paciente' },
        { field: 'exames', header: 'Exames' }
    ];

    constructor(
        private router: Router,
        private service: SolicitacaoExamesService,
        private confirmation: ConfirmationService,
        private message: MessageService
    ) {}

    ngOnInit(): void {}

    redirectToCreate() {
        this.router.navigate(['/pages/create-solicitacao-exames']);
    }

    editar(row: any) {
        this.router.navigate(['/pages/create-solicitacao-exames', row.id]);
    }

    excluir(event: any) {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmation.confirm({
            message: `Deseja realmente excluir a solicitação do paciente "${item.pacienteNome}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.service.delete(item.id).subscribe({
                    next: () => {
                        this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Solicitação excluída com sucesso' });
                        onComplete(true);
                    },
                    error: () => {
                        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir a solicitação' });
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}

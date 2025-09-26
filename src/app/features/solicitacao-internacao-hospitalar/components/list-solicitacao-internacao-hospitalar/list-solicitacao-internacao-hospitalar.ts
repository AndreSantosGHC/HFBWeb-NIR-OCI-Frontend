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
import { SolicitacaoInternacaoHospitalarService } from '../../services/solicitacao-internacao-hospitalar.service';

@Component({
    selector: 'app-list-solicitacao-internacao-hospitalar',
    templateUrl: './list-solicitacao-internacao-hospitalar.html',
    styleUrls: ['./list-solicitacao-internacao-hospitalar.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule, ConfirmDialogModule, ToastModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListSolicitacaoInternacaoHospitalarComponent implements OnInit {
    columns = [
        {
            field: 'pacienteNome',
            header: 'Nome do Paciente'
        },
        {
            field: 'diagnosticoInicial',
            header: 'Diagnóstico Inicial'
        },
        {
            field: 'dataSolicitacao',
            header: 'Data da Solicitação'
        }
    ];

    constructor(
        private router: Router,
        private service: SolicitacaoInternacaoHospitalarService,
        private confirmation: ConfirmationService,
        private message: MessageService
    ) {}

    ngOnInit(): void {}

    redirectToCreate() {
        this.router.navigate(['/pages/create-solicitacao-internacao-hospitalar']);
    }

    editar(row: any) {
        this.router.navigate(['/pages/create-solicitacao-internacao-hospitalar', row.id]);
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
                        this.message.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Solicitação excluída com sucesso'
                        });
                        onComplete(true);
                    },
                    error: () => {
                        this.message.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Falha ao excluir a solicitação'
                        });
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}

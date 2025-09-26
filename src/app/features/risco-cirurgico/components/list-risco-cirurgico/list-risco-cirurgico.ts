import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { RiscoCirurgicoService } from '../../services/risco-cirurgico.service';

@Component({
    selector: 'app-list-risco-cirurgico',
    templateUrl: './list-risco-cirurgico.html',
    styleUrls: ['./list-risco-cirurgico.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, ConfirmDialogModule, ToastModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListRiscoCirurgicoComponent implements OnInit {
    columns = [
        { field: 'pacienteId', header: 'Paciente' },
        { field: 'diagnosticoPreOperatorio', header: 'Diagnóstico Pré-Operatório' },
        { field: 'riscoCirurgico', header: 'Risco Cirúrgico' },
        { field: 'recomendacoesEspeciais', header: 'Recomendações' }
    ];

    constructor(
        private router: Router,
        private service: RiscoCirurgicoService,
        private confirmation: ConfirmationService,
        private message: MessageService
    ) {}

    ngOnInit(): void {}

    redirectToCreate() {
        this.router.navigate(['/pages/create-risco-cirurgico']);
    }

    editar(row: any) {
        this.router.navigate(['/pages/create-risco-cirurgico', row.id]);
    }

    excluir(event: any) {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmation.confirm({
            message: `Deseja realmente excluir o risco cirúrgico do paciente "${item.pacienteId}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.service.delete(item.id).subscribe({
                    next: () => {
                        this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Excluído com sucesso' });
                        onComplete(true);
                    },
                    error: () => {
                        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir' });
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}

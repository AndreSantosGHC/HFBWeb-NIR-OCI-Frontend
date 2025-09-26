import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { FilaCirurgicaUnificadaService } from '../../services/fila-cirurgica-unificada.service';

@Component({
    selector: 'app-list-fila-cirurgica-unificada',
    templateUrl: './list-fila-cirurgica-unificada.html',
    styleUrls: ['./list-fila-cirurgica-unificada.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, ConfirmDialogModule, ToastModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListFilaCirurgicaUnificadaComponent implements OnInit {
    columns = [
        { field: 'pacienteNome', header: 'Nome do Paciente' },
        { field: 'nomeMedico', header: 'Médico' },
        { field: 'especialidade', header: 'Especialidade' },
        { field: 'prioridade', header: 'Prioridade' },
        { field: 'lateralidade', header: 'Lateralidade' },
        { field: 'riscoCirurgico', header: 'Risco Cirúrgico' },
        { field: 'dataEntradaFila', header: 'Data Entrada' }
    ];

    constructor(
        private router: Router,
        private service: FilaCirurgicaUnificadaService,
        private confirmation: ConfirmationService,
        private message: MessageService
    ) {}

    ngOnInit(): void {}

    redirectToCreate() {
        this.router.navigate(['/pages/create-fila-cirurgica-unificada']);
    }

    editar(row: any) {
        this.router.navigate(['/pages/create-fila-cirurgica-unificada', row.id]);
    }

    excluir(event: any) {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmation.confirm({
            message: `Deseja realmente excluir a fila do paciente "${item.pacienteNome}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.service.delete(item.id).subscribe({
                    next: () => {
                        this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Fila excluída com sucesso' });
                        onComplete(true);
                    },
                    error: () => {
                        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir a fila' });
                        onComplete(false);
                    }
                });
            },
            reject: () => onComplete(false)
        });
    }
}

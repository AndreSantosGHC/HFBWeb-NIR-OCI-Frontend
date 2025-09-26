import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UniversalDatatableComponent } from '@/shared/components/universal-table/universal-table';
import { PrescricaoMedicaService } from '../../services/prescricao-medica.service';

@Component({
    selector: 'app-list-prescricao-medica',
    templateUrl: './list-prescricao-medica.html',
    styleUrls: ['./list-prescricao-medica.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, ConfirmDialogModule, ToastModule, UniversalDatatableComponent],
    providers: [ConfirmationService, MessageService]
})
export class ListPrescricaoMedicaComponent implements OnInit {
    columns = [
        { field: 'pacienteNome', header: 'Paciente' },
        { field: 'medicamento', header: 'Medicamento' },
        { field: 'dose', header: 'Dose' },
        { field: 'dataInicio', header: 'Data Início' },
        { field: 'horario', header: 'Horário' },
        { field: 'observacoes', header: 'Observações' }
    ];

    constructor(
        private router: Router,
        private service: PrescricaoMedicaService,
        private confirmation: ConfirmationService,
        private message: MessageService
    ) {}

    ngOnInit(): void {}

    redirectToCreate() {
        this.router.navigate(['/pages/create-prescricao-medica']);
    }

    editar(row: any) {
        this.router.navigate(['/pages/create-prescricao-medica', row.id]);
    }

    excluir(event: any) {
        const item = event.item;
        const onComplete = event.onComplete;

        this.confirmation.confirm({
            message: `Deseja realmente excluir a prescrição para o paciente "${item.pacienteNome}"?`,
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
